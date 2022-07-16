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

const AdminAllProgram = () => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const arrayTemp = []
  var temp = {}
  const history = useHistory();
  const [nama, setNama] = useState()
  const [jmlh_donasi, setJmlhdonasi] = useState()
  const [desc, setDesc] = useState()

  const handleDeleteClick = (id) => (event) => {
    console.log("delete : ", id)
    Axios.delete("http://192.168.1.4:8000/program/" + id)
      .then(
        setLoading(true),
        getData()
      )
      .catch(err => {
        console.log('error : ', err)
      })
  };

  const handleEditClick = (data) => (event) => {
    console.log("id all :", data)
    history.push({
      pathname: '/edit_program',
      state: data
    })
  };

  const handleDetailClick = (data) => (event) => {

    history.push({
      pathname: '/detail_program',
      state: data
    })
  };

  const columns = [
    { field: 'id_index', headerName: '#', width: 70 },
    { field: 'nama', headerName: <Typography sx={{ fontWeight: 'bold' }}>Nama</Typography>, width: 250 },
    {
      field: 'progres',
      headerName: <Typography sx={{ fontWeight: 'bold' }}>Progres</Typography>,
      flex: 1,
      width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: <Typography sx={{ fontWeight: 'bold' }}>Actions</Typography>,
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

  const getData = () => (
    console.log("loop - "),
    // Axios.get('http://192.168.1.115:8001/program')
    Axios.get('http://192.168.1.4:8000/program')
      .then(result => {
        result.data.data.map((item, index = 0) => (
          temp = {
            "id_index": index + 1,
            "id": item.id_program,
            "nama": item.nama,
            "progres": (item.current_donasi / item.max_donasi) * 100 + " % ( " + item.current_donasi + " / " + item.max_donasi + " )"
          },
          arrayTemp.push(temp)
        ))
        setItem(arrayTemp)
        setLoading(false)
      })
      .catch(err => {
        console.log('error : ', err)
      })
  )

  console.log("data : ", item)
  useEffect(() => {
    getData()
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
                All Programs
              </h2>
            </Grid>

            <Grid
              className="mt-4"
              item xs={6}
              container
              direction="column"
              alignItems="flex-end">
              <Button className="m-2 p-3" variant="contained" size="medium" color="success" onClick={() => history.push('/create_program')}>
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

export default AdminAllProgram