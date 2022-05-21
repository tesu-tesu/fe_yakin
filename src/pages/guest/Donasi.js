import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { ButtonWrapper, TextfieldWrapper } from '../../components/molecules';
import * as Yup from 'yup';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { margin } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';

const Donasi = (props) => {
  const [judul, setJudul] = useState()
  const [detail, setDetail] = useState()
  const [nohp, setNohp] = useState()
  const [email, setEmail] = useState()
  const [donasi, setDonasi] = useState(0)
  const history = useHistory();

  useEffect(() => {
    setJudul(props.location.state.nama)
    setDetail(props.location.state.desc)
  })

  const SubmitSchema = Yup.object().shape(
    {
      nama: Yup.string()
        .required('Harus Diisi !'),
      nohp: Yup.string()
        .required('Harus Diisi !'),
      email: Yup.string()
        .required('Harus Diisi !'),
    }
  )

  function handlePay(data) {
    console.log("data : ", data)
    window.snap.pay(data, {
      onSuccess: function(result){
        /* You may add your own implementation here */
        alert("payment success!"); console.log(result);
      },
      onPending: function(result){
        /* You may add your own implementation here */
        alert("wating your payment!"); console.log(result);
      },
      onError: function(result){
        /* You may add your own implementation here */
        alert("payment failed!"); console.log(result);
      },
      onClose: function(){
        /* You may add your own implementation here */
        alert('you closed the popup without finishing the payment');
      }
    })
  }

  function changeNominal(data) {
    setDonasi(data);
    console.log("donasi : ", data)
  }

  return (
    <div>
      <Grid
        className='mt-5'
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        align="center"
        justify="center">

        <Formik
          initialValues={{
            nama: '',
            nohp: '',
            email: '',
          }}
          validationSchema={SubmitSchema}
          onSubmit={values => {
            console.log("helo", donasi)
            Axios.post("http://localhost:8000/midtrans/pay", {
              nama: values.nama,
              no_hp: values.nohp,
              email: values.email,
              donasi: donasi,
            })
              .then((res) => {
                console.log(res.data.data)
                handlePay(res.data.data)
              })
              .catch((res) => {
              })
          }}
        >
          <Grid container>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
              <Form>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography fullWidth sx={{ fontSize: 'h4.fontSize', fontWeight: 'bold' }} color="text.primary" gutterBottom>
                      {judul}
                    </Typography>
                    <Typography fullWidth color="text.primary" gutterBottom>
                      {detail}
                    </Typography>
                    <hr />
                    <Typography variant="body2">
                      <Grid container spacing={2} className="p-4">
                        <Grid sx={{ width: '100%' }} className="px-2">
                          <TextfieldWrapper type="text" name="donasi"
                            value={donasi} id="outlined-basic" fullWidth label="Nominal Donasi" variant="outlined" InputProps={{
                              startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                            }} onChange={(event) => setDonasi()} />
                        </Grid>
                      </Grid>
                    </Typography>

                    <Grid container className='mx-4 mb-4'>
                      <Grid item className='mx-2' xs={2}>
                        <Button fullWidth variant="contained" size="medium" color="success" onClick={() => changeNominal(5000)}>
                          Rp. 5.000 ,-
                        </Button>
                      </Grid>
                      <Grid item className='mx-2' xs={2}>
                        <Button fullWidth variant="contained" size="medium" color="success" onClick={() => changeNominal(10000)}>
                          Rp. 10.000 ,-
                        </Button>
                      </Grid>
                      <Grid item className='mx-2' xs={2}>
                        <Button fullWidth variant="contained" size="medium" color="success" onClick={() => changeNominal(15000)}>
                          Rp. 15.000 ,-
                        </Button>
                      </Grid>
                      <Grid item className='mx-2' xs={2}>
                        <Button fullWidth variant="contained" size="medium" color="success" onClick={() => changeNominal(20000)}>
                          Rp. 20.000 ,-
                        </Button>
                      </Grid>

                    </Grid>


                    <Typography variant="body2">
                      <Grid container spacing={2} className="p-4">
                        <Grid sx={{ width: '100%' }} className="px-2">
                          <TextfieldWrapper type="text" name="nama" id="standard-basic" label="Nama" variant="Standard" />
                        </Grid>
                      </Grid>
                    </Typography>
                    <Typography variant="body2">
                      <Grid container spacing={2} className="p-4">
                        <Grid sx={{ width: '100%' }} className="px-2">
                          <TextfieldWrapper type="text" name="nohp" id="outlined-basic" fullWidth label="Nomer Telepon" variant="outlined" />
                        </Grid>
                      </Grid>
                    </Typography>
                    <Typography variant="body2">
                      <Grid container spacing={2} className="p-4">
                        <Grid sx={{ width: '100%' }} className="px-2">
                          <TextfieldWrapper type="text" name="email" id="outlined-basic" fullWidth label="Email" variant="outlined" />
                        </Grid>
                      </Grid>
                    </Typography>

                    <ButtonWrapper className="m-2" fullWidth={false} variant="contained" size="medium" color="success" >
                      Simpan
                    </ButtonWrapper>
                  </CardContent>
                </Card>
              </Form>
            </Grid>
            <Grid item xs={2}>
            </Grid>

          </Grid>
        </Formik>
      </Grid>
    </div>
  )
}

export default Donasi