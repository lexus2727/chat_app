import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px',
         
     padding: theme.spacing(3, 2),
     textAlign: 'center'
      
    },
  }));

export default function Dashboard() {
    const classes = useStyles();

    return(
        
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
             Chat App
          </Typography>
          <Typography component="p">
             Topic Placeholder
          </Typography>
       </Paper>
    </div>

        
    )
}