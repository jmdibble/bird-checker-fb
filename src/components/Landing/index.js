import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Splash from '../../images/splash3.jpg';
import * as ROUTES from '../../constants/routes';

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
    backgroundImage: `url(${Splash})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    height: '700px',
    textAlign: 'center',
    margin: '0px 0px 70px 0px'
  },
  heroText: {
    textAlign: 'center',
    color: '#edf5e1',
    padding: '60px 0px 50px 0px'
  },
  subtitle: {
    margin: '30px auto auto auto'
  },
  bodyText: {
    textAlign: 'center',
    margin: '10px auto 50px auto',
    maxWidth: '700px'
  },
  button: {
    margin: '5px'
  },
  gridContainer: {
    margin: 'auto',
    justifyContent: 'center',
    maxWidth: '80%'
  },
  card: {
    minWidth: 100,
    minHeight: 140,
    maxWidth: 200,
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

const Landing = ({ classes }) => (
  <Fragment>
    <div className={classes.heroImage}>
      <div className={classes.heroText}>
        <Typography variant='h3'>Britain's #1</Typography>
        <Typography variant='h3'>Digital Bird Book</Typography>
        <Typography variant='subtitle1' className={classes.subtitle}>
          Birdbook is the only digital solution to keep track of the birds
          you've seen.
        </Typography>
      </div>
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
    <Typography variant='h5' className={classes.bodyText}>
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
                  A easy-to-use and complete reference guide{' '}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    );
    <Typography variant='h5' className={classes.bodyText}>
      Technical
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      The full list of birds is taken from the British Ornothologists' Union,
      categories A - C, more commonly known as the British List. You can read
      more about it here{' '}
      <a href='https://www.bou.org.uk/british-list/'>
        https://www.bou.org.uk/british-list/
      </a>
    </Typography>
    <Typography variant='body1' className={classes.bodyText}>
      This project is, and will remain open source and free. I want to build it
      out to have all the features necessary and encourage the community.
    </Typography>
  </Fragment>
);

export default withStyles(styles)(Landing);
