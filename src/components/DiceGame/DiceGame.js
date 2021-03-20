import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./css/DiceGame.css";
import Logo from "./Logo";
import InputDice from "./InputDice";
import Bet from "./Bet";
import DataTable from "./DataTable";
import Web3Singleton from "./util/Web3Singleton";

function DiceGame() {
  const [guess, setguess] = useState(50);
  const [radioValue, setRadioValue] = useState(false);
  const [bet, setbet] = useState(1);
  const [payOut, setpayOut] = useState(0);
  const [profit, setprofit] = useState(0);
  const [address, setaddress] = useState(0);
  const [load, setload] = useState(false);
  function calculateProfit(state, guess_, bet) {
    if (guess_ > 98) guess_ = 98;
    if (guess_ < 2) guess_ = 2;
    const prof = calculatePayout(state, guess_);
    return bet * prof * 0.9;
  }
  function calculatePayout(state, guess_) {
    if (guess_ > 98) guess_ = 98;
    if (guess_ < 2) guess_ = 2;

    const scale = state ? guess_ : 100 - guess_;
    return 100 / scale;
  }

  //load web3
  useEffect(() => {
    const time = setInterval(async () => {
      const web3 = new Web3Singleton();
      if (web3.isReady()) {
        await web3.loadBlockchain();
        setload(true);
        clearInterval(time);
      }
    }, 300);
    return () => {
      clearInterval(time);
    };
  }, []);

  useEffect(() => {
    let prof = calculateProfit(radioValue, guess, bet);
    let scale = calculatePayout(radioValue, guess);
    setpayOut(scale.toFixed(4));
    setprofit(prof.toFixed(4));
    return () => {};
  }, [bet, guess, radioValue]);

  useEffect(() => {
    const time = setTimeout(() => {
      var line1 = document.getElementById("Dice-line-1");
      var line2 = document.getElementById("Dice-line-2");
      let guess_ = guess;
      if (guess > 98) guess_ = 98;
      if (guess < 2) guess_ = 2;
      line1.style.backgroundColor = radioValue ? "red" : "aquamarine";
      line2.style.backgroundColor = radioValue ? "aquamarine" : "red";
      line1.style.width = `100%`;
      line2.style.width = `${guess_}%`;
    }, 300);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className="Dice">
      
      <header className="Dice-header">
        <Container>
          <Row>
            <Col xs="4" md="6" className="flex w-100">
              <Logo />
            </Col>
            <Col md="11" className="my-4">
              <p className="h5">
                contract address:
                <a
                  className="text-decoration-none px-2
    text-info h6 "
                  href={process.env.REACT_APP_DICE_URL}
                  target="blank"
                >
                  {process.env.REACT_APP_DICE_ADDRESS}
                </a>
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="5" md="3">
              <InputDice
                setValue={setbet}
                value={bet}
                setActivate={true}
                min={1}
              >
                bet
              </InputDice>
            </Col>

            <Col xs="5" md="3">
              <InputDice
                setValue={setguess}
                value={guess}
                setActivate={true}
                min={2}
                max={98}
              >
                {!radioValue ? "Higher(>=)" : "Lower(<)"}
              </InputDice>
            </Col>
            <Col xs="5" md="3">
              <InputDice
                set={setpayOut}
                disabled={true}
                value={payOut}
                setActivate={false}
              >
                Paypout
              </InputDice>
            </Col>
            <Col xs="5" md="3">
              <InputDice
                setValue={setprofit}
                disabled={true}
                value={profit}
                setActivate={false}
              >
                Profit
              </InputDice>
            </Col>
            <Bet guess={guess} setRadio={setRadioValue} bet={bet} />

            <Col>
              <DataTable load={load} />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default DiceGame;
