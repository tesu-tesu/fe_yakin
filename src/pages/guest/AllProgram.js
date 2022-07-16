import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

const AllProgram = () => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [id_program, setId_program] = useState();
  const [judul, setJudul] = useState(0);

  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleOpen = (datas) => {
    history.push({
      pathname: "/donasi",
      state: datas,
    });
    setSelectedItem(datas);
    setOpen(true);
  };

  useEffect(() => {
    console.log("halo");
    // Axios.get('http://192.168.1.115:8001/program')
    // Axios.get('http://localhost:3000/employees')
    Axios.get("http://192.168.1.71:8000/program")
      .then((result) => {
        console.log("data : ", result.data.data);
        setItem(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, []);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <div>
      <Grid
      >
        {loading ? (
          <div>loading.......</div>
        ) : (
          <div>
            <Grid className={ 'mt-5' } container spacing={2} justify="left">
              {item.map((datas, index) => (
                <Grid item xs={12} sm={3}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      // image={"http://192.168.1.4:8000/program/image/" + datas.id_program}
                      image={
                        "https://www.stikom-bali.ac.id/en/wp-content/uploads/2018/08/shutterstock_689717260.jpg"
                      }
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {datas.nama}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container>
                        <Grid className="mx-2 mb-3" xs={12}>
                          <Box
                            className="m-2"
                            sx={{ flexGrow: 1, display: "flex" }}
                          >
                            <Typography>
                              Rp. {datas.current_donasi} ,- / Rp.{" "}
                              {datas.max_donasi} ,-
                            </Typography>
                          </Box>
                          <BorderLinearProgress
                            variant="determinate"
                            value={
                              (datas.current_donasi / datas.max_donasi) * 100
                            }
                          />
                        </Grid>
                        <Grid container className="m-2" xs={12}>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleOpen(datas)}
                            >
                              Donasi Sekarang
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default AllProgram;
