import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.fields.reduce((memo, {name, value=''}) => ({
        ...memo,
        [name]: value,
      }), {}),
    };
  }

  render() {
    const {errors={}} = this.props;

    return (
      <form
        className='form AuthScreen__form'
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.state.fields);
        }}
      >
        {this.props.title && (
          <h1 className='AuthScreen__heading'>{this.props.title}</h1>
        )}
        {this.props.fields.map(field => (
          <label className='form__entry' key={field.name}>
            <span className='form__entry__label'>
              {field.Label}
            </span>
            <input
              type='text'
              name={field.name}
              className='form__entry__input'
              placeholder={field.placeholder}
              onFocus={() => this.props.clearError({
                formId: 'register',
                fieldName: field.name,
              })}
              onChange={({target:{value}}) => {
                this.setState({
                  ...this.state,
                  fields: {
                    ...this.state.fields,
                    [field.name]: value
                  }
                });
              }}
            />
            {Boolean(errors[field.name]) && (
              <span> {errors[field.name].message} </span>
            )}
          </label>
        ))}

        <div className='form__entry'>
          <input
            value="Register"
            type='submit'
            className='form__entry__input form__entry__input--submit'
          />
        </div>
      </form>
    )
  }
}
