import React from 'react'
import { Row } from 'react-bootstrap'
import InputDice from './InputDice'
import { useSelector} from "react-redux";
import { setGuess,setBet,setPayOut,setProfit} from "../redux/slice/gameSlice";

export default function AllInput() {
    const game = useSelector(state => state.state.game)
    return (
        <Row>
            <InputDice             
             value={game.bet}
             setValue={setBet}
             setActivate={true}
             min={1}
             text='Bet'
            />  
            <InputDice
                setValue={setGuess}
                value={game.guess}
                setActivate={true}
                min={2}
                max={98}
                text={!game.radioValue ? "Higher(>=)" : "Lower(<)"}
              />
               <InputDice
                set={setPayOut}
                disabled={true}
                value={game.payOut}
                setActivate={false}
                text='Paypout'
              />
              <InputDice
                setValue={setProfit}
                disabled={true}
                value={game.profit}
                setActivate={false}
                text='Profit'
              />
        </Row>
    )
}
