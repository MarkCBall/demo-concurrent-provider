import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SubApp from "./subapp/SubApp";
import  WalletSignerProvider from "./walletManager/signers/WalletConnectionContext";
import WalletConnectionSelectUI from "./walletManager/signers/WalletConnectionSelectUI";

ReactDOM.render(
      <WalletSignerProvider>
        <WalletConnectionSelectUI>
          Demo shows that the block number is concurrently
          <br/>
          fetched from 3 networks. Also we can post TXs to many
          <br/>
          networks at the same time
          <br/>
          <SubApp widgetName={"pancakeswap"} network={"BSC"}/>
          <SubApp widgetName={"pangolin"} network={"Avalanche"}/>
          <SubApp widgetName={"uniswap"} network={"Ethereum"}/>
        </WalletConnectionSelectUI>
      </WalletSignerProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
