import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
// Redux
import { connect } from 'react-redux';
import {
  getBirds,
  searchFilter,
  infoClicked,
  getUsers
} from '../../redux/index';
// Components
import BirdsList from './BirdsList';
import SearchBar from './SearchBar';
import InfoDialog from './InfoDialog';
import Filter from './Filter';
// MUI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';

const styles = {
  card: {
    width: '60%',
    minWidth: 150,
    margin: '40px auto 60px auto'
  },
  titleGrid: {
    alignItems: 'center',
    textAlign: 'left',
    margin: 'auto auto 20px auto',
    padding: 7
  }
};

class HomePage extends Component {
  state = {
    dialogOpen: false,
    filterClicked: false
  };

  componentDidMount = () => {
    this.props.getBirds(this.props.firebase);
    this.props.getUsers(this.props.firebase, this.props.authUser);
  };

  handleSearch = e => {
    this.props.searchFilter(e.target.value, this.props.birds.birds);
  };

  handleInfo = birdName => {
    this.props.infoClicked(this.props.firebase, birdName);
    this.openDialog();
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  handleFilter = () => {
    this.setState({ filterClicked: !this.state.filterClicked });
    console.log(this.state.filterClicked);
  };

  render() {
    const {
      classes,
      birds,
      filteredList,
      infoClicked,
      firebase,
      birdImageUrl,
      birdName,
      imageLoading
    } = this.props;
    const { dialogOpen, filterClicked } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={1} className={classes.titleGrid}>
            <SearchBar onChange={this.handleSearch} />
            <Filter onClick={this.handleFilter} filterClicked={filterClicked} />
          </Grid>
          <BirdsList
            allBirds={filteredList.length > 0 ? filteredList : birds.birds}
            infoClicked={() => infoClicked(firebase)}
            handleInfo={this.handleInfo}
          />
          <InfoDialog
            birdImageUrl={birdImageUrl}
            birdName={birdName}
            dialogOpen={dialogOpen}
            dialogClose={this.closeDialog}
            imageLoading={imageLoading}
          />
        </CardContent>
      </Card>
    );
  }
}

HomePage.propTypes = {
  authUser: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    birds: state.birds.birds,
    loading: state.birds.loading,
    error: state.birds.error,
    filteredList: state.filters.filteredList,
    birdImageUrl: state.clickables.birdImageUrl,
    imageLoading: state.clickables.loading,
    birdName: state.clickables.birdName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBirds: firebase => dispatch(getBirds(firebase)),
    searchFilter: (value, list) => dispatch(searchFilter(value, list)),
    infoClicked: (firebase, birdName) =>
      dispatch(infoClicked(firebase, birdName)),
    getUsers: (firebase, authUser) => dispatch(getUsers(firebase, authUser))
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
