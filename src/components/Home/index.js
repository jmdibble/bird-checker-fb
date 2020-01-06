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
import SearchIcon from '@material-ui/icons/Search';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Divider,
  CircularProgress,
  Menu,
  MenuItem
} from '@material-ui/core';

const styles = {
  button: {
    margin: 10
  },
  gridContainer: {
    margin: 'auto',
    justifyContent: 'center',
    width: '80%'
  },
  card: {
    width: '60%',
    minWidth: 150,
    // minHeight: 140,
    // maxWidth: 700,
    margin: '40px auto 60px auto'
  },
  root: {
    // flexGrow: 1,
    // textAlign: 'center'
  },
  itemsBox: {
    textAlign: 'left',
    padding: '0px 10px 0px 10px',
    '&:hover': {
      backgroundColor: '#f1f1f1',
      borderRadius: '5px'
    }
  },
  titleGrid: {
    alignItems: 'center',
    textAlign: 'left',
    margin: 'auto auto 20px auto',
    padding: 7
  },
  searchBirds: {
    flexGrow: 1,
    width: '100%'
  },
  filterIcon: {
    textAlign: 'right'
  },
  formGroupBirds: {
    marginTop: '15px'
  },
  dialog: {
    maxHeight: '900px'
  },
  image: {
    maxWidth: '300px',
    paddingBottom: '10px',
    marginTop: '15px',
    textAlign: 'center'
  },
  loading: {
    margin: 10
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
    listLoading: false,
    imageLoading: false,
    allBirds: [],
    seenBirdsUid: [],
    seenBirds: [],
    unseenBirds: [],
    checkedValues: [],
    open: false,
    dialogTitle: '',
    birdImageUrl: '',
    filtered: [],
    filterClicked: false
  };

  componentDidMount() {
    this.setState({ listLoading: true });
    // API call to set the state with the full list of birds
    let allBirds = [];
    this.unsubscribe = this.props.firebase
      .birds()
      // .get()
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          allBirds.push({ name: doc.data().name, uid: doc.id });
        });
        allBirds.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({ allBirds: allBirds });
        this.setState({ filtered: allBirds });
      });

    // API call to set the state with all the uids of the birds the logged in user has seen
    this.unsubscribe = this.props.firebase
      .user(this.props.authUser.uid)
      .onSnapshot(snapshot => {
        this.setState({ seenBirdsUid: snapshot.data().birds });
      });
    console.log(this.state.seenBirdsUid);
    this.setState({ listLoading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    // API call to map through each bird uid in the state and console log the name
    // then save any checked birds to state and console log it
    if (this.state.seenBirdsUid !== prevState.seenBirdsUid) {
      this.setState({ listLoading: true });
      let seenBirds = [];
      this.state.seenBirdsUid.forEach(bird => {
        this.unsubscribe = this.props.firebase
          .bird(bird.uid)
          .onSnapshot(snapshot => {
            seenBirds.push(snapshot.data().name);
            this.setState({ seenBirds: seenBirds }); // revise why the setState can't move down 2 lines.
          });
      });
      this.setState({ listLoading: false });
    }
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
      this.setState({ seenBirdsUid: newBirdArray });
    } else {
      const newBirdArray = this.state.seenBirdsUid.concat(
        this.state.allBirds.filter(bird => {
          return bird.uid === uid;
        })
      );
      this.unsubscribe = this.props.firebase
        .user(this.props.authUser.uid)
        .update({ birds: newBirdArray });
      this.setState({ seenBirdsUid: newBirdArray });
    }
  };

  infoHandler = birdName => {
    this.setState({ imageLoading: true });
    this.props.firebase
      .storageRef()
      .child(`/birds/${birdName}.jpg`)
      .getDownloadURL()
      .then(url => {
        this.setState({ birdImageUrl: url });
        this.setState({ dialogTitle: birdName });
        this.setState({ open: true });
        this.setState({ imageLoading: false });
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  filterSeenBirdsHandler = () => {
    let { allBirds, seenBirds, filterClicked } = this.state;
    if (filterClicked === false) {
      let seenBirdsArray = [];
      allBirds.map(bird => {
        let isChecked = !!seenBirds.includes(bird.name);
        if (isChecked) {
          seenBirdsArray.push(bird);
          this.setState({ filtered: seenBirdsArray });
        }
      });
      this.setState({ filterClicked: true });
    } else {
      this.setState({ filtered: allBirds });
      this.setState({ filterClicked: false });
    }
  };

  filterUnseenBirdsHandler = () => {
    let { allBirds, seenBirds, unseenBirds, filterClicked } = this.state;
    let allBirdsNames = [];
    allBirds.map(bird => {
      allBirdsNames.push(bird.name);
    });
    console.log(allBirdsNames, seenBirds);
    let unseenBirdsArray = allBirdsNames.filter(x => !seenBirds.includes(x));
    console.log(unseenBirdsArray);

    if (filterClicked === false) {
      let unseenBirdsNewArray = [];
      allBirds.map(bird => {
        let isChecked = unseenBirdsArray.includes(bird.name);
        if (isChecked) {
          unseenBirdsNewArray.push(bird);
          console.log(unseenBirdsNewArray);
          this.setState({ filtered: unseenBirdsNewArray });
        }
      });
      this.setState({ filterClicked: true });
    } else {
      this.setState({ filtered: allBirds });
      this.setState({ filterClicked: false });
    }
  };

  menuDrowpdownHandler = () => {};

  searchHandler = e => {
    let allBirdsArray = [];
    let filteredArray = [];

    if (e.target.value !== '') {
      allBirdsArray = this.state.allBirds;
      filteredArray = allBirdsArray.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      filteredArray = this.state.allBirds;
    }
    this.setState({ filtered: filteredArray });
  };

  render() {
    const {
      seenBirds,
      seenBirdsUid,
      allBirds,
      birdImageUrl,
      filtered,
      imageLoading,
      listLoading,
      filterClicked
    } = this.state;
    const { classes } = this.props;

    console.log(seenBirds);
    console.log(seenBirdsUid);

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={1} className={classes.titleGrid}>
              <Grid item xs={9}>
                <TextField
                  placeholder='Search birds...'
                  className={classes.searchBirds}
                  ref={input => (this.searchBar = input)}
                  onChange={this.searchHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon color='action' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {/* <Grid item xs={3} className={classes.filterIcon}>
                {filterClicked ? (
                  <Tooltip title='Unfilter seen birds'>
                    <IconButton onClick={() => this.filterSeenBirdsHandler()}>
                      <FilterListIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title='Filter seen birds'>
                    <IconButton onClick={() => this.filterSeenBirdsHandler()}>
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid> */}
              <Grid item xs={3} className={classes.filterIcon}>
                <PopupState variant='popover' popupId='demo-popup-menu'>
                  {popupState => (
                    <React.Fragment>
                      <Tooltip title='Filter birds'>
                        <IconButton {...bindTrigger(popupState)}>
                          <FilterListIcon />
                        </IconButton>
                      </Tooltip>

                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => this.filterSeenBirdsHandler()}>
                          Seen birds
                        </MenuItem>
                        <MenuItem
                          onClick={() => this.filterUnseenBirdsHandler()}
                        >
                          Unseen birds
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Grid>
            </Grid>

            <Divider variant='light' />
            {listLoading ? (
              <CircularProgress className={classes.loading} />
            ) : (
              <FormGroup className={classes.formGroupBirds}>
                {filtered.map(bird => {
                  let isChecked = !!seenBirds.includes(bird.name);
                  return (
                    <Box
                      display='flex'
                      className={classes.itemsBox}
                      key={bird.name}
                    >
                      <Box flexGrow={1}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id='checkbox'
                              ref='checkbox'
                              checked={isChecked}
                              onClick={() =>
                                this.checkboxHandler(isChecked, bird.uid)
                              }
                              value={bird.name}
                            />
                          }
                          label={bird.name}
                        />
                      </Box>
                      <Box>
                        <IconButton onClick={() => this.infoHandler(bird.name)}>
                          <InfoOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}
              </FormGroup>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={this.state.open}
          onBackdropClick={this.handleClose}
          classes={{
            paper: classes.dialog
          }}
        >
          <DialogTitle>{this.state.dialogTitle}</DialogTitle>
          <Divider variant='middle' />
          <DialogContent>
            {imageLoading ? (
              <CircularProgress className={classes.loading} />
            ) : (
              <img
                className={classes.image}
                src={birdImageUrl}
                alt='bird-image'
              />
            )}
          </DialogContent>
        </Dialog>
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
