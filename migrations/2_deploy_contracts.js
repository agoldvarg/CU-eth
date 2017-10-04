const CitizensUnited = artifacts.require('./CitizensUnited.sol');

module.exports = function(deployer) {
  deployer.deploy(CitizensUnited);
};
