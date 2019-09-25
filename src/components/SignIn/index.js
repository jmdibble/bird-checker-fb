import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
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

const styles = {
  card: {
    margin: '50px auto 50px auto',
    maxWidth: '400px',
    textAlign: 'center'
  },
  textField: {
    marginTop: '20px'
  },
  button: {
    marginTop: '40px'
  }
};

const SignInPage = () => (
  <Fragment>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </Fragment>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { classes } = this.props;

    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid>
              <Typography variant='h5'>Log in</Typography>
            </Grid>
            <Grid>
              <TextField className={classes.textField} label='Email' />
            </Grid>
            <Grid>
              <TextField className={classes.textField} label='Password' />
            </Grid>
            <Grid>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
              >
                Log in
              </Button>
            </Grid>
          </CardContent>
        </Card>

        <form onSubmit={this.onSubmit}>
          <input
            name='email'
            value={email}
            onChange={this.onChange}
            type='text'
            placeholder='Email Address'
          />
          <input
            name='password'
            value={password}
            onChange={this.onChange}
            type='password'
            placeholder='Password'
          />
          <button disabled={isInvalid} type='submit'>
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </Fragment>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
