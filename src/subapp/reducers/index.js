import { combineReducers } from 'redux';
import blockchain from './blockchainReducer';


const rootReducer = combineReducers({
  blockchain,
});

export default rootReducer;
