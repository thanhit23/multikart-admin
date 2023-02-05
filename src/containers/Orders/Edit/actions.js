import {
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
  GET_ORDERS_REQUEST,
  GET_ORDERS_FAILED,
  GET_ORDERS_SUCCESS,
  RESET_ORDER_EDIT,
} from './constants';

export const getOrder = (id, callback) => ({
  type: GET_ORDERS_REQUEST,
  payload: { id, callback },
});

export const resetOrderEdit = () => ({
  type: RESET_ORDER_EDIT,
});

export const getOrderSuccessfully = data => ({
  type: GET_ORDERS_SUCCESS,
  payload: {
    data,
  },
});
export const getOrderFailed = message => ({
  type: GET_ORDERS_FAILED,
  payload: { message },
});

export const updateOrder = (id, data, callback) => ({
  type: UPDATE_ORDER_REQUEST,
  payload: { id, data, callback },
});
export const updateOrderSuccessfully = () => ({
  type: UPDATE_ORDER_SUCCESS,
});
export const updateOrderFailed = message => ({
  type: UPDATE_ORDER_FAILED,
  payload: { message },
});
