import React, { Fragment } from 'react';

import { Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  textDiv: {
    margin: '50px auto 50px auto',
    maxWidth: '700px'
  },
  box: {
    backgroundColor: '#efefef',
    width: '100%',
    height: 200,
    textAlign: 'center'
  },
  title: {
    paddingTop: 60
  }
};

const Terms = ({ classes }) => {
  return (
    <Fragment>
      <Box className={classes.box}>
        <Typography variant='h2' className={classes.title}>
          Terms of Use
        </Typography>
      </Box>
      <div className={classes.textDiv}>
        <Typography variant='body1'>
          The use of this website is subject to the following terms of use: The
          content of the pages of this website is for your general information
          and use only. It is subject to change without notice. This website
          uses cookies to monitor browsing preferences. If you do allow cookies
          to be used, the following personal information may be stored by us for
          use by third parties: [insert list of information]. Neither we nor any
          third parties provide any warranty or guarantee as to the accuracy,
          timeliness, performance, completeness or suitability of the
          information and materials found or offered on this website for any
          particular purpose. You acknowledge that such information and
          materials may contain inaccuracies or errors and we expressly exclude
          liability for any such inaccuracies or errors to the fullest extent
          permitted by law. Your use of any information or materials on this
          website is entirely at your own risk, for which we shall not be
          liable. It shall be your own responsibility to ensure that any
          products, services or information available through this website meet
          your specific requirements. This website contains material which is
          owned by or licensed to us. This material includes, but is not limited
          to, the design, layout, look, appearance and graphics. Reproduction is
          prohibited other than in accordance with the copyright notice, which
          forms part of these terms and conditions. All trade marks reproduced
          in this website which are not the property of, or licensed to, the
          operator are acknowledged on the website. Unauthorised use of this
          website may give rise to a claim for damages and/or be a criminal
          offence. From time to time this website may also include links to
          other websites. These links are provided for your convenience to
          provide further information. They do not signify that we endorse the
          website(s). We have no responsibility for the content of the linked
          website(s). Your use of this website and any dispute arising out of
          such use of the website is subject to the laws of England, Northern
          Ireland, Scotland and Wales.
        </Typography>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(Terms);
