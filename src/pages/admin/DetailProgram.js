import { useEffect, React, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
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

const DetailProgram = (props) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [img, setImg] = useState()

    const getImage = async () => {
        const imageUrl = "http://192.168.1.4:8000/program/image/6";

        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    }

    useEffect(() => {
        console.log("id : ", props.location.state)
        Axios.get('http://192.168.1.4:8000/program/' + props.location.state)
            .then(result => {
                setData(result.data.data)
                setLoading(false)
                getImage();

                return result.data.data
            })
            .catch(err => {
                console.log("error : ", err)
            })
    }, [])

    return (
        <div>
            {loading ? <div>loading.......</div> :
                <Card sx={{ minWidth: 275, p:2 }}>
                    <Grid container >
                        <Grid item xs={12}
                            container>
                            <Grid
                                className="mb-4"
                                item xs={6}
                                direction="column"
                                alignItems="flex-start">
                                <h2 className="font-judul pt-4 pb-1 px-2">
                                    Detail Data Program
                                </h2>
                            </Grid>
                        </Grid>
                        <Grid sx={{ p: 2 }} item xs={4}>
                            <CardMedia

                                component="img"
                                image={"http://192.168.1.4:8000/program/image/" + props.location.state}
                                alt="green iguana"
                            />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={6} >
                            <CardContent>
                                <Typography variant="h4" component="div" className='mb-3'>
                                    {data.nama}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" className=''>
                                    Donasi Terkumpul
                                </Typography>
                                <Typography variant="h6" component="div" className='mb-1'>
                                    Rp. { data.current_donasi } / Rp. { data.max_donasi }
                                </Typography>
                                <BorderLinearProgress variant="determinate" className='mb-3' value={( data.current_donasi/data.max_donasi ) * 100 } />
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" className=''>
                                    Deskripsi
                                </Typography>
                                <Typography variant="body2">
                                    {data.desc}
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>

                    <CardActions className='m-3'>
                        <Button variant='contained' onClick={() => history.goBack()}>Go Back</Button>
                    </CardActions>
                </Card>
            }
        </div>
    )
}

export default DetailProgram