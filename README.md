# SPTE
Swap.Pet Token of Eggs from Chicken Farm:
1. SPTE is the token of ERC777 standard which is backwards compatible with ERC20

# Deploy SPTE
`$ npx truffle migrate`

# Create SPTE
## install LTS Node with nvm
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
$ source ~/.bash_profile
$ command -v nvm 
$ nvm -v                
0.36.0
$ nvm ls-remote 
<!-- $ nvm install node # "node" is an alias for the latest version(--lts) -->
$ nvm install --lts
$ node --version
v12.18.4
$ npm -v
6.14.6
$ npx -v
6.14.6
$ nvm reinstall-packages
```

## init project with truffle and ganache-cli
```
$ npm i -g truffle
$ npm i -g ganache-cli
$ mkdir ~/SPTE
$ cd ~/SPTE
$ npm init
$ npm install
$ truffle init
// open new terminal
$ npx ganache-cli --deterministic
```

## init openzeppelin CLI 
init SPTE project with openzeppelin CLI：
```
<!-- $ npm install --save-dev @openzeppelin/cli -->
$ npm install -g @openzeppelin/cli
$ openzeppelin --version
2.8.2
OR 
$ oz --version
$ npx oz --version 
$ cd ~/SPTE
$ npx openzeppelin init
OR
$ npx oz init
```

## Using the OpenZeppelin CLI With Truffle
edit `truffle-config.js`:
```
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
  },

  compilers: {
    solc: {
      version: "^0.6.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
       // evmVersion: "byzantium" // istanbul(default),constantinople,byzantium
      }
    },
  },
}
```

edit `contracts/Migrations.sol`:
```
// contracts/Migrations.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  } 
}
```

## edit `contracts/SPTE.sol` 
OpenZeppelin regular Contracts Library:`$ npm install @openzeppelin/contracts` 
 
## deploy as `regular` contact
```
$ npx oz deploy
✓ Compiling contracts with Truffle, using settings from truffle.js file
Truffle output:
 
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SPTE.sol
> Artifacts written to ~/SPTE/build/contracts
> Compiled successfully using:
   - solc: 0.6.12+commit.27d51765.Emscripten.clang

Truffle output:
 - Fetching solc version list from solc-bin. Attempt #1

? Choose the kind of deployment regular
? Pick a network development
? Pick a contract to deploy SPTE
? name: string: Swap.Pet Token of Eggs
? symbol: string: SPTE
? totalSupply: uint256: 1000000e18
✓ Deployed instance of SPTE
0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab
```

## interact with openzeppelin CLI
such as deploy at :0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab
```
$ npx oz send-tx     
? Pick a network development
? Pick an instance SPTE at 0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab
? Select which function snapshot()
✓ Transaction successful. Transaction hash: 0x947478321c2c0d5fc2e3ec9951b2baa0dbb60e990482be3f35259bbf6022dd9a
Events emitted: 
 - Snapshot(1)

$ npx oz call   
? Pick a network development
? Pick an instance SPTE at 0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab
? Select which function balanceOfAt(account: address, snapshotId: uint256)
? account: address: 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
? snapshotId: uint256: 1
✓ Method 'balanceOfAt(address,uint256)' returned: 1000000000000000000000000000000000000000000
1000000000000000000000000000000000000000000
```

## .gitignore
add in file of `.gitignore`:
```
# openzeppelin
.openzeppelin/.session
.openzeppelin/dev-*.json
build/
```
