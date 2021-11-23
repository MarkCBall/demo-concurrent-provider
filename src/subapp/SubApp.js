import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer  from './reducers'
import thunk from 'redux-thunk';
import Survey from "./Widget";

class SubApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducer,
      applyMiddleware(thunk))
  }

  render() {
    return (
      <Provider store={this.store}>
          <div style={{width:"200px", maxHeight:"400px", overflow:"hidden", display:"inline-block", border:"solid"}}>
            {this.props.widgetName}
            <Survey network={this.props.network}/>
          </div>

      </Provider>
    )
  }
}

export default SubApp;