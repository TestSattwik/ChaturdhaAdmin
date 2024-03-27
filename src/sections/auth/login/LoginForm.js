import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress 
} from "@mui/material";
import {api} from "../../../Api/Api";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
const containerStyle = {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const avatarStyle = {
  margin: "8px",
  backgroundColor: "secondary",
};

const formStyle = {
  width: "100%", // Fix IE 11 issue.
  marginTop: "8px",
};

const submitButtonStyle = {
  margin: "24px 0 16px",
};

const errorTextStyle = {
  color: "red",
  fontSize: "0.875rem",
};

const LoginForm = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("EMPLOYEE");
  const navigate = useNavigate();

  const handleMobileSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    setSendingOTP(true);
    try {
      const response = await api.post(
        "api/account/login-with-otp/",
        {
          phone_number: mobile,
          user_type: userType, // Change 'customer' to the actual user type
        }
      );
      console.log("inside try block", response.data);
      if (response?.data?.success === true) {
        setShowOtpForm(true);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.error);
    } finally {
      setSendingOTP(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setVerifyingOTP(true);
    try {
      const response = await api.put("api/account/login-with-otp/", {
        phone_number: mobile,
        otp: otp,
      });

      const { token, msg } = response.data;

      if (msg === 'Login Successful') {
        const { access, refresh } = token;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        const profileResponse = await api.get("api/account/profile/", {
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });
     

        const employeeDetails = profileResponse?.data?.user_details?.employee_details;
     
        await localStorage.setItem('employee_role_name', employeeDetails[0]?.jobrole_name);
        await localStorage.setItem('employee_role_id', employeeDetails[0]?.role.toString());
        await localStorage.setItem('employee_role_city', employeeDetails[0]?.city_name);
        await localStorage.setItem('employee_role_cityid', employeeDetails[0]?.city.toString());
        await localStorage.setItem('employee_role_region', employeeDetails[0]?.region_name);
        await localStorage.setItem('employee_role_regionid', employeeDetails[0]?.region.toString());
        
        // Replace with your navigation logic or use React Router
        const userRole = localStorage.getItem('employee_role_name');
        if(userRole === 'Executive'){
          window.location.href = 'dashboard/GeneralCity';
        }else if(userRole === 'Admin') {
          navigate('/dashboard/app');
        }else{
          navigate("/dashboard/app");

        }
      } else {
        throw new Error(msg); 
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage(error?.response?.data?.error || "An error occurred");
    }finally {
      setVerifyingOTP(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={containerStyle}>
      <CssBaseline />
      <div style={containerStyle}>
        {/* <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar> */}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {/* <Typography component="h1" variant="h5">
          {showOtpForm ? "Enter OTP" : "Enter Mobile Number"}
        </Typography> */}
        <form
          style={formStyle}
          onSubmit={showOtpForm ? handleOtpSubmit : handleMobileSubmit}
        >
           {!showOtpForm && (
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="user-type-label">
                User Type
              </InputLabel>
              <Select
                labelId="user-type-label"
                id="user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                label="User Type"
              >
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
                <MenuItem value="ADMIN">SuperAdmin</MenuItem>
              </Select>
            </FormControl>
          )}
          {!showOtpForm && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="tel"
              autoFocus
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          )}
          {showOtpForm && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP"
              type="text"
              id="otp"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitButtonStyle}
          >
            {sendingOTP || verifyingOTP ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              showOtpForm ? "Verify OTP" : "Send OTP"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;