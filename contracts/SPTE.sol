// contracts/SPTE.sol
// Copyright (C) 2020, 2021, 2022 Swap.Pet@pm.me
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract SPTE is ERC777 {

    /// @notice ERC777 standard which is backwards compatible with ERC20.
    /// @dev decimals of ERC20 always returns a fixed value of 18 in ERC777
    /// @param initialSupply assign the initialSupply to the deployer account
    /// @param defaultOperators If you’re not planning on using operators in your token, you can simply pass an empty array
    constructor(uint256 initialSupply, address[] memory defaultOperators)
        public
        ERC777("SwapPetTokenEgg", "SPTE", defaultOperators)
    {
        _mint(msg.sender, initialSupply, "", "");
    }
}

// contract SPTE {
//     uint256 public value;

//     function increase() public {
//       value++;
//     }
// }