import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Card,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Select, MenuItem,
  FormControl, InputLabel,
  ListItemText,
  Box,
  Input
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import {api} from "../Api/Api";

export default function ProductAdminPage(props) {
  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [organizationNameLabel, setOrganizationNameLabel] = useState("");
  const [chargesLabelName, setChargesLabelName] = useState("");
  const [chargesApplicable, setChargesApplicable] = useState(true);
  const [isExtraName, setIsExtraName] = useState(true);
  const [productExtraNameLabel, setProductExtraNameLabel] = useState("");
  const [status, setStatus] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState(null);


  const handleProductAddition = () => {
    console.log("adding....");

  
    let productData = new FormData();
  
    // Append the file to the FormData
    productData.append('image', selectedImage);
  
    // Append other form fields
    productData.append('name', productName);
    productData.append('slug', productName.toLowerCase());
    productData.append('details', details);
    productData.append('orginization_name_lable', organizationNameLabel);
    productData.append('charges_lable_name', chargesLabelName);
    productData.append('charge_applicable', chargesApplicable);
    productData.append('product_extra_name_lable', productExtraNameLabel);
    productData.append('is_extra_name', isExtraName);
    productData.append('status', status);
  
    console.log(productData);
    api
      .post("api/product/products/", productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log("Product added successfully", response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };


  const [apiData, setApiData] = useState([]);

    useEffect(() => {
      const apiUrl = 'api/product/products/';
    
      api.get(apiUrl)
        .then((response) => {
          // Handle the response data here
          setApiData(response.data); // Use setApiData to update the state
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
    }, []);


  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSlugChange = (event) => {
    setSlug(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  // const handleImageChange = (event) => {
  //   setImageFile(event.target.files[0]);
  // };

  const handleFormSubmit = () => {
    // Perform your form submission logic here
    console.log('Submitted:', {
      productName,
      slug,
      description,
      status,
      imageFile
    });
  };



  function Basic({props,onChange}) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    const dropzoneStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out'
    };

    const dropzoneClassName = 'dropzone';


    return (
      <section className="container">
        <div {...getRootProps({ style: dropzoneStyle, className: dropzoneClassName })}>
          <input type="file" onChange={onChange}  {...getInputProps()}/>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Uploaded Images :</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    );
  }

  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  console.log("new",selectedProduct)
  // for adding parameters 
  const [parameters, setParameters] = useState([]);
  const [newParameter, setNewParameter] = useState('');
  const [parentList, setParentList] = useState([]);
  const [selectedParentList, setSelectedParentList] = useState('');
  const [editing, setEditing] = useState(false);
  const [selectedParent, setSelectedParent] = useState('');


  useEffect(() => {
    // Fetch the list of products from the server
    api.get('api/product/products/').then((response) => {
      setProductList(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      // Fetch the parent data based on the selected product's ID
      api.get(`api/product/api/children/${selectedProduct}/`).then((response) => {
        console.log("data is on",response)
        console.log("data is in",response.data)

        setParentList(response.data);
      });
    }
  }, [selectedProduct]);

  const [childData, setChildData] = useState({
    subname: '',
    name: '',
    image: null,
    slug: '',
    status: true,
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
  
    if (name === 'image') {
      setChildData({
        ...childData,
        [name]: files[0],
      });
    } else if (name === 'name') {
      // Update both 'name' and 'slug' fields
      const lowercaseValue = value.toLowerCase();
      setChildData({
        ...childData,
        [name]: value,
        slug: lowercaseValue,
      });
    } else {
      setChildData({
        ...childData,
        [name]: value,
      });
    }
  };


  const handleChildSubmit = () => {
    const formData = new FormData();

    formData.append('subname', childData.subname);
    formData.append('name', childData.name);
    formData.append('slug', childData.slug);
    formData.append('status', childData.status);

    if (childData.image) {
      formData.append('image', childData.image);
    }

    console.log("formdata",formData)
    api
      .post(`api/product/api/child/create/${selectedProduct}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle success, e.g., clear form fields or display a success message
        console.log('Child item created successfully:', response.data);
        // You can add further actions or state updates here as needed.
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error creating child item:', error);
        // You can add error handling and messages here as needed.
      });
  };


  const handleProductSelect = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleParentSelect = (event) => {
    setSelectedParentList(event.target.value);
    setSelectedChild(null); // Reset selected child when a new parent is selected.
  };

  const handleChildSelect = (event) => {
    setSelectedChild(event.target.value);
  };

  

  const handleAddParameter = () => {
    if (newParameter) {
      setParameters([...parameters, newParameter]);
      setNewParameter('');
      setEditing(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Perform save logic
    setEditing(false);
  };

  // for adding price section

  const [showPriceSection, setShowPriceSection] = useState(false);

  const handleTogglePriceSection = () => {
    setShowPriceSection(true);
  };

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (event) => {
    setSelectedSizes(event.target.value);
  };

  const AddPriceSection = () => {
    // Define your state and event handlers here
    const [price, setPrice] = useState('');
    const [selectedPincodes, setSelectedPincodes] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);

    const handleSaveprice = () => {
      // Perform save logic
    };

    const handleCancel = () => {
      setShowPriceSection(false);
    };

   

    const handlePincodeChange = (event) => {
      setSelectedPincodes(event.target.value);
    };

    const handleCityChange = (event) => {
      setSelectedCities(event.target.value);
    };

    const handleVehicleChange = (event) => {
      setSelectedVehicles(event.target.value);
    };

    const handleAreaChange = (event) => {
      setSelectedAreas(event.target.value);
    };

    const vehicles = ['Hyva', 'Tipper', 'Auto'];
    const pincodes = ['751001', '751002', '751003', '751004'];
    const city = ['Bhubaneswar', 'Puri', 'Cuttack', 'Bhadrak'];
    const areas = ['Nayapali', 'Saheed Nagar', 'Baramunda', 'Khandagiri'];
    const [vehicleCapacities, setVehicleCapacities] = useState({});

    const handleCapacityChange = (vehicle, capacity) => {
      // Your implementation here
    };

    return (
      <>

<Stack mt={4}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Available City</InputLabel>
        <Select
          multiple
          label="Available City"
          value={selectedCities}
          onChange={handleCityChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {city.map((city) => (
            <MenuItem key={city} value={city}>
              <Checkbox checked={selectedCities.indexOf(city) > -1} />
              <ListItemText primary={city} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>

        <Stack mt={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Available Pincodes</InputLabel>
            <Select
              multiple
              label="Available Pincodes"
              value={selectedPincodes}
              onChange={handlePincodeChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {pincodes.map((pincode) => (
                <MenuItem key={pincode} value={pincode}>
                  <Checkbox checked={selectedPincodes.indexOf(pincode) > -1} />
                  <ListItemText primary={pincode} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack mt={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Available Areas</InputLabel>
            <Select
              multiple
              label="Available Areas"
              value={selectedAreas}
              onChange={handleAreaChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {areas.map((area) => (
                <MenuItem key={area} value={area}>
                  <Checkbox checked={selectedAreas.indexOf(area) > -1} />
                  <ListItemText primary={area} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack mt={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Available Vehicles</InputLabel>
            <Select
              multiple
              label="Available Vehicles"
              value={selectedVehicles}
              onChange={handleVehicleChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle} value={vehicle}>
                  <Checkbox checked={selectedVehicles.indexOf(vehicle) > -1} />
                  <ListItemText primary={vehicle} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedVehicles.map((vehicle) => (
            <Stack mt={4}>
              <FormControl key={vehicle} fullWidth variant="outlined" mt={2}>
                <InputLabel>{`${vehicle} Capacity`}</InputLabel>
                <Input
                  type="number"
                  value={vehicleCapacities[vehicle] || ''}
                  onChange={(e) => handleCapacityChange(vehicle, e.target.value)}
                />
              </FormControl>
            </Stack>
          ))}
        </Stack>
        

        <Stack mt={4}>
          <TextField
            label="Price For Normal Customer"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Stack>
        <Stack mt={4}>
          <TextField
            label="Price For Silver Customer"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Stack>
        <Stack mt={4}>
          <TextField
            label="Price For Gold Customer"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Stack>
        <Stack mt={4}>
          <TextField
            label="Price For Diamond Customer"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} mt={2} justifyContent={'flex-end'}>
          <Button variant="contained" color="warning" onClick={handleSaveprice}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>

      </>
    );
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Create New Product For Arl-Tech
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ width: '100%' }}>
        <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
          Details :
        </Typography>

        <Card sx={{ width: '75%' }}>
          <Stack spacing={3} p={4}>
            <TextField
              label="Product Name"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

<InputLabel>Product-Image Upload</InputLabel>
      <Input type="file" onChange={handleImageChange} />
           
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
             <TextField
              label="organizationNameLabel"
              fullWidth
              value={organizationNameLabel}
              onChange={(e) => setOrganizationNameLabel(e.target.value)}
            />
            <FormControlLabel
        control={
          <Checkbox
            checked={chargesApplicable}
            onChange={(e) => setChargesApplicable(e.target.checked)}
            color="primary"
          />
        }
        label="Charges Applicable"
      />
      {chargesApplicable && (
        <TextField
          label="Charges Label Name"
          variant="outlined"
          fullWidth
          value={chargesLabelName}
          onChange={(e) => setChargesLabelName(e.target.value)}
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={isExtraName}
            onChange={(e) => setIsExtraName(e.target.checked)}
            color="primary"
          />
        }
        label="Is Extra Name"
      />
      {isExtraName && (
        <TextField
          label="Product Extra Name Label"
          variant="outlined"
          fullWidth
          value={productExtraNameLabel}
          onChange={(e) => setProductExtraNameLabel(e.target.value)}
        />
      )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={status}
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label="Active"
            />
           
            <Button variant="contained" onClick={handleProductAddition} color='warning'>
              Submit
            </Button>
          </Stack>
        </Card>
      </Stack>

      <Stack direction="row" sx={{ width: '100%' }} mt={4}>
        <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
          Parameters(Child) :
        </Typography>

        <Card sx={{ width: '75%' }}>
          <Stack p={4}>
            {/* {parameters.map((param, index) => (
              <div key={index}>{param}</div>
            ))} */}

            {editing ? (
              <Stack spacing={2} direction="row" alignItems="center">
                <TextField
                  label="Name"
                  variant="outlined"
                  value={newParameter}
                  onChange={(e) => setNewParameter(e.target.value)}
                  fullWidth
                  autoFocus
                />

              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleEdit} color='warning'>
                  Add Parameter(Child)
                </Button>

              </Stack>

            )}
          </Stack>

          {editing && (
            <Stack px={4} direction="row" spacing={2}>
               
              <FormControl variant="outlined" fullWidth>
              <InputLabel>Select a Product</InputLabel>
        <Select
          value={selectedProduct}
          onChange={handleProductSelect}
        >
          {productList.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Select a Product</InputLabel>
        <Select
          value={selectedParentList}
          onChange={handleParentSelect}
        >
          {parentList.map((parent) => (
            <MenuItem key={parent.id} value={parent.id}>
              {parent.name}
            </MenuItem>
           
          ))}
        </Select>
        {selectedParentList && (
        <Select
          value={selectedChild}
          onChange={handleChildSelect}
        >
          {parentList
            .find((parent) => parent.id === selectedParentList)
            .children.map((child) => (
              <MenuItem key={child.id} value={child.id}>
                {child.name}
              </MenuItem>
            ))}
        </Select>
      )}
              
        <label>Subname</label>
      <input
        type="text"
        name="subname"
        value={childData.subname}
        onChange={handleInputChange}
      />

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={childData.name}
        onChange={handleInputChange}
      />

      <label>Image</label>
      <input
        type="file"
        name="image"
        onChange={handleInputChange}
      />

      <label>Slug</label>
      <input
        type="text"
        name="slug"
        value={childData.slug}
        onChange={handleInputChange}
      />

      <label>Status</label>
      <select
        name="status"
        value={childData.status}
        onChange={handleInputChange}
      >
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </select>

      <button onClick={handleChildSubmit}>Create Child</button>
              </FormControl>
            </Stack>
          )}
        </Card>
      </Stack>

      <Stack direction="row" sx={{ width: '100%' }} mt={4}>
        <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
          Price :
        </Typography>

        <Card sx={{ width: '75%' }}>
          <Stack p={4}>
          <Stack mb={4}>
        <FormControl fullWidth variant="outlined">
              <InputLabel>Available Parameters(Child)</InputLabel>
              <Select
                multiple
                label="Available Parameters(Child)"
                value={selectedSizes}
                onChange={handleSizeChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value='Bricks-1st Class-4"'>
                  <Checkbox checked={selectedSizes.includes('Bricks-1st Class-4"')} />
                  <ListItemText primary='Bricks-1st Class-4"' />
                </MenuItem>
                <MenuItem value='Bricks-1st Class-6"'>
                  <Checkbox checked={selectedSizes.includes('Bricks-1st Class-6"')} />
                  <ListItemText primary='Bricks-1st Class-6"' />
                </MenuItem>
                <MenuItem value='Bricks, 1st Class, 8"'>
                  <Checkbox checked={selectedSizes.includes('Bricks-1st Class-8"')} />
                  <ListItemText primary='Bricks-1st Class-8"' />
                </MenuItem>
              </Select>
            </FormControl>
        </Stack>
            <Button variant="contained" color="warning" onClick={handleTogglePriceSection}>
              {/* {showPriceSection ? 'Hide Price Section' : 'Show Price Section'} */}
              Add Price
            </Button>
            {showPriceSection && <AddPriceSection />}
          </Stack>
        </Card>
      </Stack>

      <Stack direction="row" sx={{ width: '100%' }} mt={4} justifyContent={'flex-end'}>
        <Button variant="contained" onClick={handleSave} color='warning'>
          Save All
        </Button>
      </Stack>

    </Container>
  );
}
