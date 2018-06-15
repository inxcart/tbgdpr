import { combineReducers } from 'redux';

import {
  SET_ALL_CUSTOMER_REQUESTS,
  SET_TRANSLATIONS,
  } from '../actions';

const translations = (state = {}, action) => {
  switch (action.type) {
    case SET_TRANSLATIONS:
      return action.translations;
    default:
      return state;
  }
};

const displayedCustomerRequests = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_CUSTOMER_REQUESTS:
      return action.requests;
    default:
      return state;
  }
};

const requests  = combineReducers({
  translations,
  displayedCustomerRequests,
});

export default requests;
