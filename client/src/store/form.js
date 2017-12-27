import {
  createAction,
  handleActions,
} from 'redux-actions';

/*
 * ACTIONS
 */

export const actions = {
  setErrors: createAction('set form errors'),
  clearError: createAction('clear error'),
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

  [actions.clearError]: (state, {payload: {formId, fieldName}}) => {
    const form = state[formId];
    const errors = (form.errors || {});
    const nextErrors = Object.keys(errors).reduce((memo, curFieldName) => {
      return curFieldName !== fieldName ? {
        ...memo,
        [curFieldName]: errors[curFieldName],
      } : memo;
    }, {});

    return {
      ...state,
      [formId]: {
        ...form,
        errors: nextErrors,
      }
    }
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
