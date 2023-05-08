import React from 'react'
import  { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import{useEffect} from 'react';
import Select from "react-select";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';

import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';
  
const UpdateSale = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [selectedProductCode, setSelectedProductCode] = useState("");
  useEffect(() => {
    axios.get('http://localhost:3001/api/getAllProduct').then((response) => {
      setProducts(response.data);
      console.log(response.data);

    });
    axios.get(`http://localhost:3001/api/getSales/${id}`)
      .then(response => {
        const { name, product,quality,budget } = response.data;
        setName(user.login);
        setProduct(product);
        setQuantity(quality);
        setBudget(budget); 
        setSelectedProductPrice((budget/quality).toFixed(2));
        axios.get(`http://localhost:3001/api/getProduct/${product}`)
      .then(response => {
        const {code} = response.data;
        setSelectedProductCode(code)
      })
           
      })
      .catch(error => console.log(error));

      
  }, [id]);

  const options = products.map((product) => ({
    id: product.id,
    name: product.name,
    code: product.code,
      Qstock: product.Qstock,
      prix: product.prix,
  }));
 


  const [time, setTime] = useState(new Date().toISOString().slice(0, 10));
  const [quality, setQuantity] = useState('');
  const [product, setProduct] = useState('');
  const [budget, setBudget] = useState(0);
  const [errors, setErrors] = useState({});
  const user=JSON.parse(localStorage.getItem('user-info'))
  const [name, setName]=useState(user.login)
  const [code, setCode] = useState('');
  const[userRole,setUserRole]=useState(user.name)
  
    const navigate = useNavigate();

    const handleProductChange = (event) => {
        setProduct(event.target.value);
        };
    const handleQuantityChange = (event) => {
      const qty = event.target.value;
      setQuantity(qty);
      const selectedProduct = options.find((p) => p.id === product);
    if (selectedProduct) {
      const price = selectedProduct.prix;
      const budget = qty * price;
      setBudget((budget).toFixed(3));
    }
      
    };


  
const handleClearForm = () => {
//   setName('');
//   setProduct('');
// setQuantity('');
navigate('/')
    
};

    const handleSubmit =(event) => {
        event.preventDefault();

        const data={
            product: product,
            quality:quality,
            name:name,
            time:time,
            budget:budget,
      };
      console.log(name)
      if (validateForm()) {
        console.log(data);
       
      axios.put(`http://localhost:3001/api/updateSales/${id}`, data)
          .then(response => {
            console.log(response);
            navigate('/');
          })
          .catch(error => console.log(error));
    }}

    const validateForm = () => {
        let isValid = true;
        let errors = {};
       if (!product) {
           errors.product = "Product code is required";
          isValid = false;
        }
        if (!quality) {
           errors.quantity = " quantity is required";
           isValid = false;
        } 
         if (quality < 0) {
          errors.quantity = "Stock quantity must be a positive number";
          isValid = false;
       }
    
        if(quality > product.stock){
           errors.quantity = "Stock insufficient";
           isValid = false;
        }
        setErrors(errors);
         return isValid;
       }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
            <BaseCard title="Update Sale">
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}  sx={{ marginTop: '-50px', paddingTop: '10px' }} >
            
              { 
          <Autocomplete
        options={options}
        getOptionLabel={(option) => option.code}
        renderInput={(params) => (
          <TextField
      {...params}
      label={selectedProductCode}
      variant="outlined"
      
       error={errors.product}
      helperText={errors.product}
      
      onFocus={() => setErrors({ ...errors, product: '' })}
    />
    
  )}
  onChange={(event, newValue) => {
    setProduct(newValue ? newValue.id : "");
    setSelectedProductPrice(newValue ? newValue.prix : "");
    const selectedProduct = options.find((p) => p.id === product);
      
        const price = newValue.prix;
        const budget = quality * price;
        setBudget(budget);
      

  }}
  sx={{ width: "60%" }}
/>
  
}
                       
                      <TextField
            fullWidth
            id="quantity-input"
            label="Quantity"
            type="number"
            value={quality}
            onChange={handleQuantityChange}
            sx={{ width: "60%" }}
            error={!!errors.quantity}
            helperText={errors.quantity}
            onFocus={() => setErrors({ ...errors, quantity: '' })}
          />
                  
                  <TextField
        fullWidth
        id="total-input"
        label="price"
        type="number"
        value={selectedProductPrice}
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: "60%" ,backgroundColor: "#f5f5f5"}}
      />    
                  <TextField
        fullWidth
        id="total-input"
        label="Total"
        type="number"
        value={budget}
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: "60%" ,backgroundColor: "#f5f5f5"}}
      />  
      
          
    
              </Stack>
              <br />
              <Button type='submit' variant="contained" mt={2}>
                Submit
              </Button>
              <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
      Retun
    </Button>
    </form>
            </BaseCard>
          </Grid>
          </Grid>
          </FullLayout>
          </ThemeProvider>
      )
    }

export default UpdateSale