import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SECTIONS_SUCCESS,
} from "../constants/categoryConstants";

const initState = {
  categories: [],
  sections:[],
  loading: false,
};
export const categoryreducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case GET_CATEGORY_SUCCESS:
      return (state = {
        ...state,
        loading: false,
      });
      case GET_SECTIONS_SUCCESS:
        return state={
          ...state,
          sections:action.payload
        }

    default:
      return state;
  }
};
