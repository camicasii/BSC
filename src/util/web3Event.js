const HDWalletProvider = require('@truffle/hdwallet-provider');
const key ="b0004f47f310cc1dd64421d9fbed38a1fe3100b593b71622481862ef16d16e97"
const provider =  new HDWalletProvider(key, `https://data-seed-prebsc-1-s1.binance.org:8545`)
var Web3 = require('web3');
const abi=[
	{
		"constant": false,
		"inputs": [],
		"name": "back",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "guessRef",
				"type": "uint256"
			},
			{
				"name": "bet",
				"type": "uint256"
			},
			{
				"name": "lowOrHigher",
				"type": "bool"
			}
		],
		"name": "game",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "token_",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "profit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "bet",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "guessRef",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "roll",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "win",
				"type": "bool"
			}
		],
		"name": "LastBet",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getbalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "bet",
				"type": "uint256"
			},
			{
				"name": "lowOrHigher",
				"type": "bool"
			}
		],
		"name": "getProfit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRamdomNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "magicFunction",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "lowOrHigher",
				"type": "bool"
			}
		],
		"name": "rollDice",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var web3 = new Web3(provider);

var contract = new web3.eth.Contract(abi,'0x5687f484EceE076768977Fc44704593B16bECc3F')
async function  getBalance(){
    var balace =await contract.methods.getbalance().call() 
    console.log(balace / 10**18)
}
async function  game(){
     contract.methods.game(80,
        web3.utils.numberToHex(1*(10**18))
        , false).send({from:web3.eth.accounts.privateKeyToAccount(key).address}
        )
    .on('transactionHash', function(hash){
        console.log(hash);
    })
    //console.log(balace / 10**18)
}

async function eventHandler(){
    var event_ = await contract.getPastEvents('LastBet', {
     //   filter: {player: '0xD43b7B9146636ac5FAAbF6AD95376F6e74fE863c'},
        fromBlock: await web3.eth.getBlockNumber() - 999,
        toBlock: 'latest'
    })   
    
    for(var i = 0;i< event_.length;i++){
        console.log(
            event_[i].returnValues
        )
    }
}

game()
//console.log(web3.eth.defaultAccount);
//console.log(web3.eth.accounts.privateKeyToAccount(key).address);