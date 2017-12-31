import React from 'react';

const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  const classNames = [
    'form__entry__input',
    (touched && error) ? 'form__entry__input--has-error' : '',
  ].join(' ');

  return (
    <div className='form__entry'>
      <label className='form__entry__label'>{label}</label>
      <div>
        <input
          {...input}
          className={classNames}
          placeholder={label}
          type={type}
        />
        {touched && (
          (error && <div className='form__entry__error'>{error}</div>)
        )}
      </div>
    </div>
  )
};


export default RenderField;
