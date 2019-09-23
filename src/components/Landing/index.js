import React from 'react';
import Splash from '../../images/splash1.jpg';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';

const styles = {
  splash: {
    maxWidth: '100%'
  }
};

const Landing = ({ classes }) => (
  <div>
    <img src={Splash} className={classes.splash} />
    <h1>LANDING</h1>
  </div>
);

export default withStyles(styles)(Landing);
