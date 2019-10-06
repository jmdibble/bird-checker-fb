import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import withAuthorization from '../Session/withAuthorization';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography, Card, CardContent, Grid } from '@material-ui/core';

const styles = {
  button: {
    margin: 10
  },
  gridContainer: {
    margin: 'auto',
    justifyContent: 'center',
    maxWidth: '80%'
  },
  card: {
    width: 350,
    minWidth: 150,
    minHeight: 140,
    maxWidth: 500,
    margin: '40px auto 60px auto'
  },
  root: {
    flexGrow: 1,
    textAlign: 'center'
  }
};

const WrappedHomePage = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <HomePage authUser={authUser} firebase={firebase} />}
    </AuthUserContext.Consumer>
  );
};

class HomePageContent extends Component {
  state = {
    loading: false,
    allBirds: [],
    birds: [],
    seenBirds: []
  };

  componentDidMount() {
    // API call to set the state with the full list of birds
    let allBirds = [];
    this.unsubscribe = this.props.firebase
      .birds()
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data().name);
          allBirds.push(doc.data().name);
          this.setState({ allBirds: allBirds });
          console.log(this.state.allBirds);
        });
      });

    // API call to set the state with all the uids of the birds the logged in user has seen
    this.unsubscribe = this.props.firebase
      .user(this.props.authUser.uid)
      .onSnapshot(snapshot => {
        console.log(snapshot.data().birds);
        this.setState({ birds: snapshot.data().birds });
        // console.log(this.state);
      });

    console.log(this.props.authUser.uid);
  }

  componentDidUpdate(prevProps, prevState) {
    let seenBirds = [];
    // API call to map through each bird uid in the state and console log the name
    // then save any checked birds to state and consle log it
    if (this.state.birds !== prevState.birds) {
      this.state.birds.forEach(bird => {
        this.unsubscribe = this.props.firebase
          .bird(bird)
          .onSnapshot(snapshot => {
            console.log(snapshot.data().name);
            seenBirds.push(snapshot.data().name);
            console.log(seenBirds);
            this.setState({ seenBirds: seenBirds });
            console.log(this.state);
          });
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleShowUserBirds() {}

  render() {
    const { loading, birds, seenBirds } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          View my birds
        </Button>

        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={3}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='h4'>All birds</Typography>
                    {this.state.allBirds.map(bird => (
                      <Typography>{bird}</Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='h4'>My birds</Typography>
                    {this.state.seenBirds.map(seenBird => (
                      <Typography>{seenBird}</Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const HomePage = withStyles(styles)(HomePageContent);

export default compose(
  withAuthorization(condition),
  withFirebase
)(WrappedHomePage);
