import React from 'react';

// MUI
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const styles = {
  searchBirds: {
    flexGrow: 1,
    width: '100%'
  }
};

function SearchBar({ classes, onChange }) {
  return (
    <Grid item xs={9}>
      <TextField
        placeholder='Search birds...'
        className={classes.searchBirds}
        // ref={input => (this.searchBar = input)}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color='action' />
            </InputAdornment>
          )
        }}
      />
    </Grid>
  );
}

export default withStyles(styles)(SearchBar);
