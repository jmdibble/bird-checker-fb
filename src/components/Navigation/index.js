import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1
  },
  title: {
    color: '#fff',
    flexGrow: 1,
    textDecoration: 'none'
  }
};

const Navigation = ({ authUser, classes, firebase }) => (
  <div>
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          className={classes.title}
          component={Link}
          to={ROUTES.LANDING}
        >
          LOGO
        </Typography>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <Fragment>
                <Button color='inherit' component={Link} to={ROUTES.HOME}>
                  Home
                </Button>
                <Button color='inherit' onClick={firebase.doSignOut}>
                  Logout
                </Button>
                <IconButton color='inherit' component={Link} to={ROUTES.ADMIN}>
                  <AccountCircle />
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button color='inherit' component={Link} to={ROUTES.SIGN_UP}>
                  Signup
                </Button>
                <Button color='inherit' component={Link} to={ROUTES.SIGN_IN}>
                  Login
                </Button>
              </Fragment>
            )
          }
        </AuthUserContext.Consumer>
      </Toolbar>
    </AppBar>
  </div>
);

export default withFirebase(withStyles(styles)(Navigation));
