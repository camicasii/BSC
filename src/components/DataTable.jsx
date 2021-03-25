import React, { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { setRollCount } from "../redux/slice/gameSlice";
import { Table,Col } from "react-bootstrap";
import Web3Singleton from "../util/Web3Singleton";


export default function DataTable({ load }) {
  const [items, setitems] = useState(null);  
  const state = useSelector(state => state.state)
  const dispatch = useDispatch()

  function dataHandler(data_) {
    return data_.map((item, i) => {
      let payout = parseFloat(item.guess);
      payout = (100 / payout) * 0.9;
      const address = item.player;
      const sizeAddress = address.length * 0.10;
      return (
        <tr key={i}>
          <td>
            {address.slice(0, sizeAddress)}...
            {address.slice(address.length - sizeAddress, address.length)}
          </td>
          <td>X<span className="px-2">{!item.lowOrHigher?">=":"<"}</span>{item.guess}</td>
          <td>{parseFloat(item.bet / 10 ** 18).toFixed(3)} </td>
          <td>{item.roll}</td>
          <td>{payout.toFixed(3)}</td>
          <td>
            <span>{item.win ? "+" : "-"}</span>
            {(parseFloat(item.profit) / 10 ** 18).toFixed(3)}
          </td>
        </tr>
      );
    });
  }

  useEffect(async () => {
    if (state.main.load && !!Web3Singleton.getInstance().contractInstance) {      
      let data_ = await Web3Singleton.getInstance().allEventHandler()
      console.log(data_);      
      data_ = dataHandler(data_);
      setitems(data_);
    }
    return () => {};
  }, [state.game.rollCount]);

  useEffect(() => {
    const time = setInterval(async () => {
      console.log(!!Web3Singleton.getInstance().contractInstance);
      if (!!Web3Singleton.getInstance().contractInstance) {        
        dispatch(setRollCount())        
        Web3Singleton.getInstance()
          .contractInstance.events.LastBet(function (error, event) {
            //console.log(event);
          })
          .on("connected", function (subscriptionId) {
            //console.log(subscriptionId);
          })
          .on("data", async function (event) {
            //console.log(event); // same results as the optional callback above
            dispatch(setRollCount())
          })
          .on("changed", function (event) {
            // remove event from local database
          })
          .on("error", function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log(error);
          });
        clearInterval(time);
      }
    }, 200);
    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <Col className="my-4" xs="10" md="12">              
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Address</th>
          <td>Guess</td>
          <th>Bet</th>
          <th>Roll</th>
          <th>Payout</th>
          <th>Profit</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </Table>
    </Col>
  );
}
