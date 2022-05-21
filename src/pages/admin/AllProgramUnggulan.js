import { useEffect, React, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Grid } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Swal from 'sweetalert2';

const AllProgramUnggulan = () => {
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);
    const arrayTemp = []
    var temp = {}
    const history = useHistory();
    const [nama, setNama] = useState()
    const [jmlh_donasi, setJmlhdonasi] = useState()
    const [desc, setDesc] = useState()

    const handleDeleteClick = (id) => (event) => {
        Axios.delete("http://localhost:8000/program/" + id)
            .then(
                Swal.fire(
                    'The Internet?',
                    'That thing is still around?',
                    'question'
                )
            )
            .catch(err => {
                console.log('error : ', err)
            })
    };

    const handleEditClick = (data) => (event) => {

        history.push({
            pathname: '/edit_program',
            state: data
        })
    };

    const handleDetailClick = (data) => (event) => {

        history.push({
            pathname: '/detail_program_unggulan',
            state: data
        })
    };

    const columns = [
        { field: 'id_program', headerName: '#', width: 70 },
        { field: 'nama', headerName: 'Nama', width: 250 },
        {
            field: 'jmlh_donasi',
            headerName: 'Progres',
            flex: 1,
            width: 200
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 2,
            width: 400,
            getActions: ({ id }) => {

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        // className={classes.textPrimary}
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                    <Button
                        onClick={handleDetailClick(id)}
                        variant="contained">
                        Detail
                    </Button>
                ];
            },
        }
    ];

    useEffect(() => {
        Axios.get('http://localhost:8000/program')
            .then(result => {
                result.data.data.map((item, index = 0) => (
                    temp = {
                        "id": index + 1,
                        "nama": item.nama,
                        "jmlh_donasi": item.jmlh_donasi
                    },
                    arrayTemp.push(temp)
                ))
                setItem(arrayTemp)
                setLoading(false)
            })
            .catch(err => {
                console.log('error : ', err)
            })
    }, [])

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid item xs={12}
                        container>
                        <Grid
                            className="mb-4"
                            item xs={6}
                            direction="column"
                            alignItems="flex-start">
                            <h2 className="font-judul pt-4 pb-1 px-2">
                                All Programs Unggulan
                            </h2>
                        </Grid>

                        <Grid
                            className="mt-4"
                            item xs={6}
                            container
                            direction="column"
                            alignItems="flex-end">
                            <Button className="m-2 p-3" variant="contained" size="medium" color="success" onClick={() => history.push('/create_program_unggulan')}>
                                <Typography sx={{ fontWeight: 'bold' }}>+ Tambah Data</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <hr />

                    {loading ? <div>loading.......</div> :

                        <div style={{ height: 400, width: '100%', padding: "20px" }}>
                            <DataGrid
                                rows={item}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default AllProgramUnggulan