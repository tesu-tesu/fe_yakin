import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { TextfieldWrapper, ButtonWrapper } from '../molecules';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 4,
};

export const Modals = ({ data, open, handleClose }) => {
  console.log("selected", data)

  return (
    <div>
      {!data ? <div> .... </div> :
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data.judul}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>

      }
    </div>
  )
}
