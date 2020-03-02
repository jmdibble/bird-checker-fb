import React from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Box
  // CircularProgress
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const styles = {
  itemsBox: {
    textAlign: 'left',
    padding: '0px 10px 0px 10px',
    '&:hover': {
      backgroundColor: '#f1f1f1',
      borderRadius: '5px'
    }
  },
  formGroupBirds: {
    marginTop: '15px'
  }
};

function BirdsList({ classes, allBirds, handleInfo }) {
  return (
    <FormGroup className={classes.formGroupBirds}>
      {!!allBirds &&
        allBirds.map(bird => {
          return (
            <Box display='flex' className={classes.itemsBox} key={bird.name}>
              <Box flexGrow={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id='checkbox'
                      // ref='checkbox'
                      checked={false}
                      // onClick={() => this.checkboxHandler(isChecked, bird.uid)}
                      value={bird.name}
                    />
                  }
                  label={bird.name}
                />
              </Box>
              <Box>
                <IconButton onClick={() => handleInfo(bird.name)}>
                  <InfoOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
    </FormGroup>
  );
}

BirdsList.propTypes = {
  allBirds: PropTypes.array.isRequired,
  infoClicked: PropTypes.func
};

export default withStyles(styles)(BirdsList);
