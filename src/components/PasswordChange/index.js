import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

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
  button: {
    margin: '20px auto 40px auto'
  },
  typographyHeader: {
    margin: 'auto auto 20px auto'
  },
  sectionHeader: {
    // textAlign: 'left',
    margin: '30px auto auto auto'
  },
  linkText: {
    textDecoration: 'none',
    color: '#a8a8a8'
  },
  divider: {
    margin: '10px auto 10px auto'
  }
};

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE, username: '', email: '' };

  componentDidMount() {
    this.unsubscribe = this.props.firebase
      .user(this.props.authUser.uid)
      .onSnapshot(snapshot => {
        this.setState({ username: snapshot.data().username });
        this.setState({ email: snapshot.data().email });
      });

    console.log(this.props.authUser.uid);
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error, username, email } = this.state;

    const { classes, authUser } = this.props;

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid>
              <Typography variant='h4' className={classes.typographyHeader}>
                Account admin
              </Typography>
              {/* <Typography variant='body1' className={classes.sectionHeader}>
                <strong>Username:</strong> {username + ' '}
                <strong>Email:</strong> {email}
              </Typography> */}
              <Typography variant='h6' className={classes.sectionHeader}>
                Reset password
              </Typography>
              {/* <Divider variant='middle' className={classes.divider} /> */}
            </Grid>
            <form onSubmit={this.onSubmit}>
              <Grid>
                <TextField
                  className={classes.textField}
                  name='passwordOne'
                  label='New password'
                  value={passwordOne}
                  type='password'
                  onChange={this.onChange}
                  required='true'
                />
                <TextField
                  className={classes.textField}
                  name='passwordTwo'
                  label='Confirm password'
                  value={passwordTwo}
                  type='password'
                  onChange={this.onChange}
                  required='true'
                />
              </Grid>
              <Typography variant='body2' className={classes.linkText}>
                {error && <p>{error.message}</p>}
              </Typography>
              <Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Reset password
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default compose(
  withFirebase,
  withStyles(styles)
)(PasswordChangeForm);
