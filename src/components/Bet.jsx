import { Container,Row,Col,InputGroup,FormControl,
    ToggleButtonGroup,
    ToggleButton,ButtonGroup,Button } from 'react-bootstrap';
  import {useRef,useState} from 'react'

export default function Bet({guess,setRadio}) {
    const [radioValue, setRadioValue] = useState(false);
    return (
      <Row>
<Col md="12">
        <ButtonGroup toggle >
<ToggleButton      
          size="sm"      
            type="radio"
            variant="success"
            name="radio"
            value={true}
            checked={radioValue === true}
            onChange={(e) => {setRadioValue(true)
              setRadio(true)
            }}
            className="mt-3"
          >Lower</ToggleButton>

<Button size="lg" variant="primary" className="mx-1" >BET</Button>
<ToggleButton            
size="sm"
            type="radio"
            variant="danger"
            name="radio"
            value={false}
            checked={radioValue === false}
            onChange={(e) =>{ setRadioValue(false)
              setRadio(false)}}
            className="mb-3"
          >Higher</ToggleButton>
</ButtonGroup>
</Col>
<Col xs="12" >
    <div className="result w-100 h-25">
      <h3>Result</h3>
      <p>{guess} <span>{radioValue?"<":">="}</span> </p>


      <div className="line relative">
        <div id="line-1" className="line-base line-1" />
        <div id="line-2" className="line-base line-2" />
      </div>
    </div>
  </Col>
</Row>  
    )
}
