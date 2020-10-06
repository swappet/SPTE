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
      version: "0.5.2",
      docker: false,
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  }
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

## edit first contact 
add `contracts/SPTE.sol`:
```
// contracts/SPTE.sol
// Copyright (C) 2020, 2021, 2022 Swap.Pet@pm.me
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract SPTE {
    uint256 public value;

    function increase() public {
      value++;
    }
}
```

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
✓ Deployed instance of SPTE
0xCfEB869F69431e42cdB54A4F4f105C19C080A601
```

## deploy as `upgradeable` contact
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

? Choose the kind of deployment upgradeable
? Pick a network development
? Pick a contract to deploy SPTE
✓ Contract SPTE deployed
All implementations have been deployed
? Call a function to initialize the instance after creating it? No
✓ Setting everything up to create contract instances
✓ Instance created at 0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb
To upgrade this instance run 'oz upgrade'
0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb
```

## truffle migrate
add `migrations/2_deploy_SPTE.js`:
```
const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;

async function deploy(options) {
  add({ contractsData: [{ name: 'SPTE', alias: 'SPTE' }] });
  await push(options);
  await create(Object.assign({ contractAlias: 'SPTE' }, options));
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] })
    await deploy({ network, txParams })
  })
}

```

truffle migrate:
```
$ npx truffle migrate

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1 
> Everything is up to date, there is nothing to compile.

Starting migrations...
======================
> Network name:    'development'
> Network id:      1601970275037
> Block gas limit: 6721975 (0x6691b7)


2_deploy_SPTE.js
================
0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   0
> Final cost:          0 ETH
```

## interact with openzeppelin CLI
such as deploy at :0xCfEB869F69431e42cdB54A4F4f105C19C080A601
```
$ npx oz send-tx     
? Pick a network development
? Pick an instance SPTE at 0xCfEB869F69431e42cdB54A4F4f105C19C080A601
? Select which function increase()
✓ Transaction successful. Transaction hash: 0xf9e47cca9c7817cd693d68877fd81220f8f307d4cbddc7e1aab335141c8a4e9e

$ npx oz call   
? Pick a network development
? Pick an instance SPTE at 0xCfEB869F69431e42cdB54A4F4f105C19C080A601
? Select which function value()
✓ Method 'value()' returned: 1
1
```