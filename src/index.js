import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SubApp from "./subapp/SubApp";

ReactDOM.render(
      <>
        <SubApp widgetName={"pancakeswap"} network={"BSC"}/>
        <SubApp widgetName={"pangolin"} network={"Avalanche"}/>
        <SubApp widgetName={"uniswap"} network={"Ethereum"}/>
      </>,
  document.getElementById('root'),
);
registerServiceWorker();
