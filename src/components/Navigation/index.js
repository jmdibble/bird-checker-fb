import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Logo from '../../images/birdbook logo2.png';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    flexGrow: 1
  },
  header: {
    backgroundColor: '#223238',
    boxShadow: 'none'
  },
  spacer: {
    flexGrow: 1
  },
  logo: {
    maxWidth: '100px'
  },
  search: {
    flexGrow: 1,
    backgroundColor: '#ffffff40',
    borderRadius: '5px',
    padding: '3px 5px 3px 15px'
  }
};

const Navigation = ({ authUser, classes, firebase }) => (
  <div>
    <AppBar className={classes.header} position='static'>
      <Toolbar>
        <Link to='/'>
          <img src={Logo} className={classes.logo} />
        </Link>
        <Typography className={classes.spacer}></Typography>
        <InputBase className={classes.search} placeholder='Search users…' />
        <Typography className={classes.spacer}></Typography>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <Fragment>
                <Button color='inherit' component={Link} to={ROUTES.HOME}>
                  Birds
                </Button>
                <Button color='inherit' onClick={firebase.doSignOut}>
                  Logout
                </Button>
                <IconButton
                  color='inherit'
                  component={Link}
                  to={ROUTES.ACCOUNT}
                >
                  <Tooltip title='Account'>
                    <AccountCircle />
                  </Tooltip>
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button color='inherit' component={Link} to={ROUTES.SIGN_UP}>
                  Sign up
                </Button>
                <Button color='inherit' component={Link} to={ROUTES.SIGN_IN}>
                  Log in
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
