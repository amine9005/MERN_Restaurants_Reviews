import * as React from 'react';
import { Button, Grid } from '@mui/material';





const NavTabs = () => {


  return (
    <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        >
            <Grid item xs={3}>
                <Button variant='filled' fullWidth>
                    Home
                </Button>
            </Grid>

            <Grid item xs={3}>
            <Button variant='filled' fullWidth>
                    Home
                </Button>
            </Grid>

            <Grid item xs={3}>
            <Button variant='filled' fullWidth>
                    Home
                </Button>
            </Grid>

    </Grid>
  );
}

export default NavTabs;