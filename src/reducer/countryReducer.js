const countryReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_COUNTRY':
        return state.concat([action.data]);
      default:
        return state;
    }
  }
  export default countryReducer;