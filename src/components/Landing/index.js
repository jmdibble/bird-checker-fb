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
    textAlign: 'center',
    padding: '0px 0px 50px 0px'
  },
  heroText: {
    textAlign: 'center',
    color: '#edf5e1',
    padding: '100px 0px 50px 0px'
  },
  bodyText: {
    textAlign: 'center',
    padding: '10px 0px 50px 0px'
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
    <Typography variant='body1' className={classes.bodyText}>
      This began as a project to keep track of all the birds I've seen as I
      couldn't find a suitable digital solution. I soon realised others would
      benefit from it so I added the ability to create users and made it public.
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      The aim is to build this out into a comprehensive UK bird reference guide
      and increase the social aspect and eventually create a central community
      for birdwatchers. I will create a feedback section at some point to find
      out the most requested features.
    </Typography>
  </Fragment>
);

export default withStyles(styles)(Landing);
