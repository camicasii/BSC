import React, { useEffect } from "react";
import { useToasts } from 'react-toast-notifications'
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAddress} from "./redux/action/userAction";
import { asyncGetBalance,asyncGetAllowance } from "./redux/action/asyncUserAction";
import { setLoad, initContract } from "./redux/action/mainAction";
import Web3Singleton from "./util/Web3Singleton";
import Web3 from "web3";
import Bet from "./components/Bet";
import DataTable from "./components/DataTable";
import CardStab from "./components/CardStab";
import AllInput from "./components/AllInput";
import DiceHeader from "./components/DiceHeader";

export default function App() {
  const { addToast } = useToasts()  
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();
  //load web3
  useEffect(() => {
    let dontConnect= false;
    const time = setInterval(async () => {
      if (window.ethereum) {        
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        addToast("wallet connect", {
          appearance: 'success',
          autoDismiss: true,
        })
        dispatch(setLoad(true));        
        clearInterval(time);
      } else if (window.web3) {        
        window.web3 = new Web3(window.web3.currentProvider);
        addToast("wallet connect", {
          appearance: 'success',
          autoDismiss: true,
        })
        dispatch(setLoad(true));
        clearInterval(time);
      }
      else{
        if(!dontConnect){
        addToast("Wallet not connected", {
          appearance: 'error',
          autoDismiss: false,
        })
        dontConnect=true;
      }
      }
    }, 200);
    return () => {
      clearInterval(time);
    };
  }, []);
  //load address
  useEffect(() => {
    const time = setTimeout(async () => {
      if (state.main.load) {
        let accounts = await window.web3.eth.getAccounts();
        window.ethereum.on("accountsChanged", async () => {
          //On change Address
          let accounts = await window.web3.eth.getAccounts();
          dispatch(setAddress(accounts[0]));
          dispatch(initContract());
          console.log(`Account changed: ${accounts[0]}`);
        });
        window.ethereum.on("disconnect", () => {
          //On disconect
          console.log("disconnect");
        });
        dispatch(setAddress(accounts[0]));
        dispatch(initContract());
        clearInterval(time);
      }
    }, 600);
    return () => {
      clearInterval(time);
    };
  }, [state.main.load]);
// load user data
  useEffect(() => {    
    Web3Singleton.getInstance().address = state.user.address;
    dispatch(asyncGetBalance());
    dispatch(asyncGetAllowance());    
  }, [state.main.init]);

  return (
    <div className="Dice relative">      
    
    <div className="hawk-img absolute"/>
    <div className="Dice-header z-index">   
      
      <Container className="relative">
      
      <DiceHeader />
      
        <Row >
          <Col xs="12" className=" justify-content-center">
          <AllInput/>
          </Col>
        </Row>
        <Bet/>        
        <Row className="justify-content-center">
        <CardStab />       
        <DataTable/>        
        </Row>        
        </Container>
     </div>
    </div>
  );
}