// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract WeeklyTokenClaim is Ownable(msg.sender) {
    using SafeMath for uint256;

    IERC20 public token;
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public totalClaimed;
    mapping(address => uint256) public totalSpent;

    uint256 public constant CLAIM_AMOUNT = 100 * 10**18; // 100 tokens
    uint256 public constant CLAIM_PERIOD = 1 weeks;
    uint256 public constant SPEND_THRESHOLD = 80; // 80%

    event TokensClaimed(address indexed user, uint256 amount);
    event WhitelistUpdated(address indexed user, bool status);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function addToWhitelist(address _user) external onlyOwner {
        whitelist[_user] = true;
        emit WhitelistUpdated(_user, true);
    }

    function removeFromWhitelist(address _user) external onlyOwner {
        whitelist[_user] = false;
        emit WhitelistUpdated(_user, false);
    }

    // function claimTokens() external {
    //     require(whitelist[msg.sender], "Address not whitelisted");
    //     require(block.timestamp >= lastClaimTime[msg.sender].add(CLAIM_PERIOD), "Claim period not elapsed");
    //     require(canClaim(msg.sender), "Cannot claim due to high spending");

    //     lastClaimTime[msg.sender] = block.timestamp;
    //     totalClaimed[msg.sender] = totalClaimed[msg.sender].add(CLAIM_AMOUNT);

    //     require(token.transfer(msg.sender, CLAIM_AMOUNT), "Token transfer failed");
    //     emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    // }
    
    function claimTokens() external {
        require(whitelist[msg.sender], "Address not whitelisted");
        require(
            block.timestamp >= lastClaimTime[msg.sender].add(CLAIM_PERIOD),
            "Claim period not elapsed"
        );
        require(canClaim(msg.sender), "Cannot claim due to high spending");

        // Check if the contract has enough tokens
        require(
            token.balanceOf(address(this)) >= CLAIM_AMOUNT,
            "Insufficient contract token balance"
        );

        lastClaimTime[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] = totalClaimed[msg.sender].add(CLAIM_AMOUNT);

        require(
            token.transfer(msg.sender, CLAIM_AMOUNT),
            "Token transfer failed"
        );
        emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    }

    function canClaim(address _user) public view returns (bool) {
        if (totalClaimed[_user] == 0) return true;
        uint256 spendPercentage = totalSpent[_user].mul(100).div(
            totalClaimed[_user]
        );
        return spendPercentage <= SPEND_THRESHOLD;
    }

    function spend(address _user, uint256 _amount) external {
        // This function should be called by the token contract or another authorized contract
        // to track user spending. Implement appropriate access control.
        totalSpent[_user] = totalSpent[_user].add(_amount);
    }

    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(token.transfer(owner(), _amount), "Token transfer failed");
    }

    function contractTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
