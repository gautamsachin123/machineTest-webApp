import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR,
  DELETE_COUNTRY_REQUEST,
  DELETE_COUNTRY_SUCCESS,
  SAVE_COUNTRY_REQUEST
} from "./contants";
import { LOGOUT } from "../login/constants";

const initialState = {
  requesting: false,
  countries: [],
  error: null
};

const countryReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        requesting: true,
        countries: [],
        error: null
      };

    case FETCH_COUNTRIES_SUCCESS:
      return {
        requesting: false,
        countries: action.countries
      };

    // Append the error returned from our api
    case FETCH_COUNTRIES_ERROR:
      return {
        requesting:false,
        error:null
      };

      case DELETE_COUNTRY_REQUEST:
      return {
        requesting:true,
        error:null
      };

      case DELETE_COUNTRY_SUCCESS:
      return {
         requesting: false,delete:true
        };
        case SAVE_COUNTRY_REQUEST:
        return {
           requesting: true
          };
          case LOGOUT:
          return {
             requesting: true
            }    
      

    default:
      return state;
  }
};

export default countryReducer;
