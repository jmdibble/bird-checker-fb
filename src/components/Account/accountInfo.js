import React from 'react';

// MUI
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    padding: '10px',
    margin: '50px auto 50px auto',
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center'
  },
  typography: {
    marginTop: '20px',
    marginBottom: '20px'
  }
};

const AccountInfo = ({ classes, authUser }) => {
  return (
    <Card className={classes.card}>
      <Typography variant='h4' className={classes.typography}>
        You are logged in as:
      </Typography>
      <Typography variant='h6' className={classes.typography}>
        {authUser.email}
      </Typography>
      <Typography></Typography>
    </Card>
  );
};

export default withStyles(styles)(AccountInfo);
