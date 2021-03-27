import React from 'react'
import { Row, Col } from "react-bootstrap";
import Logo from "./Logo";
export default function DiceHeader() {
    return (
        <Row className="">
        <Col xs="4" md="6" className="flex w-100">
              <Logo />
            </Col>
            <Col  xs="12" className="my-4 center px-5 " >
              <p className="text-truncate ">              
                contract address:              
                <a
                  className="text-decoration-none px-2 text-info h6 "
                  href={process.env.REACT_APP_DICE_URL}
                  target="_blank"
                >                
                  {process.env.REACT_APP_DICE_ADDRESS}                
                </a>
              
              </p>
            </Col>
        </Row>
    )
}
