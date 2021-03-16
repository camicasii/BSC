import { Container,Row,Col,InputGroup,FormControl,
  ToggleButtonGroup,
  ToggleButton,ButtonGroup,Button } from 'react-bootstrap';
import {useRef,useState,useEffect} from 'react'

import './App.css';
import Logo from './components/Logo';
import InputDice from './components/InputDice';
import Bet from './components/Bet';

function App() {
  const [guess, setguess] = useState(50)
  const [radioValue, setRadioValue] = useState(false);
  
  const bet = useRef(0)
  const guessRef = useRef(50)
  const payout = useRef(0)
  const profit = useRef(12125)

  useEffect(() => {
    const time=setTimeout(() => {
    var line1 = document.getElementById('line-1')
    var line2 = document.getElementById('line-2')    
    line1.style.backgroundColor=radioValue?"red":"aquamarine"
    line2.style.backgroundColor=radioValue?"aquamarine":"red"        
    line1.style.width=`100%`
    line2.style.width=`${guess}%`         
    }, 500);
    return () => {
      clearTimeout(time)
    }
  })
  return (
    <div className="App">
      <header className="App-header">
      <Container>
  <Row>
    <Col md="12"> 
    <Logo/>
    </Col>
    <Col md="12"> 
    contract address: ox...
    </Col>
    </Row>
    <Row className="justify-content-center">
     <Col xs="5" md="3">
       <InputDice ref={bet}  >
         bet
       </InputDice>       
  </Col>
  
  <Col xs="5" md="3" onChange={()=>{        
    setguess(guessRef.current.value)    

    }}>
       <InputDice ref={guessRef} value={guess} >
         {!radioValue?'Higher(>=)':'Lower(<)'}
       </InputDice>       
  </Col>
  <Col xs="5" md="3">
       <InputDice ref={payout} disabled={true} value={payout.current.value} >
         Paypout
       </InputDice>       
  </Col>
  <Col xs="5" md="3">
       <InputDice ref={profit} disabled={true} value={2152} >
         Profit
       </InputDice>       
  </Col>     
<Bet guess={guess} setRadio={setRadioValue}/>
    
  </Row>
</Container>
      </header>
    </div>
  );
}

export default App;
/*<button type="button" onClick={(e)=>{e.preventDefault()
  
console.log(bet.current.value,
guessRef.current.value,
payout.current.value,
profit.current.value ,);
  }}>hola</button>
  */