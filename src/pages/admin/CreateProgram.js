import { React, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { CardContent, Grid, TextField, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadIcon from '@mui/icons-material/Upload';
import { Box } from '@mui/system';
import Swal from 'sweetalert2'
import "./forminput.css"

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

const CreateProgram = (props) => {
    const [nama, setNama] = useState()
    const [jmlh_donasi, setJmlhdonasi] = useState()
    const [desc, setDesc] = useState()
    const [image, setImage] = useState()
    const [imagename, setImageName] = useState()
    const history = useHistory();
    const [selectedImage, setSelectedImage] = useState();
    const [validnama, setValidNama] = useState(true);
    const [validdesc, setValidDesc] = useState(true);
    const [validjmlh_donasi, setValidJmlhDonasi] = useState(true);
    const count = 0;

    const [values, setValues] = useState({
        nama: "",
        desc: "",
        jmlh_donasi: ""
    });

    const inputs = [
        {
            id: 1,
            name: "nama",
            value: nama,
            type: "text",
            errorMessage:
                "Wajib Diisi !",
            label: "Judul Donasi",
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
            name: "desc",
            value: desc,
            type: "text",
            errorMessage:
                "Wajib Diisi !",
            label: "Deskripsi Donasi",
            required: true,
            onChange: (e) => {
                setDesc(e.target.value)
                const reg = new RegExp("[a-z]{10,}")
                setValidDesc(reg.test(e.target.value))
            },
            error: validdesc
        },
        {
            id: 3,
            name: "jmlh_donasi",
            value: jmlh_donasi,
            type: "text",
            errorMessage:
                "Wajib Diisi dengan Angka !",
            label: "Nominal Donasi",
            required: true,
            onChange: (e) => {
                setJmlhdonasi(e.target.value)
                const reg = new RegExp("^[0-9]*$")
                setValidJmlhDonasi(reg.test(e.target.value))
            },
            error: validjmlh_donasi
        },
    ];

    const dissableSubmit = () => {
        var count = 0
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].error == true) count++
        }
        if (count == inputs.length && image) {
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('nama', nama)
        data.append('jmlh_donasi', jmlh_donasi)
        data.append('desc', desc)
        data.append('img', image)
        Axios.post("http://localhost:8000/program", data, {
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
            .catch((res) => {
                console.log("error : 111", res)
            })
    };

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

    return (
        <div>
            <Card sx={{ p: 2 }}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}
                            container>
                            <Grid
                                className="mb-4"
                                item xs={6}
                                direction="column"
                                alignItems="flex-start">
                                <h2 className="font-judul pt-4 pb-1 px-2">
                                    Tambah Data Program
                                </h2>
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid item xs={4} sx={{ p: 2 }}>
                            {selectedImage && (
                                <div className='mb-2'>
                                    {imagename}
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        style={styles.image}
                                        alt="Thumb"
                                    />
                                    <Button variant='contained' color="error" onClick={removeSelectedImage} className='mb-2 mt-2'>
                                        <DeleteOutlineIcon className='' /> &nbsp; Hapus Gambar
                                    </Button>
                                </div>
                            )}
                            <Button
                                variant="contained"
                                component="label"
                            >
                                < UploadIcon />&nbsp;Upload Gambar
                                <input
                                    onChange={(e) => onImageUpload(e)}
                                    type="file"
                                    hidden
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <form onSubmit={handleSubmit}>
                                {inputs.map((item) => (
                                    <div className='formInput'>
                                        <Grid sx={{ mb: 2 }}>
                                            <TextField
                                                className='textfield'
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
                                        </Grid>
                                    </div>
                                ))}
                                <Button variant="contained" type="submit" value="submit" disabled={dissableSubmit()}>
                                    Submit
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div >
    )
}

export default CreateProgram