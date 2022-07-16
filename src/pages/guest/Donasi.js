import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material'
import { ButtonWrapper, TextfieldWrapper } from '../../components/molecules';
import * as Yup from 'yup';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
import "../admin/forminput.css"
import InputAdornment from '@mui/material/InputAdornment';

const Donasi = (props) => {
  const [judul, setJudul] = useState()
  const [detail, setDetail] = useState()
  const [nohp, setNohp] = useState()
  const [email, setEmail] = useState()
  const [nama, setNama] = useState()
  const [donasi, setDonasi] = useState(0)
  const [validnama, setValidNama] = useState(true)
  const [validnohp, setValidNoHP] = useState(true)
  const [validdonasi, setValidDonasi] = useState(true)
  const [validemail, setValidEmail] = useState(true)
  const history = useHistory();

  useEffect(() => {
    console.log("tes", props)
    setJudul(props.location.state.nama)
    setDetail(props.location.state.desc)
  }, [])

  const inputs = [
    {
      id: 1,
      name: "nama",
      value: nama,
      type: "text",
      errorMessage:
        "Wajib Diisi !",
      label: "Nama Donatur",
      required: true,
      onChange: (e) => {
        setNama(e.target.value)
        const reg = new RegExp("[a-z]{5,}")
        setValidNama(reg.test(e.target.value))
      },
      error: validnama
    },
    {
      id: 2,
      name: "nohp",
      value: nohp,
      type: "text",
      errorMessage:
        "Wajib Diisi !",
      label: "Nomer Telepon",
      required: true,
      onChange: (e) => {
        setNohp(e.target.value)
        const reg = new RegExp("^[0-9]*$")
        setValidNoHP(reg.test(e.target.value))
      },
      error: validnohp
    },
    {
      id: 3,
      name: "email",
      value: email,
      type: "text",
      errorMessage:
        "Wajib Diisi !",
      label: "Email",
      required: true,
      onChange: (e) => {
        setEmail(e.target.value)
        const reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
        setValidEmail(reg.test(e.target.value))
      },
      error: validemail
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    var id_program = props.location.state.id_program
    console.log("id : ", id_program)
    Axios.post("http://192.168.1.4:8000/midtrans/pay", {
      id_program: id_program,
      nama: nama,
      no_hp: nohp,
      email: email,
      donasi: donasi,
    })
      .then((res) => {
        handlePay(res.data.data)
      })
      .catch((res) => {
        console.log("error : ", res.data)
      })
  }

  function handlePay(data) {
    window.snap.pay(data, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert("payment success!"); console.log(result);
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        const data = JSON.stringify(result)
        Axios.post("http://192.168.1.4:8000/midtrans/post-form", {
          id_program: props.location.state.id_program,
          nama: nama,
          no_hp: nohp,
          email: email,
          donasi: donasi,
          midtrans_response: result
        })
          .then((res) => {
            console.log("respon", res.data)
          })
          .catch((res) => {
          })
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!"); console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert('you closed the popup without finishing the payment');
      }
    })
  }

  function changeNominal(data) {
    setDonasi(data);
  }

  return (
    <div>
      <Grid
        className='mt-5'
        
        direction="column"
        alignItems="center"
        justifyContent="center"
        align="center"
        justify="center">
        <Grid container>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={12}>
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

                <form onSubmit={handleSubmit}>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <TextField type="text" name="donasi"
                      value={donasi} id="outlined-basic" fullWidth label="Nominal Donasi" variant="outlined" InputProps={{
                        startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                      }} onChange={(event) => setDonasi()} />
                  </Typography>

                  <Grid container className='mb-4'>
                    <Grid item className='mx-auto' xs={6} sm={3}>
                      <Button className='m-1' variant="contained" size="medium" color="success" onClick={() => changeNominal(5000)}>
                        Rp. 5.000 ,-
                      </Button>
                    </Grid>
                    <Grid item className='mx-auto' xs={6} sm={3}>
                      <Button className='m-1' variant="contained" size="medium" color="success" onClick={() => changeNominal(10000)}>
                        Rp. 10.000 ,-
                      </Button>
                    </Grid>
                    <Grid item className='mx-auto' xs={6} sm={3}>
                      <Button className='m-1' variant="contained" size="medium" color="success" onClick={() => changeNominal(15000)}>
                        Rp. 15.000 ,-
                      </Button>
                    </Grid>
                    <Grid item className='mx-auto' xs={6} sm={3}>
                      <Button className='m-1' variant="contained" size="medium" color="success" onClick={() => changeNominal(20000)}>
                        Rp. 20.000 ,-
                      </Button>
                    </Grid>

                  </Grid>

                  {inputs.map((item) => (
                    <Grid sx={{ mb: 2 }}>
                      <div className=''>
                        <TextField
                          fullWidth
                          name={item.name}
                          label={item.label}
                          variant="outlined"
                          value={item.value}
                          onChange={item.onChange}
                          required={true}
                          error={!item.error}
                        />
                        {item.error ? <div></div> : <>
                          <Box component="span" className='span' sx={{ display: 'block' }}>{item.errorMessage}</Box></>
                        }
                      </div>
                    </Grid>
                  ))}


                  <Button type="submit" value="submit" className="m-2" fullWidth={false} variant="contained" size="medium" color="success" >
                    Simpan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Donasi