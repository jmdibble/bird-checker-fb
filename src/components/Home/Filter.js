import React from 'react';

// MUI
import { Grid, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const styles = {
  filterIcon: {
    textAlign: 'right'
  }
};

function Filter({ classes, filterClicked, onClick }) {
  return (
    <div>
      <Grid item xs={3} className={classes.filterIcon}>
        {filterClicked ? (
          <Tooltip title='Unfilter seen birds'>
            <IconButton onClick={console.log('filter seen birds')}>
              <FilterListIcon color='primary' />
            </IconButton>
          </Tooltip>
        ) : (
          <PopupState variant='popover' popupId='demo-popup-menu'>
            {popupState => (
              <React.Fragment>
                <Tooltip title='Filter birds'>
                  <IconButton {...bindTrigger(popupState)}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>

                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      console.log('filter seen birds');
                      popupState.close();
                    }}
                  >
                    Seen birds
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      console.log('filter unseen birds');
                      popupState.close();
                    }}
                  >
                    Unseen birds
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        )}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Filter);
