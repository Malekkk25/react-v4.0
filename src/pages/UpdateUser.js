import React,{useState,useEffect} from "react";
import Axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import FullLayout from "../components/layouts/FullLayout";
import axios from 'axios';
import {
    Grid,
    Stack,
    TextField,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';
const UpdateUser = () => {
    const { id } = useParams();
    const [login ,setLogin]=useState('');
    const [email , setEmail]=useState('');
    const [tel , setTel]=useState('');
    const [join_time , setJoin_Time]=useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [oldPassword, setOldPassword] = useState('');
    const [newEmail , setNewEmail]=useState('');
    const [newPassword, setNewPassword] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();
    useEffect(() => {
      Axios.get('http://localhost:3001/api/getUser').then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
    }, []);
const options = users.map((u) => ({
      id: u.id,
      email: u.email,
    }));
    useEffect(() => {
      axios.get(`http://localhost:8000/api/user/${id}`)
        .then(response => {
          const {login,email,tel,join_time,password,role } = response.data;
          setLogin(login);
          setEmail(email)
          setNewEmail(email)
          setTel(tel)
          setPassword(password)
          setJoin_Time(join_time)
          setRole(role);
          console.log(response.data)
        })
        .catch(error => console.log(error));
    }, [id]);
    // const updateUser = async (id, data) => {
    //   try {
    //     const response = await axios.put(`http://localhost:8000/api/update/${id}`, d);
    //     console.log(response.d);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };


    const handleNameChange =(event) => {
        setLogin(event.target.value);
    };

    const handleEmailChange =( event) =>{
        setNewEmail(event.target.value);
    };
    const handlePhoneChange =( event) =>{
        setTel(event.target.value);
    };
    const handleJoinDateChange =(event) =>{
        setJoin_Time(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    const handleRoleChange =(event) =>{
        setRole(event.target.value);
    };
    const handleClearForm = () => {
        history('/User')
      };
      
      function validateForm() {
        let errors = {};
        let isValid=true;
        if (!login) {
          errors.login = 'Full Name is required';
          isValid = false;
        }
      
        if (!email) {
          errors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Invalid email address';
          isValid = false;
        }
      
        // if (!password) {
        //   errors.password = 'Password is required';
        //   isValid = false;
        // } else 
        if (typeof password !== 'undefined' && password.length < 6) {
          errors.password = 'Password must be at least 6 characters';
          isValid = false;
        }
        if(!(newEmail ==email))
        if (options.find((o) => o.email.toLowerCase() === newEmail.toLowerCase())) {
          errors.email = 'Email address already exists';
          isValid = false;
        }
        if (!tel) {
          errors.tel = 'Phone number is required';
          isValid = false;
        }  if (!/^[0-9]+$/.test(tel)) {
          errors.tel = 'Phone number must contain only digits';
          isValid = false;
        }
      
        if (!role) {
          errors.role = 'Role is required';
          isValid = false;
        }
      
        if (!join_time) {
          errors.join_time = 'Join date is required';
          isValid = false;
        }
        setErrors(errors);
        return isValid ;
      }
      
    const Add = event => {
      event.preventDefault();
      const data={
            login: login,
           email : email,
            tel:tel,
           join_time:join_time,
            password: password,
           role:role,
           oldPassword:oldPassword,
           newPassword:newPassword
          };
          if (validateForm()) {
      axios.put(`http://localhost:8000/api/update/${id}`, data)
        .then((response) => {
          console.log(response.data);
          history('/User')
        }).catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            // handle invalid password error
            setErrors({oldPassword: 'Invalid password'});
          } else {
            // handle other errors
            setErrors({submit: 'An error occurred. Please try again.'});
          }
        });}}
   

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Update User" >
        <form >
          <Stack spacing={1} sx={{ marginTop: '-50px', paddingTop: '10px' }} >
            
          <TextField
              id="name"
              label="Full Name "
              variant="outlined"
              value={login}
              onChange={handleNameChange}
              onFocus={() => setErrors({ ...errors, login: '' })}
              error={errors.login}
              helperText={errors.login}
              sx={{ width: '60%' }}
              
              
            />
            <TextField
              id="email"
              label="Email"
              value={newEmail}
              onFocus={() => setErrors({ ...errors, email: '' })}
              error={errors.email}
              helperText={errors.email}
              onChange={handleEmailChange}sx={{ width: '60%' }} 
              
              
            />

  
  <TextField
    id="phone"
    label="Phone Number"
    value={tel}
    onChange={handlePhoneChange}
    onFocus={() => setErrors({ ...errors, tel: '' })}
    error={errors.tel}
    helperText={errors.tel}
    sx={{ width: '30%',  marginLeft: '10px'  ,marginRight:'330px'}}
  />


        <FormControl>
              <FormLabel id="role"  sx={{marginRight:"1150px"}}>Role</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                //defaultValue="admin"
                name="radio-buttons-group"
                onChange={handleRoleChange}
                row 
                value={role}
               
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                  error={errors.role}
                  helperText={errors.role}
                  
                />
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label="Employee"
                  error={errors.role}
                  helperText={errors.role}
                
                />
              
              </RadioGroup>
            </FormControl>
        <TextField
          id="date"
          label="Join Date"
          type="date"
          value={join_time}
          onChange={handleJoinDateChange}
          onFocus={() => setErrors({ ...errors, join_time: '' })}
          error={errors.join_time}
          helperText={errors.join_time}
          InputLabelProps={{
            shrink: true,
          }}
        />


          </Stack>
          <br />
          <Button type='submit' variant="contained" mt={0} onClick={Add}>
            Submit
          </Button>
          <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
  Return
</Button></form>

        </BaseCard>
      </Grid>
      </Grid>
      </FullLayout>
      </ThemeProvider>
  )
}

export default UpdateUser