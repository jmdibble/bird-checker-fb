import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  progress: {
    margin: '10px'
  },
  card: {
    margin: '30px auto 30px auto',
    maxWidth: '90%'
  }
};

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      user: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
      let users = [];
      let user = [];

      // snapshot.forEach(doc => users.push({ ...doc.data(), uid: doc.id }));
      snapshot.forEach(doc => users.push({ ...doc.data(), uid: doc.id }));

      this.setState({
        users,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;
    const { users, loading } = this.state;

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent>
            <h2>User</h2>
            {/* <strong>Username:</strong> {users.uid.username} */}
            <h2>User List</h2>
            {loading && (
              <div>
                <CircularProgress className={classes.progress} />
              </div>
            )}
            <ul>
              {users.map(user => (
                <li key={user.uid}>
                  <span>
                    <strong>ID:</strong> {user.uid}
                  </span>
                  <span>
                    <strong>E-Mail:</strong> {user.email}
                  </span>
                  <span>
                    <strong>Username:</strong> {user.username}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase,
  withStyles(styles)
)(UserList);
