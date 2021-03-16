"use strict";

var HDWalletProvider = require('@truffle/hdwallet-provider');

var key = "b0004f47f310cc1dd64421d9fbed38a1fe3100b593b71622481862ef16d16e97";
var provider = new HDWalletProvider(key, "https://data-seed-prebsc-1-s1.binance.org:8545");

var Web3 = require('web3');

var abi = [{
  "constant": false,
  "inputs": [],
  "name": "back",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "guessRef",
    "type": "uint256"
  }, {
    "name": "bet",
    "type": "uint256"
  }, {
    "name": "lowOrHigher",
    "type": "bool"
  }],
  "name": "game",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "name": "token_",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "player",
    "type": "address"
  }, {
    "indexed": false,
    "name": "profit",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "bet",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "guessRef",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "roll",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "win",
    "type": "bool"
  }],
  "name": "LastBet",
  "type": "event"
}, {
  "constant": true,
  "inputs": [],
  "name": "getbalance",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "bet",
    "type": "uint256"
  }, {
    "name": "lowOrHigher",
    "type": "bool"
  }],
  "name": "getProfit",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getRamdomNumber",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "magicFunction",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "lowOrHigher",
    "type": "bool"
  }],
  "name": "rollDice",
  "outputs": [{
    "name": "",
    "type": "bool"
  }, {
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "time",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];
var web3 = new Web3(provider);
var contract = new web3.eth.Contract(abi, '0x5687f484EceE076768977Fc44704593B16bECc3F');

function getBalance() {
  var balace;
  return regeneratorRuntime.async(function getBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(contract.methods.getbalance().call());

        case 2:
          balace = _context.sent;
          console.log(balace / Math.pow(10, 18));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function game() {
  return regeneratorRuntime.async(function game$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          contract.methods.game(80, web3.utils.numberToHex(1 * Math.pow(10, 18)), false).send({
            from: web3.eth.accounts.privateKeyToAccount(key).address
          }).on('transactionHash', function (hash) {
            console.log(hash);
          }); //console.log(balace / 10**18)

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function eventHandler() {
  var event_, i;
  return regeneratorRuntime.async(function eventHandler$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = regeneratorRuntime;
          _context3.t1 = contract;
          _context3.next = 4;
          return regeneratorRuntime.awrap(web3.eth.getBlockNumber());

        case 4:
          _context3.t2 = _context3.sent;
          _context3.t3 = _context3.t2 - 999;
          _context3.t4 = {
            fromBlock: _context3.t3,
            toBlock: 'latest'
          };
          _context3.t5 = _context3.t1.getPastEvents.call(_context3.t1, 'LastBet', _context3.t4);
          _context3.next = 10;
          return _context3.t0.awrap.call(_context3.t0, _context3.t5);

        case 10:
          event_ = _context3.sent;

          for (i = 0; i < event_.length; i++) {
            console.log(event_[i].returnValues);
          }

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}

game(); //console.log(web3.eth.defaultAccount);
//console.log(web3.eth.accounts.privateKeyToAccount(key).address);