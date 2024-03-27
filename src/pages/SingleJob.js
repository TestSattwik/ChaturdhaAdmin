import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Helmet } from "react-helmet-async";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Iconify from "../components/iconify";
import { api } from "../Api/Api";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

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
} from "../sections/@dashboard/app";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

const buttons = [
  <Button key="one">CV</Button>,
  <Button key="digital">Digital Signature</Button>,
  <Button key="PAN">PAN Card</Button>,
  <Button key="Adhar">Adhar Card</Button>,
];
const buttonsaca = [
  <Button key="10th">10th certificate</Button>,
  <Button key="12th">12th certificate</Button>,
  <Button key="graduation">Graduation certificate</Button>,
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SingleJob() {
  const [open, setOpen] = useState(false);
  const [JobRoleValue, setJobRoleValue] = useState("");
  const [pincodeValue, setPincodeValue] = useState("");
  const [multiSelectAreas, setMultiSelectAreas] = useState([]);
  const [multiSelectVehicles, setMultiSelectVehicles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [deadlines, setDeadlines] = useState({});
  const [dateValue, setDateValue] = useState(""); // Added state for date
  const [monthValue, setMonthValue] = useState(""); // Added state for month
  const [yearValue, setYearValue] = useState(""); // Added state for year
  const [reports, setReports] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const { regionId, cityId, roleId } = useParams();
  const [reportOpen, setReportOpen] = useState(false);
    const [openpdf, setOpenpdf] = useState(false);

    const handleOpenpdf = () => {
      setOpenpdf(true);
    };
  
    const handleClosepdf = () => {
      setOpenpdf(false);
    };
  
    const downloadPdf = () => {
      // Logic to download the PDF file
      // You can use any method to fetch or create the PDF file
      // For simplicity, let's assume you have a PDF file URL
      const pdfUrl = 'https://example.com/path-to-your-pdf.pdf';
      window.openpdf(pdfUrl, '_blank');
    };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleViewReport = () => {
    setReportOpen(!reportOpen);
  };

  const handleChangeReport = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReportSubmit = () => {
    // Assuming you have a function to fetch reports and it returns an array of reports
    const fetchedReports = [
      {
        title: "Report of Material Survey Form Round 1",
        content: "Report content goes here...",
        date: "12-10-2023", // Example date
        pdfUrl: "https://example.com/report.pdf", // Example PDF URL
      },
      // Add more reports as needed
    ];

    setReports(fetchedReports);
    setOpen(true);
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleTask = () => {
    if (taskInput.trim() !== "") {
      const fullDate = `${dateValue}-${monthValue}-${yearValue}`;
      const taskWithDeadline = { task: taskInput, deadline: fullDate };
      setTasks([...tasks, taskWithDeadline]);
      setTaskInput("");
      setDeadlines({ ...deadlines, [taskInput]: fullDate });
      setDateValue(""); // Reset the date input after adding task
      setMonthValue(""); // Reset the month input after adding task
      setYearValue(""); // Reset the year input after adding task
    }
  };

  const handleDeadlineChange = (e, task) => {
    const updatedDeadlines = { ...deadlines, [task]: e.target.value };
    setDeadlines(updatedDeadlines);
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
    const offerDate = "11th November 2023";
    const joiningDate = "11th November 2023";

    // Show the success message
    setSuccessMessage(
      `You have successfully sent the offer letter and Joining letter to the candidate on ${joiningDate}.`
    );

    handleClose();
  };
  const handleViewFormatClick = () => {
    // Assuming pdfUrl is the URL of the PDF you want to download
    const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";

    // Create a hidden link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "offer_letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Define a function to fetch employees
    const fetchEmployees = async () => {
        console.log("ids",roleId,cityId,regionId)
      try {
        // Make a GET request to your Django API with query parameters
        const response = await api.get("api/employee/employeeregioncityrole/", {
          params: {
            region: regionId,
            city: cityId,
            role: roleId,
            status: true,
          },
        });

        console.log("djdf", response.data);
        // Update the state with the fetched employees
        setApiData(response.data);

        handleToggleActive;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // Call the fetchEmployees function to initially load employees
    fetchEmployees();
  }, [regionId, cityId, roleId]); // Re-fetch when city or role changes

  const [certificateData, setCertificateData] = useState([]);

  useEffect(() => {
    const certificateDataFromApi = async () => {
      const apidata = apiData.map((data) => data.uid);
      try {
        const response = await api.get(`api/employee/certificate/${apidata}/`);
        setCertificateData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    certificateDataFromApi();
  }, []);

  const handleClickImage = (image) => {
    setSelectedImage(image);
  };
  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (index) => {
    setSelectedTask(index);
  };

  const taskss = [
    { id: "1", label: "Collect & Fill GI Form (12-08-23)" },
    { id: "2", label: "Give Training to TC (12-08-23)" },
    { id: "3", label: "Give Training to MC (12-08-23)" },
    { id: "4", label: "Update Daily Expenses (12-08-23)" },
    { id: "5", label: "Submit Report Of The Day (12-08-23)" },
    { id: "6", label: "Review The Survey Form (12-08-23)" },
  ];

  const handleToggleActive = (userData) => {
    console.log(userData);
    const currentTime = new Date(); // Get the current time
    const apidata = apiData.map((id) => id.uid);
    const formattedTime = currentTime.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Make a PUT request to update the active_join field and send the current time
    api
      .put(`api/employee/employees/${apidata}/`, {
        user: userData,
        active_join: true,
        joining_time: formattedTime,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const [pdf, setPdf] = useState({
    joiningLetter: null,
  });

  const handleDocument = (e) => {
    const { name, files } = e.target;
    setPdf((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : null,
    }));
  };
  
  const handleUpload = async (UID) => {
    const formData = new FormData();
    formData.append('joining_letter', pdf.joiningLetter);
    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            // Add any other custom headers you need here
          };
      const response = await api.patch(`api/employee/employees/${UID}/`,formData,{headers});

      // Handle success, e.g., show a success message or redirect the user
      console.log(response.data);
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error(error);
    }
  }; 

  const handleDownload = async (downloadData) => {
    try {
      // Assuming downloadData.signature_offer_letter contains the URL or path to the PDF file
      const response = await fetch(downloadData.signature_offer_letter);
      const blob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'signature_offer_letter.pdf';
      downloadLink.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  const handleDownload1 = async (downloadData1) => {
    try {
      // Assuming downloadData.signature_offer_letter contains the URL or path to the PDF file
      const response = await fetch(downloadData1.signature_joining_letter);
      const blob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'signature_joining_letter.pdf';
      downloadLink.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          {/* {jobName} Profile ({cityName}) */}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          color="warning"
          component={Link}
          to="/dashboard/createjob"
        >
          Edit Job Profile
        </Button>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Tasks" {...a11yProps(0)} />
            <Tab label="Employee Information" {...a11yProps(2)} />
            <Tab label="Reports" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Add Tasks :
          </Typography>
          <Stack
            item
            xs={12}
            md={6}
            lg={8}
            justifyContent={"center"}
            direction={"row"}
            spacing={2}
          >
            <TextField
              margin="dense"
              fullWidth
              type="text"
              id="taskInput"
              placeholder="Enter a task..."
              value={taskInput}
              onChange={handleTaskInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Month"
              value={monthValue}
              onChange={(e) => setMonthValue(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Year"
              value={yearValue}
              onChange={(e) => setYearValue(e.target.value)}
            />
            <Button onClick={handleTask} color="warning">
              Assign Task
            </Button>
          </Stack>
          <Grid spacing={3}>
            <Typography variant="h4" sx={{ my: 2 }}>
              Assigned Tasks :
            </Typography>
            <Card xs={12}>
              <Grid item xs={12} md={6} lg={8} py={2} p={5}>
                {tasks.map((task, index) => (
                  <div key={index}>
                    <div onClick={() => handleTaskClick(index)}>
                      <Typography variant="h4" sx={{ my: 5 }}>
                        {" "}
                        {task.task} ({task.deadline}){" "}
                      </Typography>
                      <Button size="small" color="warning">
                        View Report
                      </Button>
                    </div>
                    {selectedTask === index && (
                      <Grid spacing={3} mt={5}>
                        <Card xs={12}>
                          <CardContent>
                            <Typography variant="h4" sx={{ my: 5 }}>
                              Report of {task.task}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {task.report}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Date: {task.deadline}
                            </Typography>
                            <Button
                              component="a"
                              href={"https://example.com/report.pdf"}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              color="primary"
                              sx={{ mt: 2 }}
                            >
                              View PDF
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </div>
                ))}
              </Grid>
            </Card>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}></CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography variant="h4" sx={{ my: 5 }}>
            Profile info :
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
              {apiData.map((data) => (
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={data.image}
                      sx={{ width: 200, height: 200 }}
                    />
                  </div>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Name :
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {data.name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Father's Name :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.father_name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Mother's Name :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.mother_name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Role Applied :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.jobrole_name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Date and Time of Application :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      On 12-10-2023 at 4.30 PM
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      {" "}
                      State He/She Belongs to :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.state}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      City He/She Belongs to :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.city_name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Contact No :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.mobile_number}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      WhatsApp No :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.whatsapp_number}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Present Adrress :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.present_address}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Permanent Address :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.permanent_address}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Blood Group :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.blood_group}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Date of Birth :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.date_of_birth_actual}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Date of Birth (Certificate) :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.date_of_birth_certificate}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Last Company Name :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.previous_company_name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Last Company Contact Details :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.previous_person_mobile}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"}>
                    <Typography variant="h5" component="div" pt={1}>
                      Reference Details 1 :
                    </Typography>
                    <Stack spacing={1} p={2}>
                      <Typography variant="body2" color="text.secondary">
                        Name :
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Mobile : 987654321
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Relation : Relative
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
                    <Typography variant="h5" component="div" pt={1}>
                      Reference Details 2 :
                    </Typography>
                    <Stack spacing={1} p={2}>
                      <Typography variant="body2" color="text.secondary">
                        Name : Rani Mishra
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Mobile : 987654321
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Relation : Relative
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography gutterBottom variant="h5" component="div">
                    Personal Documents Download :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      "& > *": {
                        m: 1,
                      },
                    }}
                  >
                    <ButtonGroup
                      size="large"
                      aria-label="large button group"
                      color="warning"
                    >
                      <Button
                        key="one"
                        onClick={() => handleClickImage(data.cv)}
                      >
                        CV
                      </Button>
                      <Button
                        key="digital"
                        onClick={() => handleClickImage(data.digital_signature)}
                      >
                        Digital Signature
                      </Button>
                      <Button
                        key="PAN"
                        onClick={() => handleClickImage(data.pan_card)}
                      >
                        PAN Card
                      </Button>
                      <Button
                        key="Adhar"
                        onClick={() => handleClickImage(data.aadhar_card)}
                      >
                        Adhar Card
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    Academic Documents Download :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      "& > *": {
                        m: 1,
                      },
                    }}
                  >
                    <ButtonGroup
                      size="large"
                      aria-label="large button group"
                      color="warning"
                    >
                      {certificateData.map((certidata) => (
                        <Button
                          key={certidata.id}
                          onClick={() => handleClickImage(certidata.image)}
                        >
                          {certidata.name}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Date and Time of Hiring :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.hire_date} at{data.hire_time}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                    <Typography variant="h5" component="div">
                                     joining date  of {data.jobrole_name}  {data.name}:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {data.joining_letter_date}
                                    </Typography>
      <input type="file" name="joiningLetter" onChange={handleDocument} />
      <Button color='warning' onClick={() => handleUpload(data.uid)}>
          Upload
        </Button>

                                </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Download Accepted offer letter by Employee:
                    </Typography>
                    {data ? (
        <Button color='warning' onClick={() => handleDownload(data)}>
          Download
        </Button>
      ) : null}
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Download Accepted Joining letter by Employee :
                    </Typography>
                    {data ? (
        <Button color='warning' onClick={() => handleDownload1(data)}>
          Download
        </Button>
      ) : null}
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={2}
                  >
                    <Typography variant="h5" component="div">
                      Date and Time of Joining :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.joining_time}
                    </Typography>

                                        {data.active_join === true ? (
                                            <Button color='warning' >
                                                Deactive
                                            </Button>) : (
                                            <Button onClick={() => handleToggleActive(data.user)} color='warning' >
                                                Active
                                            </Button>
                                        )
                                        }
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            Bank Details :
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            Salary Account :
                                        </Typography>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Paste Bank Link Here.."
                                            fullWidth
                                        />
                                        <Button onClick={{}} color='warning' component={Link} to="/dashboard/SingleJob">
                                            Send Bank Link
                                        </Button>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            Acc No :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            12345678909876543
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            IFSC Code :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ABCD1234
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            Branch Name / Code :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Saheed nagar
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            City :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Bhubaneswar
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                        <Typography variant="h5" component="div">
                                            Account Holder Name :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Shusil Mishra
                                        </Typography>
                                    </Stack>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                            <Typography variant="h5" component="div">
                                                Salary Slip :
                                            </Typography>
                                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, justifyContent: "center", alignItems: "center", padding: 1 }}>
                                                <input type="file" name="offerLetter" onChange={handleChange} />


                                            </Box>
                                            <Button onClick={{}} color='warning' component={Link} to="/dashboard/SingleJob">
                                                Send
                                            </Button>
                                            <Button color='warning' onClick={handleOpenpdf}>
                                                History
                                            </Button>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">
                                           Last Applied on 11 Dec 2023
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                            <Typography variant="h5" component="div">
                                                Promotion Letter :
                                            </Typography>
                                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, justifyContent: "center", alignItems: "center", padding: 1 }}>
                                                <input type="file" name="offerLetter" onChange={handleChange} />


                                            </Box>
                                            <Button onClick={{}} color='warning' component={Link} to="/dashboard/SingleJob">
                                                Send
                                            </Button>
                                            <Button color='warning' onClick={handleOpenpdf}>
                                                History
                                            </Button>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">
                                           Last Applied on 11 Dec 2023
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
                                            <Typography variant="h5" component="div">
                                                Experience Certificate :
                                            </Typography>
                                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, justifyContent: "center", alignItems: "center", padding: 1 }}>
                                                <input type="file" name="offerLetter" onChange={handleChange} />


                                            </Box>
                                            <Button onClick={{}} color='warning' component={Link} to="/dashboard/SingleJob">
                                                Send
                                            </Button>
                                            <Button color='warning' onClick={handleOpenpdf}>
                                                History
                                            </Button>
                  
                                        </Stack>
                                        <Dialog open={openpdf} onClose={handleClosepdf} maxWidth="md" fullWidth>
        <DialogTitle>History :</DialogTitle>
        <DialogContent>

          {/* Download Button */}
          <Button onClick={downloadPdf} color="primary" variant="contained">
            Download PDF
          </Button>

          {/* Date */}
          <Typography variant="subtitle1" color="textSecondary">
            Sent On Date: {new Date().toLocaleDateString()}
          </Typography>
        </DialogContent>
      </Dialog>
                                        <Typography variant="body2" color="text.secondary">
                                           Last Applied on 11 Dec 2023
                                        </Typography>
                                    </Box>
                                </CardContent>
                            ))}
                            {/* </CardActionArea> */}

                        </Card>
                    </Grid>
                    {/* <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Hire Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText pb={1}>Please enter the required information.</DialogContentText>
                    <TextField
                        select
                        margin="dense"
                        label="Select City"
                        fullWidth
                        value={pincodeValue}
                        onChange={handlePincodeChange}
                        style={{ marginBottom: '16px' }}
                    >
                        <MenuItem value="bbs">Bhubaneswar</MenuItem>
                        <MenuItem value="ctc">Cuttack</MenuItem>
                        <MenuItem value="rrl">Rourkela</MenuItem>
                        <MenuItem value="viz">Vizag</MenuItem>
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Select Job Role"
                        fullWidth
                        value={JobRoleValue}
                        onChange={handleJobRoleChange}
                    >
                        <MenuItem value="Look">Look Out Manager</MenuItem>
                        <MenuItem value="Branch">Branch Manager</MenuItem>
                        <MenuItem value="Transporting">Transporting Captain</MenuItem>
                        <MenuItem value="Material">Material Captain</MenuItem>
                        <MenuItem value="Receptionist">Receptionist</MenuItem>
                    </TextField>
                    <DialogContentText py={2}>Employee Code : ARLBM123</DialogContentText>
                    <DialogContentText pb={2}>Reference Number : ARL12345679</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Joining Salary"
                        fullWidth
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Stack direction={"row"} spacing={2}>
                        <DialogContentText py={2}>Put Offer Letter Date Below</DialogContentText>
                        <Button size="small" color="primary" onClick={handleViewFormatClick}>
                            View Format
                        </Button>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Date"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Month"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Year"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <DialogContentText py={2}>Put Joining Letter Date Below</DialogContentText>
                        <Button size="small" color="primary" onClick={handleViewFormatClick}>
                            View Format
                        </Button>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Date"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Month"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Year"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='warning'>
                        Cancel
                    </Button>
                    <Button onClick={handleFormSubmit} color='warning'>
                        Send
                    </Button>
                </DialogActions>
            </Dialog> */}
        </CustomTabPanel>
      </Box>

      <Dialog open={selectedImage !== null} onClose={handleCloseImageDialog}>
        <DialogContent>
          <img src={selectedImage} alt="Larger" />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
