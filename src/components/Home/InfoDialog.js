import React, { Component } from 'react';

// MUI
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  CircularProgress
} from '@material-ui/core';

const styles = {
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

export class InfoDialog extends Component {
  render() {
    const { classes, birdName } = this.props;
    return (
      <Dialog
        open={this.props.dialogOpen}
        onBackdropClick={this.props.dialogClose}
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle>{birdName}</DialogTitle>
        <Divider variant='middle' />
        <DialogContent>
          {this.props.imageLoading ? (
            <CircularProgress className={classes.loading} />
          ) : (
            <img
              className={classes.image}
              src={this.props.birdImageUrl}
              alt='bird-image'
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InfoDialog);
