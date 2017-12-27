import {
  createAction,
  handleActions,
} from 'redux-actions';

/*
 * ACTIONS
 */

export const actions = {
  setErrors: createAction('set form errors'),
};

/*
 * SELECTORS
 */

export const selectors = {
  getForm: (state, formId) => {
    return state.form[formId]
  },
};

/*
 * REDUCER
 */

export const reducer = handleActions({
  [actions.setErrors]: (state, {payload: {formId, errors}}) => {
    const form = state[formId];
    return {
      ...state,
      [formId]: {
        ...form,
        errors,
      }
    };
  },
}, {
  'register': {
    title: "Sign Up",
    fields: [{
      name: 'email',
      label: 'Email',
      placeholder: 'neil@gmail.com',
    }, {
      name: 'password',
      label: 'Password',
      placeholder: '********',
    }]
  }
});
