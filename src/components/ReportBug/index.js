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

import emailjs from 'emailjs-com';

const styles = {
  card: {
    padding: '10px',
    margin: '50px auto 50px auto',
    width: '80%',
    maxWidth: '1000px',
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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      content: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    emailjs
      .send(
        'default_service',
        'suggestion_firm',
        this.state,
        'user_YzqATWnhoGzmy1tHYi8ri'
      )
      .then(
        response => {
          console.log(this.state);
          console.log('SUCCESS!', response.status, response.text);
          this.setState({ subject: '', content: '', email: '' });
        },
        err => {
          console.log('FAILED...', err);
        }
      );
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h6' className={classes.sectionHeader}>
              Got a suggestion? Let us know!
            </Typography>
            <form onSubmit={this.onSubmit}>
              <Grid>
                <TextField
                  name='email'
                  className={classes.textField}
                  label='Your email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <TextField
                  name='subject'
                  className={classes.textField}
                  label='Subject'
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                />
                <TextField
                  name='content'
                  className={classes.textField}
                  label='Describe it here'
                  multiline='true'
                  rows='5'
                  value={this.state.content}
                  onChange={this.handleInputChange}
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
