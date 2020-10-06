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