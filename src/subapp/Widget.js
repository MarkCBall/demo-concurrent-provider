import React, { Component } from 'react';
import { connect } from 'react-redux';
import createServices from './services/createServices';

class Survey extends Component {
  componentDidMount() {
    this.props.getBlockNum()
  }

  render() {
    const random = Math.round(Math.random()*100)
    return <>
      <br/><br/>
      <br/><br/>
      <button onClick={()=>this.props.makeTx(random)}>Post TX {random}</button>
      <br/><br/><br/><br/>
      on block {this.props.blockNum}
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
  makeTx: (amount) => dispatch(services.makeTx(amount))
}};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Survey);
