import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import CopyrightIcon from '@material-ui/icons/Copyright';

const styles = {
  footer: {
    color: '#fff',
    textAlign: 'center',
    padding: 20,
    marginTop: '100px',
    backgroundColor: '#223238',
    minHeight: '80px'
  },
  container: {
    marginTop: '10px'
  },
  copyright: {
    color: '#edf5e1',
    fontSize: '12px',
    verticalAlign: 'text-top'
  },
  footerText: {
    margin: 'auto 5px auto 5px'
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    },
    color: '#5cdb95',
    margin: 10
  }
};

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <Container maxWidth='sm' className={classes.container}>
        <Typography className={classes.copyright} variant='caption'>
          <CopyrightIcon className={classes.copyright} /> 2019 Birdbook. All
          rights reserved.
        </Typography>
      </Container>
      <Container maxWidth='sm' className={classes.container}>
        <Typography
          component={Link}
          to={ROUTES.PRIVACY}
          className={classes.link}
          variant='caption'
        >
          Privacy
        </Typography>
        <Typography
          component={Link}
          to={ROUTES.TERMS}
          className={classes.link}
          variant='caption'
        >
          Terms of Use
        </Typography>
      </Container>
    </footer>
  );
};

export default withStyles(styles)(Footer);
