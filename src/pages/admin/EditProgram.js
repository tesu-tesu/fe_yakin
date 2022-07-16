import { useEffect, React, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import UploadIcon from '@mui/icons-material/Upload';
import Swal from 'sweetalert2'

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    preview: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
        cursor: "pointer",
        padding: 15,
        background: "red",
        color: "white",
        border: "none",
    },
};


const EditProgram = (props) => {
    const [loading, setLoading] = useState(true);
    const [nama, setNama] = useState()
    const [desc, setDesc] = useState()
    const [jmlh_donasi, setJmlhDonasi] = useState()
    const [image, setImage] = useState()
    const [imagename, setImageName] = useState()
    const [selectedImage, setSelectedImage] = useState();
    const [validnama, setValidNama] = useState(true);
    const [validdesc, setValidDesc] = useState(true);
    const [img, setImg] = useState()
    const history = useHistory();

    const getImage = () => {
        console.log("helo")
        const imageUrl = "http://localhost:8000/program/image/1";

        const res = fetch(imageUrl);
        const imageBlob = res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    }

    const validationnama = (data) => {
        setNama(data)
        const reg = new RegExp("[a-z]{5,}")
        setValidNama(reg.test(nama))
    }

    const dissableSubmit = () => {
        if (nama && validdesc) {
            console.log("helow", nama)
            return false
        } else {
            return true
        }
    }

    const validationdesc = (data) => {
        setDesc(data)
        const reg = new RegExp("[0-9a-zA-Z]{10,}")
        setValidDesc(reg.test(desc))
    }

    const onImageUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setImageName(file.name)
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("helo : ", nama)

        const data = new FormData();
        data.append('nama', nama)
        data.append('jmlh_donasi', jmlh_donasi)
        data.append('desc', desc)
        data.append('img', image)
        data.append('_method', 'PATCH')
        Axios.post("http://localhost:8000/program/" + props.location.state, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((res) => {
                Swal.fire(
                    'Berhasil',
                    'Data Berhasil Tersimpan',
                    'success'
                )
                history.push("/all_program");
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }

    useEffect(() => {
        console.log("id : ", props)
        Axios.get('http://192.168.1.4:8000/program/' + props.location.state)
            .then(result => {
                console.log("result : ", result.data.data)
                setNama(result.data.data.nama)
                setDesc(result.data.data.desc)
                setImage(result.data.data.img_asset)
                setJmlhDonasi(result.data.data.jmlh_donasi)
                setLoading(false)


                return result.data.data
            })
            .catch(err => {
                console.log("error : ", err)
            })
    }, [])

    return (
        <div>
            <Card sx={{ p: 2 }}>
                {loading ? <div>loading.......</div> :
                    <Grid container>
                        <Grid item xs={12}
                            container>
                            <Grid
                                className="mb-4"
                                item xs={6}
                                direction="column"
                                alignItems="flex-start">
                                <h2 className="font-judul pt-4 pb-1 px-2">
                                    Edit Data Program
                                </h2>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} sx={{ p: 2 }}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                Gambar Lama :
                            </Typography>
                            <CardMedia
                                component="img"
                                image={"http://192.168.1.4:8000/program/image/" + props.location.state}
                                alt="green iguana"
                            />
                            {selectedImage && (
                                <div>
                                    <hr />
                                    <Typography variant="h6" color="text.primary" gutterBottom>
                                        Gambar Baru :<br />
                                        {imagename}
                                    </Typography>
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        style={styles.image}
                                        alt="Thumb"
                                    />
                                </div>
                            )}
                            <Button
                                variant="contained"
                                component="label"
                                className='mt-4'
                            >
                                < UploadIcon />&nbsp;Ganti Gambar
                                <input
                                    onChange={(e) => onImageUpload(e)}
                                    type="file"
                                    hidden
                                />
                            </Button>
                        </Grid>
                        <Grid sx={{ mt: 2 }} item xs={8}>
                            <form onSubmit={handleSubmit}>
                                <Grid sx={{ mb: 2, mr: 2 }}>
                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        name={nama}
                                        label="Nama"
                                        value={nama}
                                        variant="outlined"
                                        onChange={e => validationnama(e.target.value)}
                                        required={true}
                                        error={!validnama}
                                    />
                                    {validnama ? <div></div> : <>
                                        <Box component="span" className='span' sx={{ display: 'block' }}>Masukkan minimal 5 karakter !</Box></>
                                    }
                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        name={desc}
                                        label="Deskripsi"
                                        value={desc}
                                        variant="outlined"
                                        onChange={e => validationdesc(e.target.value)}
                                        required={true}
                                        error={!validdesc}
                                    />
                                    {validdesc ? <div></div> : <>
                                        <Box component="span" className='span' sx={{ display: 'block' }}>Masukkan minimal 10 karakter !</Box></>
                                    }
                                </Grid>
                                <Button variant="contained" type="submit" value="submit" dissabled={dissableSubmit()}>
                                    Simpan
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                }
            </Card>
        </div >
    )
}

export default EditProgram