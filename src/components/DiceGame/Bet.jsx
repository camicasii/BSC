import { Alert,Row, Col, ToggleButton, ButtonGroup, Button } from "react-bootstrap";


import { useState, useEffect } from "react";
import Web3Singleton from "./util/Web3Singleton";
export default function Bet({ guess, setRadio, bet, address, load }) {
  const [radioValue, setRadioValue] = useState(false);
  const [guess_, setguess_] = useState(guess);
  const [alers, setalers] = useState(null)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const time = setTimeout(()=>setShow(false),2000)
    return () => {
      clearTimeout(time)      
    }
  }, [radioValue])

  useEffect(() => {
    setguess_(guess);
    if (guess > 98) setguess_(98);
    if (guess < 2) setguess_(2);
    return () => {};
    
  }, [guess]);

  async function approve() {
    try {
      if (Web3Singleton.getInstance().isReady()){
        const allowance = await Web3Singleton.getInstance().allowance(bet)
        if(allowance){          
          await game()
        }
        else{
          if(await Web3Singleton.getInstance().approve(bet)){            
            await  game()
        }
      }
  }
}catch (error) {
  console.log("weero");
  setalers(<Alert  variant="warning">
        Something has gone wrong consult technical support
        </Alert>)
      setShow(true)
}

  async function game() {
        if(await Web3Singleton.getInstance().game(guess, bet, radioValue)){
        setalers(<Alert  variant="primary">Send request</Alert>)
        setShow(true)
        }else{
          setalers(<Alert  variant="warning">Something has gone wrong consult technical support</Alert>)
        setShow(true)
        }
      }
   
      }   
  
  return (
    <Row>
      {show?alers:null}
      <Col md="12">
        <ButtonGroup toggle>
          <ToggleButton
            size="sm"
            type="radio"
            variant="success"
            name="radio"
            value={true}
            checked={radioValue === true}
            onChange={(e) => {
              
              setRadioValue(true);
              setRadio(true);              
              
            }}
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
            checked={radioValue === false}
            onChange={(e) => {
              setRadioValue(false);
              setRadio(false);              
            }}
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
            {guess_} <span>{radioValue ? "<" : ">="}</span>{" "}
          </p>
          <div className="Dice-line relative">
            <div id="Dice-line-1" className="Dice-line-base Dice-line-1" />
            <div id="Dice-line-2" className="Dice-line-base Dice-line-2" />
          </div>
        </div>
      </Col>
    </Row>
  );
}

