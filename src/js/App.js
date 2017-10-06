import React, { Component } from 'react';

import CitizensUnited from '../../build/contracts/CitizensUnited.json';

const baseCls = 'App';

class App extends Component {
  constructor() {
    super();

    this.state = {
      costOfSpeech: null,
      message: null,
      tsar: null,
    };

    const citizensUnited = web3.eth.contract(CitizensUnited.abi);
    this.contractInstance = citizensUnited.at('0x3aa10d7fd6c6b947d83f2cdd90fb6878d2967430');

    this.fetchContractState = this.fetchContractState.bind(this);
    this.setMessage = this.setMessage.bind(this);

    setInterval(this.fetchContractState, 5000);
    // console.log(this.contractInstance);
  }

  fetchContractState() {
    this.contractInstance.costOfSpeech((error, result) => {
      if (!error) {
        const costOfSpeech = parseFloat(web3.fromWei(result, 'ether'));
        this.setState({ costOfSpeech });
      } else {
        console.log('[error] costOfSpeech:', error)
      }
    });
    this.contractInstance.message((error, message) => {
      if (!error) {
        this.setState({ message });
      } else {
        console.log('[error] message:', error)
      }
    });
    this.contractInstance.tsar((error, tsar) => {
      if (!error) {
        this.setState({ tsar });
      } else {
        console.log('[error] tsar:', error)
      }
    });
  }

  setMessage() {
    const message = this.msgInput.value;
    const value = parseInt(this.valueInput.value);

    const txOptions = {
      from: web3.eth.accounts[0],
      value: web3.toWei(value, 'ether')
    };

    this.contractInstance.setMessage(message, txOptions, (error, result) => {});
  }

  render() {
    return (
      <div className={baseCls}>
        <div className="jumbo">
          <div className="jumbo__attribute attribute">
            <div className="attribute__label">
              cost of speech
            </div>
            <div className="attribute__value">
              {this.state.costOfSpeech}
            </div>
          </div>
          <div className="jumbo__attribute attribute">
            <div className="attribute__label">
              tsar
            </div>
            <div className="attribute__value">
              {this.state.tsar}
            </div>
          </div>
          <div className="jumbo__attribute attribute">
            <div className="attribute__label">
              message
            </div>
            <div className="attribute__value">
              {this.state.message}
            </div>
          </div>
        </div>

        <div className="form">
          <label htmlFor="msgInput">message
            <input name="msgInput" type="text" ref={el => this.msgInput = el} />
          </label>
          <label htmlFor="valueInput">value
            <input name="valueInput" type="text" ref={el => this.valueInput = el} />
          </label>

          <button onClick={this.setMessage}>SUBMIT</button>
        </div>
      </div>
    );
  }
}

export default App;
