import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Web3Singleton from "./util/Web3Singleton";

export default function DataTable({ load }) {
  const [items, setitems] = useState(null);
  const [change, setchange] = useState(false);

  function dataHandler(data_) {
    return data_.map((item, i) => {
      let payout = Number(item.guessRef);
      payout = (100 / payout) * 0.9;
      const address = item.player;
      const sizeAddress = address.length * 0.15;
      return (
        <tr key={i}>
          <td>
            {address.slice(0, sizeAddress)}...
            {address.slice(address.length - sizeAddress, address.length - 1)}
          </td>
          <td>{item.guessRef}</td>
          <td>{item.bet / 10 ** 18} </td>
          <td>{item.roll}</td>
          <td>{payout.toFixed(3)}</td>
          <td>
            <span>{item.win ? "+" : "-"}</span>
            {item.profit / 10 ** 18}
          </td>
        </tr>
      );
    });
  }

  useEffect(async () => {
    if (load) {
      let data_ = await Web3Singleton.getInstance().allEventHandler();
      data_ = dataHandler(data_);
      setitems(data_);
    }
    return () => {};
  }, [load, change]);

  useEffect(() => {
    const time = setInterval(async () => {
      if (load) {
        await Web3Singleton.getInstance()
          .contractInstance.events.LastBet(function (error, event) {
            console.log(event);
          })
          .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
          })
          .on("data", async function (event) {
            console.log(event); // same results as the optional callback above
            setchange(!change);
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
  );
}
