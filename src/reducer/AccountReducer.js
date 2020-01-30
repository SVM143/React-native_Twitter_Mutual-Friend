let account = {
  categoryList:[],
};
const accountReducer = (state = account, action) => {
  switch (action.type) {
    case "LIST_CAT":
      state = {
        ...state,
        categoryList:!action.payload?[]:state.categoryList.concat(action.payload)
      };
      break;
    default:
  }
  return state;
};

export default accountReducer;
