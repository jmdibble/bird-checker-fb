import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import withAuthorization from '../Session/withAuthorization';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const WrappedHomePage = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <HomePage authUser={authUser} firebase={firebase} />}
    </AuthUserContext.Consumer>
  );
};

class HomePage extends Component {
  state = {
    loading: false,
    birds: [],
    seenBirds: []
  };

  componentDidMount() {
    // API call to set the state with all the uids of the birds the logged in user has seen
    this.unsubscribe = this.props.firebase
      .user(this.props.authUser.uid)
      .onSnapshot(snapshot => {
        console.log(snapshot.data().birds);
        this.setState({ birds: snapshot.data().birds });
        // console.log(this.state);
      });

    console.log(this.props.authUser.uid);
  }

  componentDidUpdate(prevProps, prevState) {
    let seenBirds = [];
    // API call to map through each bird uid in the state and console log the name
    if (this.state.birds !== prevState.birds) {
      this.state.birds.forEach(bird => {
        this.unsubscribe = this.props.firebase
          .bird(bird)
          .onSnapshot(snapshot => {
            console.log(snapshot.data().name);
            seenBirds.push(snapshot.data().name);
          });
      });
    }
    console.log(seenBirds);
    // this.setState({ seenBirds: seenBirds });
    // console.log(this.state);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { users, loading, birds } = this.state;

    return (
      <div>
        <h2>My birds</h2>
        <p>{birds}</p>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(WrappedHomePage);
