import Web3 from "web3";

export default class Web3Singleton {
  address;
  contractInstance = undefined;
  tokenInstance = undefined;
  diceAddress = process.env.REACT_APP_DICE_ADDRESS;
  tokenAddress = process.env.REACT_APP_TOKEN;
  maxBet="10000"
  abiIBEP20 = [
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          internalType: "address",
          name: "guy",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "guy",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "guy",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  abiDice = [
    {
      inputs: [
        {
          internalType: "address",
          name: "token_",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "player",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "profit",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "bet",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "guess",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "roll",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "lowOrHigher",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "win",
          type: "bool",
        },
      ],
      name: "LastBet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "Pause",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "Unpause",
      type: "event",
    },
    {
      constant: false,
      inputs: [],
      name: "back",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "guess",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "bet",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "lowOrHigher",
          type: "bool",
        },
      ],
      name: "game",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "gameCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getbalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "pause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "unpause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  constructor() {
    if (!Web3Singleton._instance) {
      Web3Singleton._instance = this;
    }
    return Web3Singleton._instance;
  }

  static getInstance() {
    if (!Web3Singleton._instance) {
      Web3Singleton._instance = new Web3Singleton();
    }
    return Web3Singleton._instance;
  }

  isReady() {
    try {
      return this.loadWeb3();
    } catch {
      return false;
    }
  }
  async loadBlockchain() {
    let accounts = await window.web3.eth.getAccounts();
    this.setContract();
    window.ethereum.on("accountsChanged", async () => {
      //On change Address
      let accounts = await window.web3.eth.getAccounts();
      this.address = accounts[0];
      console.log(`Account changed: ${accounts[0]}`);
    });
    window.ethereum.on("disconnect", () => {
      //On disconect
      this.address = 0x0000;
      console.log("disconnect");
    });
    this.address = accounts[0];
    //console.log(`Account loged: ${accounts[0]}`)
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return true;
    }
    return false;
  }
  async setContract() {
    console.log("setContract");
    if (!!this.contractInstance) return true;
    this.contractInstance = await new window.web3.eth.Contract(
      this.abiDice,
      this.diceAddress
    );
    this.tokenInstance = await new window.web3.eth.Contract(
      this.abiIBEP20,
      this.tokenAddress
    );
    return !!this.contractInstance;
  }
  async getBalance() {
    if (!!this.contractInstance) {
      const balace_ = await this.tokenInstance.methods
        .balanceOf(this.address)
        .call();
      return balace_;
    }
  }
  async getAllowance() {
    if (!!this.contractInstance) {
      const allowance_ = await this.tokenInstance.methods
        .allowance(this.address, this.diceAddress)
        .call();
      return allowance_;
    }
  }
  async allowance(bet) {
    if (!!this.contractInstance) {      
      const amountToken = window.web3.utils.toWei(String(bet))
      const allowance_ = await this.tokenInstance.methods
        .allowance(this.address, this.diceAddress)
        .call();
        console.log(typeof(amountToken));
      return Number(allowance_) > Number(amountToken)
    }
  }
  async game(guess, bet, state) {
    if (!!this.contractInstance) {
      const amountToken = window.web3.utils.toWei(String(bet))
      const data = await this.contractInstance.methods
        .game(guess, amountToken, state)
        .send({
          from: this.address,
          value: 0,
          gasPrice: window.web3.utils.toBN(25 * 10 ** 9),
        });
      return true;
    }
    return false;
  }

  async approve(bet) {
    if (!!this.contractInstance) {
     
      const amountToken = window.web3.utils.toWei(this.maxBet)
      await this.tokenInstance.methods
        .approve(this.diceAddress, amountToken)
        .send({
          from: this.address,
          value: 0,
          gasPrice: window.web3.utils.toBN(25 * 10 ** 9),
        });
      return true;
    }
    return false;
  }

  async allEventHandler() {
    const latestBlock = await window.web3.eth.getBlock("latest");
    var event_ = await this.contractInstance.getPastEvents("LastBet", {
      fromBlock: latestBlock.number - 4999,
      toBlock: "latest",
    });
    let maxLeng = event_.length;
    maxLeng = maxLeng > 25 ? 25 : maxLeng;
    let allEvent = [];
    if (event_.length > 0)
      for (var i = 0; i < maxLeng; i++) {
        allEvent.push({
          bet: event_[i].returnValues.bet,
          profit: event_[i].returnValues.profit,
          guess: event_[i].returnValues.guess,
          player: event_[i].returnValues.player,
          roll: event_[i].returnValues.roll,
          lowOrHigher: event_[i].returnValues.lowOrHigher,
          win: event_[i].returnValues.win,
        });
      }
    return allEvent.reverse();
  }
}
