
import React from 'react'
import theme from '../theme/theme';
import {useState,useEffect} from "react";
import Axios from 'axios';
import { Autocomplete } from '@mui/material';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';
  

  const AddSale = () => {
  const [products, setProducts] = useState([]);
 
 
   useEffect(() => {
     Axios.get('http://localhost:3001/api/getAllProduct').then((response) => {
      setProducts(response.data);
      console.log(response.data);

     });
   }, []);
   const options = products.map((product) => ({
    id: product.id,
    code: product.code,
    name: product.name,
    Qstock: product.Qstock,
    prix: product.prix,
  }));

    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem('user-info'))
    const [name, setName]=useState(user.login)
    const[userRole,setUserRole]=useState(user.name)
  const [time, setTime] = useState(new Date().toISOString().slice(0, 10));
  const [quality, setQuantity] = useState('');
  const [product, setProduct] = useState('');
  const [budget, setBudget] = useState(0);
  const [prix, setPrix] = useState(0);
  const [errors, setErrors] = useState({});
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    if(qty>0){
    const selectedProduct = options.find((p) => p.id === product);
    if (selectedProduct) {
      const price = selectedProduct.prix;
      const budget = qty * price;
      setBudget((budget).toFixed(3));
    }}
    else{
      setBudget(0)
    }
  };
    
    
  const handleClearForm = () => {
    navigate('/')
  };
  
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
       
       if(product){
        const selectedProduct = options.find((p) => p.id === product);
        if(quality > selectedProduct.Qstock){
           errors.quantity = "Stock insufficient";
           isValid = false;
        }}
        setErrors(errors);
         return isValid;
       }



  const AddSale = (event) => {
    event.preventDefault();
    if (validateForm()) {
  const data={
    product: product,
    quality:quality,
    name:name,
    time:time,
    budget:budget,
};
    event.preventDefault();
   Axios.post("http://localhost:3001/api/insertSales", data)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }};


  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Add Sale">
        <form onSubmit={AddSale}>
          <Stack spacing={1}  sx={{ marginTop: '-50px', paddingTop: '10px' }} >
          { 
          <Autocomplete
        options={options}
        getOptionLabel={(option) => option.code}
        renderInput={(params) => (
          <TextField
      {...params}
      label="Select a Product"
      variant="outlined"
      
       error={errors.product}
      helperText={errors.product}
      
      onFocus={() => setErrors({ ...errors, product: '' })}
    />
    
  )}
  onChange={(event, newValue) => {
    setProduct(newValue ? newValue.id : "");
    setSelectedProductPrice(newValue ? newValue.prix : "");
    const price = newValue.prix;
        const budget = quality * price;
        setBudget((budget).toFixed(3));
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
        sx={{ width: "60%",backgroundColor: "#f5f5f5" }}
      />  
      

          </Stack>
          <br />
          <Button type='submit' variant="contained" mt={2}>
            Submit
          </Button>
          <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
  Return
</Button>
</form>
        </BaseCard>
      </Grid>
      </Grid>
      </FullLayout>
      </ThemeProvider>
  )
}

export default AddSale