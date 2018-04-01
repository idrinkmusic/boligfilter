import { combineReducers } from "redux";
import {
  SELECT_PROPERTIES_LIST,
  INVALIDATE_PROPERTIES_LIST,
  REQUEST_PROPERTIES,
  RECEIVE_PROPERTIES
} from "./actions";

const selectedPropertiesList = (state = "data1", action) => {
  switch (action.type) {
    case SELECT_PROPERTIES_LIST:
      return action.propertiesList;
    default:
      return state;
  }
};

const properties = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_PROPERTIES_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_PROPERTIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PROPERTIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.properties,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

const propertiesByList = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_PROPERTIES_LIST:
    case RECEIVE_PROPERTIES:
    case REQUEST_PROPERTIES:
      return Object.assign({}, state, {
        [action.propertiesList]: properties(
          state[action.propertiesList],
          action
        )
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  propertiesByList,
  selectedPropertiesList
});

export default rootReducer;
