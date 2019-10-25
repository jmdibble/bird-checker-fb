import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  TextArea,
  TextareaAutosize
} from '@material-ui/core';

const styles = {
  card: {
    padding: '10px',
    margin: '50px auto 50px auto',
    width: '80%',
    maxWidth: '1200px',
    textAlign: 'center'
  },
  textField: {
    margin: '5px auto 20px auto',
    width: '75%'
  },
  typographyHeader: {
    margin: 'auto auto 20px auto'
  },
  sectionHeader: {
    // textAlign: 'left',
    margin: '30px auto auto auto'
  }
};

class ReportBug extends Component {
  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h4' className={classes.typographyHeader}>
              Got a suggestion?
            </Typography>
            <Typography variant='h6' className={classes.sectionHeader}>
              Let us know!
            </Typography>
            <form onSubmit={this.onSubmit}>
              <Grid>
                <TextField className={classes.textField} label='Subject' />
                <TextField
                  className={classes.textField}
                  label='Describe it here'
                  multiline='true'
                  rows='5'
                />
              </Grid>
              <Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  variant='contained'
                  color='#f44336'
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles))(ReportBug);
