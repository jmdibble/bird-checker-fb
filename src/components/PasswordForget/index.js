import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

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
  },
  typographyHeader: {
    margin: 'auto auto 20px auto'
  },
  linkText: {
    textDecoration: 'none',
    color: '#a8a8a8'
  }
};

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  message: '',
  error: null
};

class PasswordForgetFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .then(() => {
        this.setState({ message: 'Email sent!' });
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
    const { email, message, error } = this.state;

    const { classes } = this.props;

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid>
              <Typography variant='h4' className={classes.typographyHeader}>
                Forgotten password
              </Typography>
            </Grid>
            <form onSubmit={this.onSubmit}>
              <Grid>
                <TextField
                  className={classes.textField}
                  name='email'
                  label='Email'
                  value={this.state.email}
                  type='text'
                  onChange={this.onChange}
                  required='true'
                />
              </Grid>
              <Typography variant='body2' className={classes.linkText}>
                {error && <p>{error.message}</p>}
                {message && <p>{this.state.message}</p>}
              </Typography>
              <Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Send reset email
                </Button>
              </Grid>
            </form>
            <Grid>
              <Typography
                variant='body2'
                component={Link}
                to={ROUTES.SIGN_IN}
                className={classes.linkText}
              >
                Sign back in
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = compose(
  withFirebase,
  withStyles(styles)
)(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
