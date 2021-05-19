import * as projectType from "./project-type.constants";

const initialState = {
  loading: true,
  data: [],
};
const reducer = (state = initialState, action) => {
  switch(action.type){
      case projectType.GET_PROJECT_TYPE_PENDING: {
          return {
              ...state,
              data: [],
              loading: true
          }
      }
      case projectType.GET_PROJECT_TYPE_SUCCESS: {


          return {
              ...state,
              data: action.payload,
              loading: false
          }
      }
      case projectType.GET_PROJECT_TYPE_ERROR: {
          return {
              ...state,
              data: [],
              loading : false
          }
      }
      default: 
      return state;
  }
}

export default reducer;
