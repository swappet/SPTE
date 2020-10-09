// test/lib/ERC20.js
// Copyright (C) 2020, 2021, 2022 Swap.Pet@pm.me
// SPDX-License-Identifier: MIT
const assert = require('assert');
const { ether, constants, expectEvent } = require('@openzeppelin/test-helpers');
exports.detail = (ERC20Detail) => {
    it('name()', async function () {
        assert.equal(ERC20Detail[0], await ERC20Instance.name());
    });
    it('symbol()', async function () {
        assert.equal(ERC20Detail[1], await ERC20Instance.symbol());
    }); 
    it('totalSupply()', async function () {
        assert.equal(ether(ERC20Detail[2]).toString(), (await ERC20Instance.totalSupply()).toString());
    });
} 
exports.decimals = (decimals) => { 
    it('decimals()', async function () {
        assert.equal(decimals, (await ERC20Instance.decimals()).toString());
    });
}
exports.balanceOf = (balance, account, desc) => { 
    it(desc + ': balanceOf()', async function () {
        assert.equal(ether(balance).toString(), (await ERC20Instance.balanceOf(account)).toString());
    });
}
exports.cap = (cap,desc) => { 
    it(desc + ': cap()', async function () {
        assert.equal(ether(cap).toString(), (await ERC20Instance.cap()).toString());
    });
}
exports.transfer = (sender, receiver, amount, desc, reject, msg) => { 
    it(desc + ': transfer()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.transfer(receiver, ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.transfer(receiver, ether(amount), { from: sender });
            expectEvent(receipt, 'Transfer', {
                from: sender,
                to: receiver,
                value: ether(amount),
            });
        }
    });
}
exports.approve = (sender, receiver, amount, desc, reject, msg) => {
    it(desc + ': approve()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.approve(receiver, ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.approve(receiver, ether(amount), { from: sender });
            expectEvent(receipt, 'Approval', {
                owner: sender,
                spender: receiver,
                value: ether(amount),
            });
        }
    });
}
exports.transferFrom = (owner, sender, receiver, amount, desc, reject, msg) => { 
    it(desc + ': transferFrom()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.transferFrom(owner, receiver, ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.transferFrom(owner, receiver, ether(amount), { from: sender });
            expectEvent(receipt, 'Transfer', {
                from: owner,
                to: receiver,
                value: ether(amount),
            });
        }
    });
}
exports.allowance = (owner, sender, amount, desc) => { 
    it(desc + ': allowance()', async function () {
        assert.equal(ether(amount), (await ERC20Instance.allowance(owner, sender)).toString());
    });
}
exports.increaseAllowance = (sender, receiver, amount, desc, reject, msg) => { 
    it(desc + ': increaseAllowance()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.increaseAllowance(receiver, ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.increaseAllowance(receiver, ether(amount), { from: sender });
            expectEvent(receipt, 'Approval', {
                owner: sender,
                spender: receiver,
            });
        }
    });
}
exports.decreaseAllowance = (sender, receiver, amount, desc, reject, msg) => { 
    it(desc + ': decreaseAllowance()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.decreaseAllowance(receiver, ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.decreaseAllowance(receiver, ether(amount), { from: sender });
            expectEvent(receipt, 'Approval', {
                owner: sender,
                spender: receiver,
            });
        }
    });
}
exports.burn = (sender, amount, desc, reject, msg) => { 
    it(desc + ': burn()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.burn(ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.burn(ether(amount), { from: sender });
            expectEvent(receipt, 'Transfer', {
                from: sender,
                to: constants.ZERO_ADDRESS,
                value: ether(amount),
            });
        }
    });
}
exports.burnFrom = (owner, sender, amount, desc, reject, msg) => { 
    it(desc + ': burnFrom()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.burnFrom(owner, ether(amount), { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.burnFrom(owner, ether(amount), { from: sender });
            expectEvent(receipt, 'Transfer', {
                from: owner,
                to: constants.ZERO_ADDRESS,
                value: ether(amount),
            });
            expectEvent(receipt, 'Approval', {
                owner: owner,
                spender: sender,
            });
        }
    });
}
exports.mint = (owner, beneficiary, amount, desc, reject, msg) => { 
    it(desc + ': mint()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.mint(beneficiary, ether(amount), { from: owner }), msg);
        } else {
            let receipt = await ERC20Instance.mint(beneficiary, ether(amount), { from: owner });
            expectEvent(receipt, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: beneficiary,
                value: ether(amount),
            });
        }
    });
}

exports.addMinter = (minter, sender, desc, reject, msg) => { 
    it(desc + ': addMinter()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.addMinter(minter, { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.addMinter(minter, { from: sender });
            expectEvent(receipt, 'MinterAdded', {
                account: minter
            });
        }
    });
}
exports.isMinter = (minter, isMinter, desc) => { 
    it(desc + ': isMinter()', async function () {
        assert.equal(isMinter, await ERC20Instance.isMinter(minter));
    });
}
exports.renounceMinter = (minter, desc, reject, msg) => { 
    it(desc + ': renounceMinter()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.renounceMinter({ from: minter }), msg);
        } else {
            let receipt = await ERC20Instance.renounceMinter({ from: minter });
            expectEvent(receipt, 'MinterRemoved', {
                account: minter
            });
        }
    });
}

exports.addPauser = (pauser, sender, desc, reject, msg) => { 
    it(desc + ': addPauser()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.addPauser(pauser, { from: sender }), msg);
        } else {
            let receipt = await ERC20Instance.addPauser(pauser, { from: sender });
            expectEvent(receipt, 'PauserAdded', {
                account: pauser
            });
        }
    });
}
exports.isPauser = (pauser, isPauser, desc) => { 
    it(desc + ': isPauser()', async function () {
        assert.equal(isPauser, await ERC20Instance.isPauser(pauser));
    });
}
exports.renouncePauser = (pauser, desc, reject, msg) => { 
    it(desc + ': renouncePauser()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.renouncePauser({ from: pauser }), msg);
        } else {
            let receipt = await ERC20Instance.renouncePauser({ from: pauser });
            expectEvent(receipt, 'PauserRemoved', {
                account: pauser
            });
        }
    });
}
exports.paused = (paused, desc) => { 
    it(desc + ': paused()', async function () {
        assert.equal(paused, await ERC20Instance.paused());
    });
}
exports.pause = (pauser, desc, reject, msg) => { 
    it(desc + ': pause()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.pause({ from: pauser }), msg);
        } else {
            let receipt = await ERC20Instance.pause({ from: pauser });
            expectEvent(receipt, 'Paused', {
                account: pauser
            });
        }
    });
}
exports.unpause = (pauser, desc, reject, msg) => { 
    it(desc + ': unpause()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.unpause({ from: pauser }), msg);
        } else {
            let receipt = await ERC20Instance.unpause({ from: pauser });
            expectEvent(receipt, 'Unpaused', {
                account: pauser
            });
        }
    });
} 

exports.snapshot = (owner, desc, reject, msg) => { 
    it(desc + ': snapshot()', async function () {
        if (reject) {
            await assert.rejects(ERC20Instance.snapshot({ from: owner }), msg);
        } else {
            let receipt = await ERC20Instance.snapshot({ from: owner });
            snapshotId = receipt.logs[0].args.id;
            expectEvent(receipt, 'Snapshot', {
                id: receipt.logs[0].args.id
            });
        }
    });
}