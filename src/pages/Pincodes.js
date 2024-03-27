import React, { useEffect, useState } from 'react';
import { api } from "../Api/Api"

import { Helmet } from 'react-helmet-async';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField
} from '@mui/material';
const YourComponent = () => {
  const [regions, setRegions] = useState([]);
  const [newRegionName, setNewRegionName] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newArea, setNewArea] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedPincodeId, setSelectedPincodeId] = useState(null);

  // Create state to manage pincode inputs for each city separately
  const [pincodeInputs, setPincodeInputs] = useState({});
  const [cityNames, setCityNames] = useState({});

  // Create state to manage area inputs for each pincode separately
  const [areaInputs, setAreaInputs] = useState({});

  useEffect(() => {
    // Fetch regions when the component mounts
    api.get(`api/product/nested_areas/`)
      .then(response => setRegions(response.data))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  const handleRegionSubmit = (e) => {
    e.preventDefault();

    console.log("jk", newRegionName)
    // Create a new region with the entered name
    const newRegion = { name: newRegionName };

    api.post(`api/product/regions/`, newRegion)
      .then(response => {
        // Refetch the regions data after a new region is created
        api.get(`api/product/nested_areas/`)
          .then(response => setRegions(response.data))
          .catch(error => console.error('Error fetching regions:', error));

        // Clear the input field
        setNewRegionName('');
      })
      .catch(error => console.error('Error creating region:', error));
  };


  const handleCitySubmit = (regionId) => (e) => {
    e.preventDefault();

    // Create a new city with the entered name and the selected region
    const newCity = { name: cityNames[regionId], region: regionId };

    // Send a POST request to create the new city
    api.post(`api/product/cities/`, newCity)
      .then(response => {
        // Update the state with the new city
        const updatedRegions = regions.map(region => {
          if (region.id === regionId) {
            // Add the new city to the selected region
            return {
              ...region,
              cities: [...(region.cities || []), response.data],
            };
          }
          return region;
        });

        setRegions(updatedRegions);

        // Clear the input field
        setCityNames({ ...cityNames, [regionId]: '' });
        setPincodeInputs({ ...pincodeInputs, [response.data.id]: '' });
        setAreaInputs({ ...areaInputs, [response.data.id]: '' });
      })
      .catch(error => console.error('Error creating city:', error));
  };

  const handlePincodeSubmit = (cityId) => (e) => {
    e.preventDefault();

    // Ensure pincodeInputs has a value for the specific city
    const cityPincode = pincodeInputs[cityId];

    if (!cityPincode.trim()) {
      // Optionally, you can handle this case by showing an error message or preventing the form submission.
      console.error('Pincode cannot be blank');
      return;
    }

    // Create a new pincode with the entered value and the selected city
    const newPincodeData = { code: cityPincode, city: cityId };

    // Send a POST request to create the new pincode
    api.post(`api/product/pincodes/createlist/`, newPincodeData)
      .then(response => {
        // Update the state with the new pincode
        const updatedCities = regions.flatMap(region => region.cities || []).map(city => {
          if (city.city_id === cityId) {
            // Add the new pincode to the selected city
            return {
              ...city,
              pincodes: [...(city.pincodes || []), response.data],
            };
          }
          return city;
        });

        const updatedRegions = regions.map(region => {
          if (region.cities) {
            return {
              ...region,
              cities: updatedCities.filter(city => city.region === region.region_id),
            };
          }
          return region;
        });

        setRegions(updatedRegions);


      })
      .catch(error => console.error('Error creating pincode:', error));
  };

  const handleAreaSubmit = (pincodeId) => (e) => {
    e.preventDefault();


    const area = areaInputs[pincodeId];
    // Create a new area with the entered value and the selected pincode
    const newAreaData = { name: area, pincode: pincodeId };

    // Send a POST request to create the new area
    api.post(`api/product/areas/`, newAreaData)
      .then(response => {
        // Update the state with the new area
        const updatedPincodes = regions.flatMap(region => region.cities || []).flatMap(city => city.pincodes || []).map(pincode => {
          if (pincode.pincode_id === pincodeId) {
            // Add the new area to the selected pincode
            return {
              ...pincode,
              areas: [...(pincode.areas || []), response.data],
            };
          }
          return pincode;
        });

        const updatedCities = regions.flatMap(region => region.cities || []).map(city => {
          if (city.pincodes) {
            return {
              ...city,
              pincodes: updatedPincodes.filter(pincode => pincode.city === city.city_id),
            };
          }
          return city;
        });

        const updatedRegions = regions.map(region => {
          if (region.cities) {
            return {
              ...region,
              cities: updatedCities.filter(city => city.region === region.region_id),
            };
          }
          return region;
        });

        setRegions(updatedRegions);

        // Clear the input field for the specific pincode
        setAreaInputs({ ...areaInputs, [pincodeId]: '' });
        setNewArea('');
      })
      .catch(error => console.error('Error creating area:', error));
  };



  // ...

  // Update the state for city name when typing in the input field
  const handleCityNameChange = (cityId, value) => {
    setCityNames({ ...cityNames, [cityId]: value });
  };


  // Update the state for pincodeInputs when typing in a pincode text field
  const handlePincodeInputChange = (cityId, value) => {
    setPincodeInputs({ ...pincodeInputs, [cityId]: value });
  };

  // Update the state for areaInputs when typing in an area text field
  const handleAreaInputChange = (pincodeId, value) => {
    setAreaInputs({ ...areaInputs, [pincodeId]: value });
  };

  return (
    <>
      <Helmet>
        <title> Locations  </title>
      </Helmet>

      <Container>
        <div>
          <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
            <Typography variant="h1" component="div">Our Working Regions</Typography>
          </Stack>
              {/* Form for creating a new region */}
              <form onSubmit={handleRegionSubmit}>
           <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New Region"
                          color='warning'
                          value={newRegionName}
                onChange={(e) => setNewRegionName(e.target.value)}
             ></TextField>
                       <Button type="submit" color='warning'>
                            Create Region
                          </Button>
                   </Stack>
            
          </form>
          <Card sx={{ width: '100%', padding: 1 }}>
          
          {regions.map(region => (
            <div key={region.region_id}>
              <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
              <Typography variant="h2" component="div">Region : {region.region}</Typography>
               {/* Form for creating a new city within the region */}
               <form onSubmit={handleCitySubmit(region.region_id)}>
               <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New City"
                          color='warning'
                          value={cityNames[region.region_id] || ''}
                    onChange={(e) => handleCityNameChange(region.region_id, e.target.value)}
                   ></TextField>
                       <Button type="submit" color='warning'>
                            Create City
                          </Button>
                   </Stack>
                
              </form>
              </Stack>

              {region.cities && region.cities.map(city => (
                <div key={city.city_id}>
                   <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          pl={3}
                        >
                  <Typography variant="h3" component="div" pl={1}>City : {city.name}</Typography>
                    {/* Form for creating a new pincode within the city */}
                    <form onSubmit={handlePincodeSubmit(city.city_id)}>
                    <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New Pincode"
                          color='warning'
                          value={pincodeInputs[city.city_id] || ''}
                          onChange={(e) => handlePincodeInputChange(city.city_id, e.target.value)}
                       ></TextField>
                       <Button type="submit" color='warning'>
                            Create Pincode
                          </Button>
                   </Stack>
                  </form>
                  </Stack>
          <Card sx={{ width: '100%', margin: 3, padding: 1 }}>

                  {city.pincodes && city.pincodes.map(pincode => (
                    <div key={pincode.pincode_id}>
                      <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          pl={2}
                        >
                      <Typography variant="h4" component="div" >Pincode : {pincode.code}</Typography>
                        {/* Form for creating a new area within the pincode */}
                        <form onSubmit={handleAreaSubmit(pincode.pincode_id)} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
                        <TextField
                          type="text"
                          margin="dense"
                          label="Add New Area Name"
                          color='warning'
                          value={areaInputs[pincode.pincode_id] || ''}
                          onChange={(e) => handleAreaInputChange(pincode.pincode_id, e.target.value)}
                        ></TextField>
                          <Button type="submit" color='warning'>
                            Create Area
                          </Button>
                     </Stack>

                      </form>
                      </Stack>
                      <Stack
                          // direction={"row"}
                          // alignItems={"center"}
                          spacing={1}
                          pl={8}
                        >
          <Typography variant="h6" component="div" pl={2}>Area :</Typography>

                      {pincode.areas && pincode.areas.map(area => (
                        <li key={area.area_id} style={{ paddingLeft: 20, marginLeft: 20 }}>{area}</li>
                      ))}
                      </Stack>

                    
                    </div>
                  ))}
</Card>
                
                </div>
              ))}

             
            </div>
          ))}

          </Card>
         
         
        </div>
      </Container>
    </>
  );
};


export default YourComponent;
