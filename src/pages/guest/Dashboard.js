import { Box, Grid } from '@mui/material'
import { useEffect, React, useState } from 'react'
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Modal from '@mui/material/Modal';
import { Modals, Carousels } from '../../components/molecules';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Dashboard = () => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [id_program, setId_program] = useState();
  const [judul, setJudul] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = (datas) => {
    history.push({
      pathname: '/donasi',
      state: datas
    })
    setSelectedItem(datas)
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const history = useHistory();

  useEffect(() => {
    // Axios.get('http://192.168.1.115:8001/program')
    Axios.get('http://192.168.1.4:8000/program')
      .then(result => {
        console.log("data : ", result.data.data)
        setItem(result.data.data);
        setLoading(false)
      })
      .catch(err => {
        console.log('error : ', err)
      })
  }, [])

  return (
    <div>

      <Grid className='mb-5'>
        <Carousels />
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >

        {loading ? <div>loading.......</div> :
          <div>
            <Grid container spacing={2} justify="left">
              {item.map((datas, index) => (

                <Grid item xs={4} sm={4} md={4} sx={{ m: 0 }} >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={"http://192.168.1.4:8000/program/image/" + datas.id_program}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {datas.nama}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container>
                        <Grid className='mx-2 mb-3' xs={12}>
                          <Box className='m-2' sx={{ flexGrow: 1, display: 'flex' }}>
                            <Typography >Rp. {datas.donasi} ,- / Rp. {datas.max_donasi} ,-</Typography>
                          </Box>
                          <BorderLinearProgress variant="determinate" value={datas.donasi / datas.max_donasi * 100} />
                        </Grid>
                        <Grid container className='m-2' xs={12}>
                          <Grid item xs={6}>
                          </Grid>
                          <Grid item xs={6}>
                            <Button variant='contained' color='success' size="small" onClick={() => handleOpen(datas)}>Donasi Sekarang</Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Modals
              data={selectedItem}
              open={open}
              handleClose={() => setOpen(false)}
            />
          </div>
        }
      </Grid>
    </div>
  )
}

export default Dashboard