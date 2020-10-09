// test-environment.config.js

module.exports = {
  accounts: {
    amount: 10, // Number of unlocked accounts
    ether: 100, // Initial balance of unlocked accounts (in ether)
  },

  contracts: {
    type: 'truffle', // Contract abstraction to use: 'truffle' for @truffle/contract or 'web3' for web3-eth-contract
    defaultGas: 6e6, // Maximum gas for contract calls (when unspecified)

    // Options available since v0.1.2
    defaultGasPrice: 20e9, // Gas price for contract calls (when unspecified)
    artifactsDir: 'build/contracts', // Directory where contract artifacts are stored
  },

  node: { // Options passed directly to Ganache client
    gasLimit: 8e6, // Maximum gas per block
    gasPrice: 20e9, // Sets the default gas price for transactions if not otherwise specified.
    allowUnlimitedContractSize: false, // Allows unlimited contract sizes.
    // fork: 'https://mainnet.infura.io/v3/{token}@{blocknumber}', // An url to Ethereum node to use as a source for a fork
    // unlocked_accounts: ['0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'], // Array of addresses specifying which accounts should be unlocked.
  },
  // setupProvider: (baseProvider) => {
  //   const { GSNDevProvider } = require('@openzeppelin/gsn-provider');
  //   const { accounts } = require('@openzeppelin/test-environment');

  //   return new GSNDevProvider(baseProvider, {
  //     txfee: 70,
  //     useGSN: false,
  //     ownerAddress: accounts[8],
  //     relayerAddress: accounts[9],
  //   });
  // },
};