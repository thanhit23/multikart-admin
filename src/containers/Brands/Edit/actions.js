import {
  GET_DETAIL_BRAND_REQUEST,
  GET_DETAIL_BRAND_SUCCESS,
  GET_DETAIL_BRAND_FAILED,
  RESET_BRAND_EDIT,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_FAILED,
  UPDATE_BRAND_SUCCESS,
} from './constants';

export const resetBrandEdit = () => ({
  type: RESET_BRAND_EDIT,
});

export const getDetailBrand = id => ({
  type: GET_DETAIL_BRAND_REQUEST,
  payload: { id },
});

export const getDetailBrandSuccess = ({ data }) => ({
  type: GET_DETAIL_BRAND_SUCCESS,
  payload: { data },
});

export const getDetailBrandFailed = () => ({
  type: GET_DETAIL_BRAND_FAILED,
});

export const updateBrand = (id, data, file, callback) => ({
  type: UPDATE_BRAND_REQUEST,
  payload: { id, data, file, callback },
});

export const updateBrandSuccess = () => ({
  type: UPDATE_BRAND_SUCCESS,
});

export const updateBrandFailed = message => ({
  type: UPDATE_BRAND_FAILED,
  payload: { message },
});
