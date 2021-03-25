import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import {Card,Button, Row,Col} from "react-bootstrap";
export default function CardStab() {
    const [address, setaddress] = useState("0x000")
    const state = useSelector(state => state.state)    
    useEffect(() => {             
        const sizeAddress = state.user.address.length * 0.10;
        const newAdress = state.user.address.slice(state.user.address.length - sizeAddress, state.user.address.length)                
        setaddress(newAdress)        
        return () => {        
        }
    }, [state.user.address])
    
    return (
        <Col className="my-4" xs="12" md="6">
        <Card className="dice-card-blue "  >
            <Card.Header className="h4">Player data</Card.Header>
            <Card.Body>
            <Row className="h5">
                <Col md="6">
                <Card.Text><span className="px-2 text-info">Addres:</span>...{address}</Card.Text>
                </Col>
                <Col md="6">
                <Card.Text><span className="px-2 text-info">Balance:</span>
                {(state.user.balance / (10**18)).toFixed(4)}
                <span className="px-1 text-uppercase">HAW</span></Card.Text>
                </Col>                
                <Card.Text><span className="px-2 text-info">Approve:</span>
                {(state.user.allowance / (10**18)).toFixed(4)}
                <span className="px-1">HAW</span>
                </Card.Text>                
                <Col>
                    <Button variant="primary">Buy tokens</Button>
                </Col>                    
                </Row>
                
            </Card.Body>     
    </Card>
    </Col>
    )
}
