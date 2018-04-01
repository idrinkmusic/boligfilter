export const SELECT_PROPERTIES_LIST = "SELECT_PROPERTIES_LIST";
export const INVALIDATE_PROPERTIES_LIST = "INVALIDATE_PROPERTIES_LIST";
export const REQUEST_PROPERTIES = "REQUEST_PROPERTIES";
export const RECEIVE_PROPERTIES = "RECEIVE_PROPERTIES";

export const selectPropertiesList = propertiesList => {
  return {
    type: SELECT_PROPERTIES_LIST,
    propertiesList
  };
};

export const invalidatePropertiesList = propertyList => {
  return {
    type: INVALIDATE_PROPERTIES_LIST,
    propertyList
  };
};

const requestProperties = propertiesList => {
  return {
    type: REQUEST_PROPERTIES,
    propertiesList
  };
};

const receiveProperties = (propertiesList, json) => {
  return {
    type: RECEIVE_PROPERTIES,
    propertiesList,
    properties: json.map(child => child.data),
    receivedAt: Date.now()
  };
};

const fetchProperties = propertyList => {
  return dispatch => {
    dispatch(requestProperties(propertyList));

    return fetch(`api/${propertyList}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveProperties(propertyList, json)));
  };
};

const shouldFetchProperties = (state, propertiesList) => {
  const properties = state.propertiesByList[propertiesList];

  if (!properties) {
    return true;
  } else if (properties.isFetching) {
    return false;
  } else {
    return properties.didInvalidate;
  }
};

export function fetchPropertiesIfNeeded(propertiesList) {
  return (dispatch, getState) => {
    if (shouldFetchProperties(getState(), propertiesList)) {
      return dispatch(fetchProperties(propertiesList));
    }
  };
}
