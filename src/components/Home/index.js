import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import HomePage from './HomePage';
// Firebase
import { withFirebase } from '../Firebase';
import withAuthorization from '../Session/withAuthorization';
import { AuthUserContext } from '../Session';

const Home = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <HomePage authUser={authUser} firebase={firebase} />}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition), withFirebase)(Home);
