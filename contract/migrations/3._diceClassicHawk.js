const DiceClassicHawk = artifacts.require("DiceClassicHawk");
//colocar el address del token, para ser insertado en el payload del
//contructor del contrato DiceClassicHawk
const token ="0x709792Ad37107cd45f79873d7532216C14a36F33"
module.exports = function (deployer) {
  deployer.deploy(DiceClassicHawk,token);
};


