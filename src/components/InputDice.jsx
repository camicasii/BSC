import React from 'react'
import { Container,Row,Col,InputGroup,FormControl } from 'react-bootstrap';

export default React.forwardRef((props, ref) => (

    <InputGroup size="sm"   className="mb-3">
    <InputGroup.Prepend>
    <InputGroup.Text id="inputGroup-sizing-sm">{props.children}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" ref={ref} disabled={props.disabled}
    value={props.value}/>
  </InputGroup>
    ))

