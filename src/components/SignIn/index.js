import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
    padding: '10px',
    margin: '50px auto 50px auto',
    maxWidth: '400px',
    textAlign: 'center'
  },
  textField: {
    margin: '5px auto 20px auto',
    width: '75%'
  },
  button: {
    margin: '20px auto 40px auto'
  }
};

const SignInPage = () => (
  <Fragment>
    <h1>Sign In</h1>
    <SignInForm />
    {/* <PasswordForgetLink /> */}
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
              <Typography variant='h4'>Log in</Typography>
            </Grid>
            <form onSubmit={this.onSubmit}>
              <Grid>
                <TextField
                  className={classes.textField}
                  name='email'
                  label='Email'
                  value={email}
                  type='text'
                  onChange={this.onChange}
                  required='true'
                />
              </Grid>
              <Grid>
                <TextField
                  className={classes.textField}
                  name='password'
                  label='Password'
                  value={password}
                  type='password'
                  onChange={this.onChange}
                  required='true'
                />
              </Grid>
              <Grid>
                <Typography
                  variant='p'
                  component={Link}
                  to={ROUTES.PASSWORD_FORGET}
                >
                  Forgotten password?
                </Typography>
              </Grid>
              <Grid>
                <Button
                  className={classes.button}
                  disabled={isInvalid}
                  type='submit'
                  variant='contained'
                  color='secondary'
                >
                  Log in
                </Button>
              </Grid>
            </form>
            {error && <p>{error.message}</p>}
            <Grid>
              <Typography variant='p'>Not a member? </Typography>
              <Typography variant='p' component={Link} to={ROUTES.SIGN_UP}>
                Sign up now
              </Typography>
            </Grid>
          </CardContent>
        </Card>
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
