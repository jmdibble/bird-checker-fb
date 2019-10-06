import React, { Fragment } from 'react';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import CopyrightIcon from '@material-ui/icons/Copyright';

const styles = {
  footer: {
    color: '#fff',
    textAlign: 'center',
    padding: 20,
    marginTop: '100px',
    backgroundColor: '#379683',
    minHeight: '80px'
  },
  container: {
    marginTop: '10px'
  },
  copyright: {
    fontSize: '12px',
    verticalAlign: 'text-top'
  },
  footerText: {
    margin: 'auto 5px auto 5px'
  }
};

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <Container maxWidth='sm' className={classes.container}>
        <Typography variant='caption'>
          <CopyrightIcon className={classes.copyright} /> 2019 Josh Dibble
        </Typography>
      </Container>
      <Container maxWidth='sm' className={classes.container}>
        <Typography className={classes.footerText} variant='caption'>
          Privacy
        </Typography>
        <Typography className={classes.footerText} variant='caption'>
          Terms & Conditions
        </Typography>
      </Container>
    </footer>
  );
};

export default withStyles(styles)(Footer);
