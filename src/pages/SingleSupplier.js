import * as React from 'react';
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Helmet } from 'react-helmet-async';
import { api } from '../Api/Api';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid, Container, Typography, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@dashboard/app';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';





const buttons = [
   
];
const buttonsaca = [
    <Button key="10th">10th certificate</Button>,
    <Button key="12th">12th certificate</Button>,
    <Button key="graduation">Graduation certificate</Button>,
];

export default function SingleSupplier() {
    const [open, setOpen] = useState(false);
    const { uid } = useParams();
    const [JobRoleValue, setJobRoleValue] = useState('');
    const [pincodeValue, setPincodeValue] = useState('');
    const [multiSelectAreas, setMultiSelectAreas] = useState([]);
    const [multiSelectVehicles, setMultiSelectVehicles] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [certificateData, setCertificateData] = useState([]);

    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [selectedDate2, setSelectedDate2] = useState(new Date());
  
    const handleDateChange1 = (date) => {
      setSelectedDate1(date);
    };
  
    const handleDateChange2 = (date) => {
      setSelectedDate2(date);
    };
  

    const handleClickImage = (image) => {
        setSelectedImage(image);
      };
    
    
      const handleCloseImageDialog = () => {
        setSelectedImage(null);
      };
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleJobRoleChange = (event) => {
        setJobRoleValue(event.target.value);
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
         // Assuming the offer and joining dates are stored in variables
         const offerDate = '11th November 2023';
         const joiningDate = '11th November 2023';
 
         // Show the success message
         setSuccessMessage(`You have successfully sent the offer letter and Joining letter to the candidate on ${joiningDate}.`);
 
        handleClose();
    };
    const handleViewFormatClick = () => {
        // Assuming pdfUrl is the URL of the PDF you want to download
        const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf';
        
        // Create a hidden link element
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'offer_letter.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    const [apiData, setApiData] = useState({});

    useEffect(() => {
      const fetchDataFromApi = async () => {
        try {
          const response = await api.get(`api/employee/employees/${uid}/`);
          setApiData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchDataFromApi();
      
    }, []);

    useEffect(() => {
        const certificateDataFromApi = async () => {
          try {
            const response = await api.get(`api/employee/certificate/${uid}/`);
            setCertificateData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        certificateDataFromApi();
      }, []);


      const [pdf, setPdf] = useState({
        offerLetter: null,
        joiningLetter: null,
      });
    
      const handleChange = (e) => {
        const { name, files } = e.target;
        setPdf((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : null,
        }));
      };
      
      const handleHire = () => {
        const date1 = moment(selectedDate1).format('YYYY-MM-DD');
        const date2 = moment(selectedDate2).format('YYYY-MM-DD');
      
        // Create a new FormData object
        const formData = new FormData();
       
        formData.append('name', apiData.name);
        formData.append('role', apiData.jobrole_name);
        formData.append('city', apiData.city_name);
        formData.append('region', apiData.region_name);
        formData.append('offer_letter', pdf.offerLetter);
        formData.append('joining_letter', pdf.joiningLetter);
        formData.append('offer_letter_date', date1);
        formData.append('joining_letter_date', date2);
        formData.append('salary', inputValue);
       

        // formData.append('status', true);

      
        console.log(formData);
      
        // Define custom headers
        const headers = {
          'Content-Type': 'multipart/form-data',
          // Add any other custom headers you need here
        };
      
        // Make a PUT request to update the active_join field and send the FormData
        api.put(`api/employee/hire/${uid}/`, formData, { headers })
          .then((response) => {
            console.log(response.data);
            handleClose();
          })
          .catch((error) => {
            console.error(error);
          });
      };


      const handleRejection = async () => {
        try {
          const response = await api.put(`api/employee/reject/${uid}/`, { hire: "rejected" });
    
          // Handle success, e.g., show a success message or redirect the user
          console.log(response.data);
        } catch (error) {
          // Handle error, e.g., show an error message to the user
          console.error(error);
        }
      }; 
    

    // const selectEmployee = async (employeeId) => {
    //     try {
    //         const Api = {
    //             user:apiData.user
    //         }
    //        const response = await api.put(`api/employee/employees/${employeeId}/`,Api);
    //       // Update the UI to reflect the selected status for the employee
    //       setApiData( { ...apiData, status: true }
    //     );
    //     } catch (error) {
    //       console.error('Error selecting employee:', error);
    //     }
    //   };
    
    //   const rejectEmployee = async (employeeId) => {
    //     try {
    //       await api.put(`api/employee/employees/${employeeId}/`);
    //       // Update the UI to reflect the rejected status for the employee
    //       setApiData((prevEmployees) =>
    //         prevEmployees.map((employee) =>
    //           employee.uid === employeeId ? { ...employee, status: false } : employee
    //         )
    //       );
    //     } catch (error) {
    //       console.error('Error rejecting employee:', error);
    //     }
    //   };
    
  
    return (

        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Supplier's Details
            </Typography>
            <Grid spacing={3} mt={5}>
                <Card xs={12}>
                    {/* <CardActionArea> */}
                    {/* <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    /> */}
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Avatar alt="Remy Sharp" src={apiData.image} sx={{ width: 200, height: 200 }} />
                        </div>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Name :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {apiData.name}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Address :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.father_name}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Role :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.mother_name}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Contact No :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.jobrole_name}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                WhatsApp No :
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">  State He/She Belongs to :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {apiData.state}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                City He/She Belongs to :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {apiData.city_name}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Contact No :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                               {apiData.mobile_number}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                WhatsApp No :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.whatsapp_number}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Present Adrress :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.present_address}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Permanent Address :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.permanent_address}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Blood Group :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.blood_group}
                                
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Date of Birth (Actual) :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.date_of_birth_actual}
                               
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Date of Birth (Certificate) :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.date_of_birth_certificate}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Last Company Name :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.previous_company_name}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                            <Typography variant="h5" component="div">
                                Last Company Contact Details :
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {apiData.previous_person_mobile}

                            </Typography>
                        </Stack>
                        <Stack direction={'row'} >
                            <Typography variant="h5" component="div" pt={1}>
                                Reference Details 1 :
                            </Typography>
                            <Stack spacing={1} p={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Name : {apiData.reference_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Mobile : {apiData.reference_mobile_details}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Relation : {apiData.reference_relation}
                                </Typography>
                            </Stack>

                        </Stack>
                        <Stack direction={'row'}>
                            <Typography variant="h5" component="div" pt={1}>
                                Reference Details 2 :
                            </Typography>
                            <Stack spacing={1} p={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Name : {apiData.reference_name_two}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Mobile :  {apiData.reference_mobile_details_two}

                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Relation : {apiData.reference_relation_two}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography gutterBottom variant="h5" component="div">
                            Personal Documents Download :
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                '& > *': {
                                    m: 1,
                                },
                            }}
                        >
                            <ButtonGroup size="large" aria-label="large button group" color='warning'>
                            <Button key="one"  onClick={() => handleClickImage(apiData.cv)}>CV</Button>
    <Button key="digital"  onClick={() => handleClickImage(apiData.digital_signature)}>Digital Signature</Button>
    <Button key="PAN"  onClick={() => handleClickImage(apiData.pan_card)}>PAN Card</Button>
    <Button key="Adhar"  onClick={() => handleClickImage(apiData.aadhar_card)}>Adhar Card</Button>
                            </ButtonGroup>
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            Academic Documents Download :
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                '& > *': {
                                    m: 1,
                                },
                            }}
                        >
                            <ButtonGroup size="large" aria-label="large button group" color='warning'>
                            {certificateData.map((data) => (
                    <Button key={data.id}  onClick={() => handleClickImage(data.image)}>{data.name}</Button>
                            ))}
                            </ButtonGroup>
                        </Box>
                    </CardContent>
                    {/* </CardActionArea> */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>

                        <CardActions>
                            
                        {apiData.hire === "rejected" ? (
  <>
    <Button size="small" color="error">
      Rejected
    </Button>
  </> ) : apiData.hire === "selected" ? (
  <>
    <Button size="small" color="success">
      Selected
    </Button>
  </> ) : (
  <>
    <Button size="small" color="error" onClick={handleRejection}>
      Reject
    </Button>
    <Button size="small" color="primary" onClick={handleClickOpen}>
      Hire
    </Button>
  </>
)}

                                              
                        </CardActions>
                    </div>
                    
                </Card>
            </Grid>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Hire Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText pb={1}>Please enter the required information.</DialogContentText>

                    <DialogContentText pb={2}>City : {apiData.city_name}</DialogContentText>

                    <DialogContentText pb={2}>Job role : {apiData.jobrole_name}</DialogContentText>

                    {/* <DialogContentText py={2}>Employee Code : ARLBM123</DialogContentText> */}
                          {/* <TextField
                            autoFocus
                            margin="dense"
                            label="Joining Salary"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        /> */}
                         <DialogContentText py={2}>Upload Offer Letter </DialogContentText>

<input type="file" name="offerLetter" onChange={handleChange} />

                    <Stack direction={"row"} spacing={2}>
                        <DialogContentText py={2}>Put Offer Letter Date Below</DialogContentText>
                        {/* <Button size="small" color="primary" onClick={handleViewFormatClick}>
                            View Format
                        </Button> */}
                    </Stack>
                    <div>
   
      <DatePicker
        selected={selectedDate1}
        onChange={handleDateChange1}
      />
     
    </div>
    <DialogContentText py={2} >Upload Joining Letter </DialogContentText>

      <input type="file" name="joiningLetter" onChange={handleChange} />
                   
                    <Stack direction={"row"} spacing={2}>
                        <DialogContentText py={2}>Put Joining Letter Date Below</DialogContentText>
                        {/* <Button size="small" color="primary" onClick={handleViewFormatClick}>
                            View Format
                        </Button> */}
                    </Stack>
                    <div>
   
      <DatePicker
        selected={selectedDate2}
        onChange={handleDateChange2}
      />
     
    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='warning'>
                        Cancel
                    </Button>
                    <Button onClick={handleHire} color='warning'>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
            {successMessage && (
                <div>
                    <p>{successMessage}</p>
                </div>
            )}

<Dialog open={selectedImage !== null} onClose={handleCloseImageDialog}>
        <DialogContent>
          <img src={selectedImage} alt="Larger" />
        </DialogContent>
      </Dialog>
        </Container>

    )
}
