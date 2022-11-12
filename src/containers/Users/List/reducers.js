import produce from 'immer';
import { FETCH_USERS_SUCCESS } from './constants';
import { GET_USER_SUCCESS, DELETE_USER_DATA_EDIT } from '../Edit/constants';

const initialState = {
  list: {
    data: [],
    meta: {},
  },
  edit: {},
};

const listUser = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS: {
        const {
          payload: { data, meta },
        } = action;
        draft.list.data = data;
        draft.list.meta = meta;
        break;
      }
      case GET_USER_SUCCESS: {
        const {
          payload: {
            data: { data },
          },
        } = action;
        draft.edit = data;
        break;
      }
      case DELETE_USER_DATA_EDIT: {
        draft.edit = {};
        break;
      }
      default:
        break;
    }
  });

export default listUser;
