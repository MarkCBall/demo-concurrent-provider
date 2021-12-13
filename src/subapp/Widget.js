import React, { Component } from 'react';
import { connect } from 'react-redux';
import createServices from './services/createServices';
import TxButton from "./TxButton";

class Survey extends Component {
  componentDidMount() {
    this.props.getBlockNum()
  }


  render() {


    return <>
      <br/>
      ------------------------------
      <br/><br/>
      <br/><br/>
      <div style={{border:"solid"}}>
      EXECUTE TRADE<br/>
        <TxButton network={this.props.network}/>
      </div>


      <br/><br/><br/><br/>
      latest block {this.props.blockNum}
      <br/>
      (fetched without using a wallet)
      <br/>
      ------------------------------
      <br/><br/>
      <br/><br/>
      Account balance: (TODO)
    </>
  }
}

const mapStateToProps = state => {
  return {
    blockNum: state.blockchain.blockNum,
  };
};

const mapDispatchToProps = (dispatch,props) => {
  const services = createServices(props.network)
  return {
  getBlockNum: () => dispatch(services.getBlockNum()),
  // makeTx: (amount) => dispatch(services.makeTx(amount))
}};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Survey);
