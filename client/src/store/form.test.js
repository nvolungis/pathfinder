import {actions, reducer, selectors} from './form';

describe('selectors', () => {
  const formId = 'testForm';

  const form = {
    title: 'A title',
    fields: [{
      name: 'email',
      label: 'Email',
      placeholder: 'email@email.com',
    }],
    errors: [{
      email: "this is an error",
    }]
  };

  const state = { form : { [formId]: form }};

  describe('getForm', () => {
    it('returns the fields for the given formId', () => {
      expect(selectors.getForm(state, formId)).toEqual(form);
    });
  });
});

describe('reducer', () => {
  describe('initial state', () => {
    it('returns data for all defined forms', () => {
      const keys = Object.keys(reducer(undefined, {}));

      expect(keys).toEqual(['register']);
    });
  });

  describe('#setErrors', () => {
    it('sets the error field on specified formId', () => {
      const state = { 'formId' : {
        title: 'title',
      }};

      const action = actions.setErrors({
        errors: [{email: 'anError'}],
        formId: 'formId'
      });

      expect(reducer(state, action)).toEqual({'formId': {
        title: 'title',
        errors: [{email: 'anError'}],
      }});
    });
  });
});
