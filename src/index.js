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
          Terminal layout has many apps, each connecting to the blockchain
          <br/>
          Each app should only need to deal with wallets when making a transaction
          <br/>
          <br/>
          <SubApp widgetName={"pancakeswap(BSC)"} network={"BSC"}/>
          <SubApp widgetName={"pangolin(Ava)"} network={"Avalanche"}/>
          <SubApp widgetName={"uniswap(Eth)"} network={"Ethereum"}/>
        </WalletConnectionSelectUI>
      </WalletSignerProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
