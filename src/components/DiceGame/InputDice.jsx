import React, { useRef } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
export default function InputDice(props) {
  const ref = useRef(0);
  return (
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">
          {props.children}
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
            props.setValue(ref.current.value);
          }
        }}
      />
    </InputGroup>
  );
}
