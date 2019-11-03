import React, { Fragment } from 'react';

import { Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  textDiv: {
    margin: '50px auto 50px auto',
    maxWidth: '700px'
  },
  box: {
    backgroundColor: '#efefef',
    width: '100%',
    height: 200,
    textAlign: 'center'
  },
  title: {
    paddingTop: 70
  },
  bodyText: {
    marginTop: 25
  }
};

const Privacy = ({ classes }) => {
  return (
    <Fragment>
      <Box className={classes.box}>
        <Typography variant='h2' className={classes.title}>
          Privacy
        </Typography>
      </Box>
      <div className={classes.textDiv}>
        <Typography variant='h6' className={classes.bodyText}>
          The use of this website is subject to the following privacy notice:
        </Typography>
        <Typography variant='body1' className={classes.bodyText}>
          Birdbook takes your privacy seriously.
        </Typography>
        <Typography variant='body1' className={classes.bodyText}>
          We store all your data securely. We do not, and never will buy or sell
          any sensitive data and always put the privacy and security of our
          users as the top priority.
        </Typography>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(Privacy);
