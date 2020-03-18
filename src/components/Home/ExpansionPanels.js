import React, { Component } from 'react';

import {
  Typography,
  Card,
  CardContent,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { withStyles } from '@material-ui/core/styles';

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

export class ExpansionPanels extends Component {
  render() {
    const {
      classes,
      allBirds,
      handleInfo,
      seenBirds,
      handleCheckbox
    } = this.props;

    let seenBirdsNames = [];
    !!seenBirds &&
      seenBirds.forEach(function(bird) {
        seenBirdsNames.push(bird.name);
      });

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>A</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormGroup className={classes.formGroupBirds}>
              {!!allBirds &&
                !!seenBirds &&
                allBirds.map(bird => {
                  let isChecked = !!seenBirdsNames.includes(bird.name);
                  if (bird.name.startsWith('A')) {
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
                                // ref='checkbox'
                                checked={isChecked}
                                onClick={() => handleCheckbox(isChecked, bird)}
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
                  }
                })}
            </FormGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography>B</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>Content</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography>C</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>Content</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ExpansionPanels);
