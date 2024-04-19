import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Api from '../config/api';
import { notifySuccess } from '../utilities/toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 3

};

const AddItemModal = ({ open, handleClose }) => {

  const formik = useFormik({
    initialValues: {
      name: "",
      model: "",
      color: "",
      brand: "",
      Price: ""
    },
    onSubmit: handleSubmit
  })

  function handleSubmit(values) {
    Api.post("/items", values)
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      })
    formik.handleReset()
    notifySuccess("Item Added")
    handleClose()
  }


  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "20px" }}>
          Add Item
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <TextField id="outlined-basic" name="name" type='text' label="Name" variant="outlined" value={formik.values.name} onChange={formik.handleChange} />
            <TextField id="outlined-basic" name="model" type='text' label="Model" variant="outlined" value={formik.values.model} onChange={formik.handleChange} />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.brand} 
              onChange={formik.handleChange}
              label="Age"
              name='brand'
            >
              <MenuItem value={"SOVAGE"}>SOVAGE</MenuItem>
              <MenuItem value={"PRAGA"}>PRAGA</MenuItem>
              <MenuItem value={"LIOBARD"}>LIOBARD</MenuItem>
              <MenuItem value={"TOMMY"}>TOMMY</MenuItem>
            </Select>
          </FormControl>
            <TextField id="outlined-basic" name="Price" type='number' label="Price" variant="outlined" value={formik.values.Price} onChange={formik.handleChange} />
            <Stack direction="row" sx={{ padding: "0 10px" }}>
              <label style={{ color: "gray" }}>
                Color :
              </label>
              <input style={{ marginLeft: "10px" }} name="color" id="outlined-basic" type='color' label="Color" variant="outlined" value={formik.values.color} onChange={formik.handleChange} />
            </Stack>
            <Button variant='contained' type="submit">Add Item</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default AddItemModal