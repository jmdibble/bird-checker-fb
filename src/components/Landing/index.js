import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Splash from '../../images/birdhero2.jpg';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GroupIcon from '@material-ui/icons/Group';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const styles = {
  heroImage: {
    backgroundImage: `linear-gradient(rgba(34, 50, 56, 1) 0%,rgba(34, 50, 56, 0.1) 30%), url(${Splash})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    height: '700px',
    textAlign: 'center',
    margin: '0px 0px 70px 0px'
  },
  heroText: {
    position: 'absolute',
    left: '25%',
    top: '35%',
    textAlign: 'left',
    maxWidth: '380px',
    color: '#edf5e1',
    padding: '10px 10px 10px 10px'
  },
  subtitle: {
    margin: '30px auto auto auto'
  },
  bodyTitle: {
    textAlign: 'center',
    margin: '10px auto 50px auto',
    maxWidth: '700px'
  },
  bodyText: {
    textAlign: 'left',
    margin: '10px auto 50px auto',
    maxWidth: '700px'
  },
  button: {
    margin: '25px 15px 0 0 '
  },
  buttonWrapper: {
    textAlign: 'center'
  },
  donateButton: {
    margin: 5
  },
  gridContainer: {
    margin: 'auto',
    justifyContent: 'center',
    maxWidth: '80%'
  },
  card: {
    minWidth: 100,
    minHeight: 140,
    maxWidth: 215,
    margin: '40px auto 60px auto'
  },
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  icons: {
    margin: '20px auto auto auto'
  }
};

const Landing = ({ authUser, classes }) => (
  <Fragment>
    <div className={classes.heroImage}>
      <div className={classes.heroText}>
        <Typography variant='h3'>Britain's #1</Typography>
        <Typography variant='h3'>Digital Bird Book</Typography>
        <Typography variant='subtitle1' className={classes.subtitle}>
          Bird book is the only digital solution to keep track of the birds
          you've seen.
        </Typography>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <div></div>
            ) : (
              <div>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='secondary'
                  component={Link}
                  to={ROUTES.SIGN_UP}
                >
                  Sign up
                </Button>
                <Button
                  className={classes.button}
                  color='#05386b'
                  component={Link}
                  to={ROUTES.SIGN_IN}
                >
                  Log in
                </Button>
              </div>
            )
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
    <Typography variant='h5' className={classes.bodyTitle}>
      About Birdbook
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      This began as a project to keep track of all the birds I've seen as I
      couldn't find a suitable digital solution. I soon realised others would
      benefit from it so I added the ability to create users and made it public.
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      The aim is to build this out into a comprehensive UK bird reference guide
      and increase the social aspect and eventually create a central community
      for birdwatchers. I will create a feedback section at some point to find
      out the most requested features.
    </Typography>
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={3}>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia>
                <CheckCircleIcon
                  color='primary'
                  fontSize='large'
                  className={classes.icons}
                />
              </CardMedia>
              <CardContent>
                <Typography variant='h6'>Feature 1</Typography>
                <Typography variant='body2'>
                  Keep a checklist of all the UK birds you've seen
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia>
                <GroupIcon
                  color='primary'
                  fontSize='large'
                  className={classes.icons}
                />
              </CardMedia>
              <CardContent>
                <Typography variant='h6'>Feature 2</Typography>
                <Typography variant='body2'>
                  View, compare and share your list with your friends
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia>
                <MenuBookIcon
                  color='primary'
                  fontSize='large'
                  className={classes.icons}
                />
              </CardMedia>
              <CardContent>
                <Typography variant='h6'>Feature 3</Typography>
                <Typography variant='body2'>
                  A easy-to-use and complete reference guide
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Typography variant='h5' className={classes.bodyTitle}>
      The birds
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      The full list of birds is taken from the British Ornothologists' Union,
      categories A - C, more commonly known as the British List. You can read
      more about it here{' '}
      <a href='https://www.bou.org.uk/british-list/' target='_blank'>
        https://www.bou.org.uk/british-list/
      </a>
    </Typography>
    <Typography variant='h5' className={classes.bodyTitle}>
      Technical
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      This project is, and will remain open source and free. I want to build it
      out to have all the features necessary and encourage the community.
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      However, it isn't free to build, host and maintain this application, so I
      appreciate anyone contributing to the code and/or making donations. If
      you'd like to dontate to help keep this service running as long as
      possible, please do so below.
    </Typography>
    <div className={classes.buttonWrapper}>
      <Button
        className={classes.donateButton}
        variant='contained'
        color='secondary'
        href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JHNHVKG54GAVC&source=url'
        target='_blank'
      >
        Donate
      </Button>
    </div>
  </Fragment>
);

export default withStyles(styles)(Landing);
