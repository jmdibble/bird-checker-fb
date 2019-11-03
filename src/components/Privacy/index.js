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
    paddingTop: 60
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
        <Typography variant='body1'>Some privacy stuff</Typography>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(Privacy);
