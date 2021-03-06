const SimpleContract = artifacts.require('SimpleContract');
const truffleAssert = require('truffle-assertions');

contract('SimpleContract', (accounts) => {
  let instance;
  before('should setup the contract instance', async () => {
    instance = await SimpleContract.deployed();
  });

  it('should return the name', async () => {
    const value = await instance.getName();

    console.log(value);
    assert.equal(value, 'my name');
  });

  it('should return change the name', async () => {
    await instance.changeName('your name');
    const value = await instance.getName();

    console.log(value);
    assert.equal(value, 'your name');
  });

  it('should fail', async () => {
    await truffleAssert.reverts(
      instance.changeName('modifier', {
        from: accounts[1]
      })
    );
  });

  it('should check the type of the event', async () => {
    const result = await instance.changeName('hello event');
    truffleAssert.eventEmitted(result, 'NameEvent');
  });

  it('should emit with correct paremeters', async () => {
    const result = await instance.changeName('hello event');
    truffleAssert.eventEmitted(result, 'NameEvent', (event) => {
      return event.evPram == 'hello event';
    });
  });

  it('should print the event paremeters', async () => {
    let result = await instance.changeName('hello event');
    truffleAssert.prettyPrintEmittedEvents(result);
  });
});
