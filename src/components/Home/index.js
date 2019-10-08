import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import withAuthorization from '../Session/withAuthorization';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

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
        });
        this.setState({ allBirds: allBirds });
        console.log(this.state.allBirds);
      });

    // API call to set the state with all the uids of the birds the logged in user has seen
    this.unsubscribe = this.props.firebase
      .user(this.props.authUser.uid)
      .onSnapshot(snapshot => {
        console.log(snapshot.data());
        this.setState({ birds: snapshot.data().birds });
        console.log(this.state);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // API call to map through each bird uid in the state and console log the name
    // then save any checked birds to state and console log it
    if (this.state.birds !== prevState.birds) {
      let seenBirds = [];
      this.state.birds.forEach(bird => {
        console.log(bird);
        this.unsubscribe = this.props.firebase
          .bird(bird.uid)
          .onSnapshot(snapshot => {
            console.log(snapshot.data().name);
            seenBirds.push(snapshot.data().name);
            this.setState({ seenBirds: seenBirds }); // revise why the setState can't move down 2 lines.
          });
      });
    }
    // if (this.state.seenBirds !== prevState.seenBirds) {
    //   console.log(this.state.allBirds);
    //   this.state.birds.forEach((bird, index) => {
    //     if (this.state.seenBirds.includes(bird.name)) {
    //       birds[index].hasSeen = true;
    //     }
    //   });
    // }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loading, birds, seenBirds, allBirds } = this.state;
    const { classes } = this.props;

    console.log(seenBirds);

    return (
      <Fragment>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={3}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='h4'>
                      All birds{' '}
                      <Tooltip title='Filter seen birds' placement='right'>
                        <IconButton>
                          <FilterListIcon fontSize='large' />
                        </IconButton>
                      </Tooltip>
                    </Typography>

                    <FormGroup>
                      {allBirds.map(bird => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={seenBirds.includes(bird)}
                              // onChange={}
                              value={bird}
                            />
                          }
                          label={bird}
                        />
                      ))}
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='h4'>My birds</Typography>
                    {seenBirds.map(seenBird => (
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
