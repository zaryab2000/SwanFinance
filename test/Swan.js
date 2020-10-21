const Swan = artifacts.require('Swan.sol');

const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('CXSwanN Contract', async (accounts) => {


    it('Should correctly initialize constructor of Swan token Contract', async () => {

        this.tokenhold = await Swan.new(accounts[0],{ gas: 600000000 });

    });

    it('Should check a name of a token', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, "Swan Finance");

    });

    it('Should check a symbol of a token', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, "SWAN");

    });

    it('Should check a decimal of a token', async () => {

        let decimals = await this.tokenhold.decimals.call();
        assert.equal(decimals, 18);

    });

    it('Should check a balance of a token contract', async () => {

        let owner = await this.tokenhold.balanceOf.call(this.tokenhold.address);
        assert.equal(owner.toNumber()/10**18,0);

    });

    it('Should check a balance of a owner contract', async () => {

        let owner = await this.tokenhold.balanceOf.call(accounts[0]);
        assert.equal(owner.toString(),'1000000000000000000000000');

    });

    it('Should check a total supply of a contract', async () => {

        let owner = await this.tokenhold.totalSupply();
        assert.equal(owner.toString(),'1000000000000000000000000');

    });

    it('Should check a leverage of a smart contract', async () => {

        let leverage = await this.tokenhold.leverage();
        assert.equal(leverage.toString(),'90');

    });

    it('Should check a univ2 address', async () => {

        let getUNIV2Address = await this.tokenhold.getUNIV2Address();
        assert.equal(getUNIV2Address.toString(),'0x0000000000000000000000000000000000000000');

    });

    it('Should check a univ2 liquidity', async () => {

        let getUNIV2Liq = await this.tokenhold.getUNIV2Liq();
        assert.equal(getUNIV2Liq.toString(),'0');

    });

    it('Should check a univ2 ups burned', async () => {

        let getUPSBurned = await this.tokenhold.getUPSBurned();
        assert.equal(getUPSBurned.toString(),'0');

    });

    it('Should check a univ2 total supply', async () => {

        let getUPSTotalSupply = await this.tokenhold.getUPSTotalSupply();
        assert.equal(getUPSTotalSupply.toString(),'1000000000000000000000000');

    });

    it('Should check a mySteam of accounts 0', async () => {

        let mySteam = await this.tokenhold.mySteam(accounts[0]);
        assert.equal(mySteam.toString(),'0');

    });

    it('Should check a mySteam accounts 0', async () => {

        let myPressure = await this.tokenhold.myPressure(accounts[0]);
        assert.equal(myPressure.toString(),'0');

    });

    it('Should Not be able to set univ2 address by not allowed only', async () => {

        try {
            await this.tokenhold.setUNIv2(accounts[1], {from : accounts[1]});
            } catch (error) {
                var error_ = 'Returned error: VM Exception while processing transaction: revert onlyAllowed -- Reason given: onlyAllowed.';
                assert.equal(error.message, error_, 'Reverted ');
            }

    });

    it('Should be able to set univ2 address by allowed only', async () => {

        await this.tokenhold.setUNIv2(accounts[1], {from : accounts[0]});

    });

    it('Should Not be able to set treasury address by not allowed only', async () => {

        try {
            await this.tokenhold.setTreasury(accounts[1], {from : accounts[1]});
            } catch (error) {
                var error_ = 'Returned error: VM Exception while processing transaction: revert onlyAllowed -- Reason given: onlyAllowed.';
                assert.equal(error.message, error_, 'Reverted ');
            }

    });

    it('Should be able to set treasury address by allowed only', async () => {

        await this.tokenhold.setTreasury(accounts[2], {from : accounts[0]});

    });

    it('Should Not be able to set leverage address by not allowed only', async () => {

        try {
            await this.tokenhold.setLeverage(8, {from : accounts[1]});
            } catch (error) {
                var error_ = 'Returned error: VM Exception while processing transaction: revert onlyAllowed -- Reason given: onlyAllowed.';
                assert.equal(error.message, error_, 'Reverted ');
            }

    });

    it('Should be able to set leverage address by allowed only', async () => {

        await this.tokenhold.setLeverage(10, {from : accounts[0]});

    });


    it("should check approval by accounts 4 to accounts 2", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[2]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        this.tokenhold.approve(accounts[4], web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });

    });

    it("should increase Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        this.tokenhold.increaseAllowance(accounts[4], web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });

    });

    it("should decrease Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        this.tokenhold.decreaseAllowance(accounts[4], web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });

    });

    it("should Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        let allowanceLater = await this.tokenhold.allowance.call(accounts[2], accounts[4]);
        assert.equal(allowanceLater, 50 * 10 ** 18, "allowance is wrong when approve");

    });

    it('Should be able to transfer tokens by owner', async () => {

        await this.tokenhold.transfer(accounts[1],web3.utils.toHex(100 * 10 ** 18), {from : accounts[0]});

    });

    it('Should check a balance of a token Receiver', async () => {

        let owner = await this.tokenhold.balanceOf.call(accounts[1]);
        assert.equal(owner.toString(),'100000000000000000000');

    });

    it('Should be able to transfer tokens by owner', async () => {

        await this.tokenhold.transfer(accounts[4],web3.utils.toHex(100 * 10 ** 18), {from : accounts[0]});

    });

    it('Should check a balance of a token Receiver', async () => {

        let owner = await this.tokenhold.balanceOf.call(accounts[4]);
        assert.equal(owner.toString(),'100000000000000000000');

    });

    it("should be able to transferfrom accounts[4] to accounts[1]", async () => {

        //this.tokenhold.transferFrom(accounts[4],accounts[2],web3.utils.toHex(50 * 10 ** 18),{from: accounts[1] });

    });

    it('Should check a balance of a univ2', async () => {

        let owner = await this.tokenhold.balanceOf.call(accounts[1]);
        assert.equal(owner.toString(),'100000000000000000000');

    });

    it('Should be able to transfer tokens by uniswap address', async () => {

        await this.tokenhold.transfer(accounts[5],web3.utils.toHex(50 * 10 ** 18), {from : accounts[1]});

    });


    it('Should check a balance of a token Receiver', async () => {

        let owner = await this.tokenhold.balanceOf.call(accounts[5]);
        assert.equal(owner.toString(),'50000000000000000000');

    });

    it('Should check a my pressure univ2', async () => {

        let myPressure = await this.tokenhold.myPressure(accounts[1]);
        assert.equal(myPressure.toString(),'0');

    });
    it('Should check a mySteam of accounts 0', async () => {

        let mySteam = await this.tokenhold.mySteam(accounts[0]);
        assert.equal(mySteam.toString(),'0');

    });
    it('Should check a mySteam of univ2', async () => {

        let mySteam = await this.tokenhold.mySteam(accounts[1]);
        assert.equal(mySteam.toString(),'0');

    });

    it('Should be able to transfer tokens by uniswap address', async () => {


        it('Should Not be able to set univ2 address by not allowed only', async () => {

            try {
                await this.tokenhold.transfer(accounts[1],web3.utils.toHex(0), {from : accounts[1]});
                } catch (error) {
                    var error_ = 'Returned error: VM Exception while processing transaction: revert no Steam to generate -- Reason given: no Steam to generate.';
                    assert.equal(error.message, error_, 'Reverted ');
                }
    
        });
    });


    it("should check approval by accounts 0 to SWAN to spend tokens on the behalf of accounts 0", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[0], this.SWAN.address);
        assert.equal(allowance/10**18, 100, "allowance is wrong when approve");

    });

    it("should be able to stake tokens for 3 months", async () => {

        this.SWAN.staking(web3.utils.toHex(10 * 10 ** 18),3, { from: accounts[0]});

    });

    it('Should check a balance of a SWAN address by token holder after swaping', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(this.SWAN.address);
        assert.equal(balanceOf/10**18,110);

    });

    it('Should check a balance of a SWAN by token holder', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(accounts[0]);
        assert.equal(balanceOf/10**18,9999999890);

    });    

    it('Should check a staking Active or not', async () => {

        let stakingActive = await this.SWAN.stakingActive.call(accounts[0]);
        assert.equal(stakingActive, true);

    });

    it('Should check a staking parameters', async () => {

        let stakingEvent = await this.SWAN.stakingEvent.call(accounts[0]);
         console.log(stakingEvent[0].toString());
         console.log(stakingEvent[1].toString());
         console.log(stakingEvent[2].toString());
    });


    it('Should be able to increase time to get first cycle', async () => {

        this.openingTime = (await latestTime());
        await increaseTimeTo(this.openingTime + duration.seconds(7776000));

    });

    it("should be able to withdraw after 3 months", async () => {

        this.SWAN.withdrawStaking({ from: accounts[0]});

    });


    it('Should check a staking Active or not after staking done onces', async () => {

        let stakingActive = await this.SWAN.stakingActive.call(accounts[0]);
        assert.equal(stakingActive, false);

    });

    it('Should check a staking parameters', async () => {

        let stakingEvent = await this.SWAN.stakingEvent.call(accounts[0]);
         console.log(stakingEvent[0].toString());
         console.log(stakingEvent[1].toString());
         console.log(stakingEvent[2].toString());
    });

})



