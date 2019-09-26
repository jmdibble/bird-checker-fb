import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class HomePage extends Component {
  state = {
    loading: false,
    birdsGlobal: [],
    birdsChecked: [],
    users: []
  };

  // componentDidMount() {
  //   users.get().then(querySnapshot => {
  //     const data = querySnapshot.docs.map(doc => doc.data());
  //     console.log(data);
  //     this.setState({ users: data });
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <p>Username: </p>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
