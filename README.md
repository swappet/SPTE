# SPTE
Swap.Pet Token of Eggs from Chicken Farm

# Deploy SPTE


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
$ mkdir SPTE
$ cd SPTE
$ npm init
$ npm install
$ truffle init
// open new terminal
$ npx ganache-cli --deterministic
```

