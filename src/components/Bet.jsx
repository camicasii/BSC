import { useState, useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { useToasts } from 'react-toast-notifications'
import { Row, Col, ToggleButton, ButtonGroup, Button } from "react-bootstrap";
import { setRadioValue} from "../redux/slice/gameSlice";
import { setLoad, initContract } from "../redux/action/mainAction";
import Swal from "sweetalert2";

import Web3Singleton from "../util/Web3Singleton";
import ResultBar from "./ResultBar";

export default function Bet() {  
  const { addToast } = useToasts()
  const [guess, setguess] = useState(50)
  const game = useSelector(state => state.state.game)  
  const dispatch = useDispatch()

  useEffect(() => {
    if(game.guess>98) setguess(98)
    else if(game.guess<2)setguess(2)
    else setguess(game.guess)
    return () => {      
    }
  }, [game.guess])

  async function approve() {
    try {
      let time;      
      if (Web3Singleton.getInstance().isReady()){
        console.log(Web3Singleton.getInstance().address);        
        const allowance = await Web3Singleton.getInstance().allowance(game.bet)
        if(allowance){                     
          await rollGame()
        }
        else{
          time = Swal.fire({
            title: '<h3>Approve</h3>',
            icon: 'info',
            html:         
              `    
              <div class="spinner">
                <div class="cube1"></div>
                <div class="cube2"></div>
              </div>
              <div class="await mb-5">Wait for approval</div>
              `,        
            showConfirmButton:false,
            focusConfirm: false,
            allowOutsideClick:false,
            allowEscapeKey:true,
          })                     
          if(await Web3Singleton.getInstance().approve(game.bet)){                            
            Swal.close(time)        
            addToast("approve completed", {
              appearance: 'success',
              autoDismiss: true,            
            })   
            await  rollGame()
        }
      }
  }
  else{
    throw "Erroor"
  }
}catch (error) {
  addToast("Unexpected error", {
    appearance: 'warning',
    autoDismiss: true,        
  })
}
  }

  async function rollGame() {    
      try{        
        const amountToken =window.web3.utils.toBN(game.bet * (10 ** 18))                        
        addToast("sended request, wait for response", {
          appearance: 'success',
          autoDismiss: false,            

        })   
        const data = await Web3Singleton.getInstance().contractInstance.methods
        .game(guess,
            amountToken, game.radioValue).send({
            from: Web3Singleton.getInstance().address,
            value: 0,
            gasPrice: window.web3.utils.toBN(25 * (10 ** 9))
        })        

        if(data.events.LastBet.returnValues.win){
          addToast("You're on a streak, winner", {
            appearance: 'info',
            autoDismiss: false,            
          })
        }else{
          addToast("bad vibes, you lost, try again", {
            appearance: 'info',
            autoDismiss: true,            
          })
        }        
        dispatch(initContract())
      }catch(e){
        addToast("Error submitting request, try again later", {
          appearance: 'error',
          autoDismiss: true,            
        })   
      }



        
      }   
        
  
  return (
    <Row>      
      <Col md="12">
        <ButtonGroup toggle>
          <ToggleButton
            size="sm"
            type="radio"
            variant="success"
            name="radio"
            value={true}
            checked={game.radioValue === true}
            onChange={(e) =>dispatch(setRadioValue(true))}
            className="mt-3"
          >
            Lower
          </ToggleButton>

          <Button size="lg" variant="primary" className="mx-1" onClick={approve}>
            BET
          </Button>
          <ToggleButton
            size="sm"
            type="radio"
            variant="danger"
            name="radio"
            value={false}
            checked={game.radioValue === false}
            onChange={(e) =>dispatch(setRadioValue(false))}
            className="mb-3"
          >
            Higher
          </ToggleButton>
        </ButtonGroup>
      </Col>
      <Col xs="12" className="flex mt-4">
        <div className="Dice-result w-100 h-25">
          <h3>Result</h3>
          <p>
            {guess} <span>{game.radioValue ? "<" : ">="}</span>{" "}
          </p>
          <ResultBar />
        </div>
      </Col>
    </Row>
  );
}

