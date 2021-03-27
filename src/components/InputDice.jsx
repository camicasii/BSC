import React, { useRef } from "react";
import { InputGroup, FormControl,Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
export default function InputDice(props) {
  const dispatch = useDispatch()
  const ref = useRef(0);
  return (
    <Col xs="6" md="3">
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm " className="text-secondary">
          {props.text}
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        ref={ref}
        disabled={props.disabled}
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={() => {
          if (props.setActivate) {
            dispatch(props.setValue(ref.current.value));
          }
        }}
      />
      {props.children}
    </InputGroup>
    </Col>
  );
}
