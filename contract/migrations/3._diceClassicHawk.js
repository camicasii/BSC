const DiceClassicHawk = artifacts.require("DiceClassicToken");
//colocar el address del token, para ser insertado en el payload del
//contructor del contrato DiceClassicHawk
const token ="0x96e2467F53f010eCB07B25F998fB9c2Ca949304C"
module.exports = function (deployer) {
  deployer.deploy(DiceClassicHawk,token);
};


