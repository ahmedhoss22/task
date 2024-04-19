import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box
} from '@mui/material';
import { notifyError, notifySuccess } from '../utilities/toastify';
import Api from '../config/api';
import AddItemModal from '../components/AddItemModal';

const TableComponent = () => {
  const [data, setData] = useState(new Map());
  const [updatedItems, setUpdatedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [focused, setFocusedInput] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const inputRefs = useRef([]);

  const fetchItems = useCallback(async (page) => {
    setLoading(true);
    try {
      let items = await Api.get("/items/" + page);
      if (items.data.items.length) {
        setData(data => new Map(data.set(page, items.data.items)));
      }
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (data.get(page) && data.get(page + 1)) return
      await Promise.all([fetchItems(page), fetchItems(page + 1)]);
    };
    fetchData();
  }, [page, fetchItems]);

  const handleIncrement = () => {
    setPage(page => page + 1);
  };

  const handleDecrement = () => {
    setPage(page => (page > 1 ? page - 1 : page));
  };

  const handleChange = useCallback((item, value, key, index) => {
    setFocusedInput(focused => new Map(focused.set(page, { [key]: true, index })));
    const updatedItem = { ...item, [key]: value };

    setData(data => {
      const newData = new Map(data);
      const currentPageData = newData.get(page);
      currentPageData[index] = updatedItem;
      newData.set(page, currentPageData);
      return newData;
    });
    const existItem = updatedItems.find(ele => ele.id === item.id);
    if (existItem) {
      setUpdatedItems(updatedItems => updatedItems.map(ele => (ele.id === item.id ? updatedItem : ele)));
    } else {
      setUpdatedItems(updatedItems => [...updatedItems, updatedItem]);
    }
  }, [page, updatedItems]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [data]);

  function handleFocusedInput(index, key) {
    let focustedInput = focused.get(page)
    return focustedInput?.index == index && focustedInput[key]
  }

  async function updateDate() {
    try {
      await Api.put("/items", updatedItems)
      notifySuccess("Data updated !!")
      setUpdatedItems([])
    } catch (error) {
      notifyError(error)
    }
  }

  return (
    <Container sx={{ marginTop: "4rem" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ margin: "1rem 0" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: { xs: "1rem", sm: "1.4rem" }, fontWeight: "700" }}>
          Items Table
        </Typography>
        <Button sx={{ fontSize: { xs: ".8rem", sm: "1.4rem" } }} variant='contained' color='primary' onClick={() => setOpen(true)}>add new Item</Button>
      </Stack>
      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : (<Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align='center'>-</TableCell>
              {data?.get(page)?.map((row, index) => (
                <TableCell key={row.name} align='center' sx={{ padding: { xs: "10px 0px" } }}>
                <TextField InputProps={{
                  style: {  fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' }  } // Adjust font size as needed
                }} type='text' autoFocus={handleFocusedInput(index, "name")} onChange={(e) => handleChange(row, e.target.value, "name", index)} defaultValue={row?.name} /></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: { sm: "1.1rem", xs: ".8rem" },padding:{xs:"0"},minWidth:{xs:"50px"},fontWeight: 700 }} >Model : </TableCell>
              {data?.get(page)?.map((row, index) => (
                <TableCell key={row.name} align="center" sx={{ padding: { xs: "10px 0px" }}}><TextField sx={{ padding: { sm: "10px 5px", xs: "0" } }} type='text' autoFocus={handleFocusedInput(index, "model")} onChange={(e) => handleChange(row, e.target.value, "model", index)} defaultValue={row?.model} /></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: { sm: "1.1rem", xs: ".8rem" },padding:{xs:"0"},minWidth:{xs:"50px"}, fontWeight: 700 }} >Color : </TableCell>
              {data?.get(page)?.map((row, index) => (
                <TableCell key={row.name} align="center" sx={{ padding: { xs: "10px 0px" }}}><input type='color' style={{ padding: "0" }} autoFocus={handleFocusedInput(index, "color")} onChange={(e) => handleChange(row, e.target.value, "color", index)} defaultValue={row?.color} /></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: { sm: "1.1rem", xs: ".8rem" },padding:{xs:"0"},minWidth:{xs:"50px"}, fontWeight: 700 }}>Brand : </TableCell>
              {data?.get(page)?.map((row, index) => (
                <TableCell key={row.name} align="center" sx={{ padding: { xs: "10px 0px" }}}><TextField sx={{ padding: { sm: "10px 5px", xs: "0" } }} type='text' autoFocus={handleFocusedInput(index, "brand")} onChange={(e) => handleChange(row, e.target.value, "brand", index)} defaultValue={row?.brand} /></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: { sm: "1.1rem", xs: ".8rem" },padding:{xs:"0"},minWidth:{xs:"50px"}, fontWeight: 700 }}>Price : </TableCell>
              {data?.get(page)?.map((row, index) => (
                <TableCell key={row.name} align="center" sx={{ padding: { xs: "10px 0px" }}}><TextField sx={{ padding: { sm: "10px 5px", xs: "0" } }} type='number' autoFocus={handleFocusedInput(index, "Price")} onChange={(e) => handleChange(row, e.target.value, "Price", index)} defaultValue={row?.Price} /></TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>)}
      </TableContainer>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: "1rem" }}>
        <Button variant='outlined' onClick={handleDecrement} disabled={page === 1} color='primary'>Previous</Button>
        <Button variant='outlined' onClick={handleIncrement} disabled={(!data.get(page + 1) && page !== 1) || loading} color='primary'>Next</Button>
      </Stack>
      <Button variant='contained' sx={{ marginTop: "1rem", border: "2px solid #111" }} onClick={updateDate} disabled={!updatedItems.length} fullWidth>save changes</Button>
      <AddItemModal open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
};

export default TableComponent;
