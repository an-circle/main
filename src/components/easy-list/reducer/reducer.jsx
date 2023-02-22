export default (state, action) => {
  switch (action.type) {
    case "setInstance": {
      console.log(state, action, "state,action");
      return {
        ...state,
        // instance,
      };
    }
    default:
      return state;
  }
};
