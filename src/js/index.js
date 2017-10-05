import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';

import '../stylesheets/index.scss';
import App from './App';

const setupWeb3 = () => {
  if (typeof window.web3 !== 'undefined') {
    console.warn('[web3]: using injected web3 instance');

    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.warn('[web3]: falling back to localhost');

    window.web3 = new Web3(new Web3.providers.HttpProvider("http://locahost:8545"))
  }
}


ReactDOM.render(<App />, document.getElementById('root'), setupWeb3);
