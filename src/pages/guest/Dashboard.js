import { Box, Grid } from '@mui/material'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <Grid>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 100,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />

      </Grid>

      <Grid
        className='mt-4'
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >

      </Grid>
      Dashboard</div>
  )
}

export default Dashboard