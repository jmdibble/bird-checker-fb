import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Splash from '../../images/splash1.jpg';
import * as ROUTES from '../../constants/routes';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  splash: {
    position: 'relative',
    maxWidth: '100%'
  },
  buttons: {
    margin: '10px auto 10px auto'
  },
  button: {
    margin: '10px auto 10px auto'
  }
};

const Landing = ({ classes }) => (
  <Fragment>
    <div>
      <img src={Splash} className={classes.splash} />
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          color='primary'
          component={Link}
          to={ROUTES.SIGN_UP}
        >
          Signup
        </Button>
        <Button
          className={classes.button}
          color='primary'
          component={Link}
          to={ROUTES.SIGN_IN}
        >
          Login
        </Button>
      </div>
    </div>
    <h1>LANDING</h1>
  </Fragment>
);

export default withStyles(styles)(Landing);
