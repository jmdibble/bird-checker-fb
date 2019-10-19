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
  Tooltip,
  Paper
} from '@material-ui/core';

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
  },
  titleGrid: {
    alignItems: 'center'
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
    seenBirdsUid: [],
    seenBirds: [],
    checkedValues: []
  };

  componentDidMount() {
    // API call to set the state with the full list of birds
    let allBirds = [];
    this.unsubscribe = this.props.firebase
      .birds()
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          allBirds.push({ name: doc.data().name, uid: doc.id });
        });
        this.setState({ allBirds: allBirds });
      });

    // API call to set the state with all the uids of the birds the logged in user has seen
    this.unsubscribe = this.props.firebase
      .user(this.props.authUser.uid)
      .onSnapshot(snapshot => {
        this.setState({ seenBirdsUid: snapshot.data().birds });
      });
    console.log(this.state.seenBirdsUid);
  }

  componentDidUpdate(prevProps, prevState) {
    // API call to map through each bird uid in the state and console log the name
    // then save any checked birds to state and console log it
    if (this.state.seenBirdsUid !== prevState.seenBirdsUid) {
      let seenBirds = [];
      this.state.seenBirdsUid.forEach(bird => {
        this.unsubscribe = this.props.firebase
          .bird(bird.uid)
          .onSnapshot(snapshot => {
            seenBirds.push(snapshot.data().name);
            this.setState({ seenBirds: seenBirds }); // revise why the setState can't move down 2 lines.
          });
      });
    }
    console.log(this.state.seenBirds);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkboxHandler = (isChecked, uid) => {
    if (isChecked === true) {
      const newBirdArray = this.state.seenBirdsUid.filter(bird => {
        return bird.uid !== uid;
      });
      console.log(newBirdArray);
      this.unsubscribe = this.props.firebase
        .user(this.props.authUser.uid)
        .update({ birds: newBirdArray });
    } else {
      const newBirdArray = this.state.seenBirdsUid.concat(
        this.state.allBirds.filter(bird => {
          return bird.uid === uid;
        })
      );
      console.log(newBirdArray);
      this.unsubscribe = this.props.firebase
        .user(this.props.authUser.uid)
        .update({ birds: newBirdArray });
    }
  };

  render() {
    const { loading, birds, seenBirds, allBirds } = this.state;
    const { classes } = this.props;
    console.log(seenBirds);
    // console.log(this.state);
    return (
      <Fragment>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={1}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={1} className={classes.titleGrid}>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}>
                        <Typography variant='h4'>Birds</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title='Filter seen birds'>
                          <IconButton>
                            <FilterListIcon fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>

                    <FormGroup>
                      {allBirds.map(bird => {
                        let isChecked = !!seenBirds.includes(bird.name);
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                id='checkbox'
                                ref='checkbox'
                                checked={isChecked}
                                onClick={() =>
                                  this.checkboxHandler(isChecked, bird.uid)
                                } // don't know if this wants to be onClick or onCheck
                                // onChange={}
                                value={bird.name}
                              />
                            }
                            label={bird.name}
                          />
                        );
                      })}
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
              {/* <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='h4'>My birds</Typography>
                    {seenBirds.map(seenBird => (
                      <Typography>{seenBird}</Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid> */}
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
