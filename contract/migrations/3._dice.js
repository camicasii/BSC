const DiceClassicToken = artifacts.require("DiceClassicToken");
const token ="0x96e2467F53f010eCB07B25F998fB9c2Ca949304C"
const DiceClassic ="0xc1dB3EFAc56CEf11569E6263a629F76c6c1FB33a"
//"0x5687f484EceE076768977Fc44704593B16bECc3F"
//"0x7E16E172542342C0b656C29a214E20d95dA863aa"

module.exports = function (deployer) {
  deployer.deploy(DiceClassicToken,token);
};

//truffle migrationtruffle migrate --network testnet

