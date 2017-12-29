import React      from 'react';
import {Redirect} from 'react-router-dom';

class LogOutForm extends React.Component {
  constructor(props) {
    super(props);

    props.onSubmit();
  }

  render() {
    if(!this.props.user) {
      return <Redirect to='/' />
    }

    return (
      <div>logging out</div>
    )
  }
}

export default LogOutForm;
