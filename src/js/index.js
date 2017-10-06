import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';

import '../stylesheets/index.scss';
import App from './App';

const setupWeb3 = () => {
  if (typeof window.web3 !== 'undefined') {
    console.log('[web3] using injected web3 instance');

    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('[web3] falling back to localhost');

    window.web3 = new Web3(new Web3.providers.HttpProvider("http://locahost:8545"))
  }
}

const getActiveAddress = () =>
  window.web3.eth.getAccounts((error, addresses) =>
    !error && setActiveAddress(addresses[0]));

const setActiveAddress = (addr) =>
  window.activeAddress = addr;

const accountInterval = setInterval(() => {
  if (!window.web3) {
    return;
  }

  getActiveAddress();
}, 1000);

ReactDOM.render(<App />, document.getElementById('root'), setupWeb3);
