const initialState = {
  blockNum:1
};

export const TYPE_BLOCK_NUM = "FETCH_SURVEYS"

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_BLOCK_NUM:
      return {
        ...state,
        blockNum: action.payload
      }
    default:
      return state;
  }
};
