import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

export default function PriceAdminPage() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [productValue, setProductValue] = useState('');
  const [pincodeValue, setPincodeValue] = useState('');
  const [multiSelectAreas, setMultiSelectAreas] = useState([]);
  const [multiSelectVehicles, setMultiSelectVehicles] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleProductChange = (event) => {
    setProductValue(event.target.value);
  };
  const handlePincodeChange = (event) => {
    setPincodeValue(event.target.value);
  };

  const handleAreaChange = (event, values) => {
    setMultiSelectAreas(values);
  };
  const handleVehicleChange = (event, values) => {
    setMultiSelectVehicles(values);
  };

  const handleFormSubmit = () => {
    // Perform your form submission logic here
    // console.log('Submitted:', inputValue, dropdownValue);
    handleClose();
  };

  // for product table show
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <div>
      <Stack p={4}>
      <Button variant="contained" onClick={handleClickOpen} color='warning'>
        Update Price
      </Button>
      </Stack>
      
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the required information.</DialogContentText>
          <TextField
            select
            margin="dense"
            label="Select Product"
            fullWidth
            value={productValue}
            onChange={handleProductChange}
          >
            <MenuItem value="fine">fine</MenuItem>
            <MenuItem value="filling">filling</MenuItem>
          </TextField>
          <TextField
            select
            margin="dense"
            label="Select City"
            fullWidth
            value={pincodeValue}
            onChange={handlePincodeChange}
            style={{ marginBottom: '16px' }}
          >
            <MenuItem value="751001">Bhubaneswar</MenuItem>
            <MenuItem value="751002">Cuttack</MenuItem>
          </TextField>
          <TextField
            select
            margin="dense"
            label="Select Pincode"
            fullWidth
            value={pincodeValue}
            onChange={handlePincodeChange}
            style={{ marginBottom: '16px' }}
          >
            <MenuItem value="751001">751001</MenuItem>
            <MenuItem value="751002">751002</MenuItem>
          </TextField>
          <Autocomplete
            multiple
            id="multi-select"
            options={['Saheed Nagar', 'Patia', 'Nayapalli']}
            value={multiSelectAreas}
            onChange={handleAreaChange}
            renderInput={(params) => <TextField {...params} label="Select Areas" />}
            style={{ marginBottom: '16px' }}
          />
          <Autocomplete
            multiple
            id="multi-select"
            options={['Excavator', 'Crane', 'Bulldozer']}
            value={multiSelectVehicles}
            onChange={handleVehicleChange}
            renderInput={(params) => <TextField {...params} label="Select Vehicles" />}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Input Field"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='warning'>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color='warning'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* table for product  */}
      <>
      <Helmet>
        <title> Dashboard: Products | Arl-Tech </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
    </div>
  );
}
