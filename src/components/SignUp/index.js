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

const styles = {
  card: {
    padding: '10px',
    margin: '50px auto 50px auto',
    maxWidth: '600px',
    textAlign: 'center'
  },
  // textField: {
  //   margin: 'auto 5px auto 5px'
  // },
  textFieldFull: {
    margin: '5px 10px 20px 10px',
    width: '84%'
  },
  textFieldSplit: {
    margin: '5px 10px 20px 10px',
    width: '40%'
  },
  button: {
    margin: '20px auto 40px auto'
  },
  typographyHeader: {
    margin: 'auto auto 20px auto'
  },
  linkText: {
    textDecoration: 'none',
    color: '#a8a8a8'
  }
};

const SignUpPage = () => (
  <div>
    <h1>Sign up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  birds: [],
  error: null
};

class SignUpFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const {
      username,
      email,
      passwordOne,
      firstname,
      lastname,
      birds
    } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in Firestore
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            firstname,
            lastname,
            email,
            birds
          },
          { merge: true }
        );
      })
      .then(authUser => {
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      firstname,
      lastname,
      error
    } = this.state;

    const { classes } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      firstname === '' ||
      lastname === '';

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid>
              <Typography variant='h4'>Sign up for an account</Typography>
            </Grid>
            <form onSubmit={this.onSubmit}>
              <Grid>
                <TextField
                  className={classes.textFieldFull}
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
                  className={classes.textFieldFull}
                  name='username'
                  label='Choose a username'
                  value={username}
                  type='text'
                  onChange={this.onChange}
                  required='true'
                />
              </Grid>
              <TextField
                className={classes.textFieldSplit}
                name='firstname'
                label='Firstname'
                value={firstname}
                type='text'
                onChange={this.onChange}
                required='true'
              />
              <TextField
                className={classes.textFieldSplit}
                name='lastname'
                label='Lastname'
                value={lastname}
                type='text'
                onChange={this.onChange}
                required='true'
              />
              <Grid>
                <TextField
                  className={classes.textFieldSplit}
                  name='passwordOne'
                  label='Password'
                  value={passwordOne}
                  type='password'
                  onChange={this.onChange}
                  required='true'
                />
                <TextField
                  className={classes.textFieldSplit}
                  name='passwordTwo'
                  label='Confirm password'
                  value={passwordTwo}
                  type='password'
                  onChange={this.onChange}
                  required='true'
                />
              </Grid>
              <Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Sign up
                </Button>
              </Grid>
            </form>
            {error && <p>{error.message}</p>}
            <Grid>
              <Typography
                className={classes.linkText}
                variant='body2'
                component={Link}
                to={ROUTES.SIGN_UP}
              >
                Not a member? Sign up
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
