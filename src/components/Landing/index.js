import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Splash from '../../images/splash3.jpg';
import * as ROUTES from '../../constants/routes';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  heroImage: {
    backgroundImage: `url(${Splash})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    height: '700px',
    textAlign: 'center'
  },
  heroText: {
    textAlign: 'center',
    color: '#edf5e1',
    padding: '100px 0px 50px 0px'
  },
  button: {
    margin: '5px'
  }
};

const Landing = ({ classes }) => (
  <Fragment>
    <div className={classes.heroImage}>
      <div className={classes.heroText}>
        <Typography variant='h2'>Britain's #1</Typography>
        <Typography variant='h2'>Digital Bird Book</Typography>
      </div>
      <Button
        className={classes.button}
        variant='contained'
        color='secondary'
        component={Link}
        to={ROUTES.SIGN_UP}
      >
        Sign up
      </Button>
      <Button
        className={classes.button}
        color='#05386b'
        component={Link}
        to={ROUTES.SIGN_IN}
      >
        Log in
      </Button>
    </div>
    <h1>Write some shit here</h1>
  </Fragment>
);

export default withStyles(styles)(Landing);
