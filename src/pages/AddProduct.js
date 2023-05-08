import React,{useState,useEffect} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import {
    Grid,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';

const AddProduct = () => {
  const [Category, setCategories] = useState([]);
  const [Prods, setProds] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getCategorie').then((response) => {
      
      setCategories(response.data);
      console.log(response.data);

    });
    Axios.get('http://localhost:3001/api/getProduct').then((response) => {
      setProds(response.data);
      console.log(response.data);

    });
  }, []);
  const opt = Prods.map((p) => ({
    id: p.id,
    code: p.code,
    name: p.name,
  }));

  const options = Category.map((category) => ({
    id: category.id,
    name: category.name,
  }));
 
    const [name ,setName]=useState('');
    const [Qstock , setQstock]=useState('');
    const [state , setState] =useState('available');
    const [prix ,setPrix] =useState('');
    const [value, setValue] = useState('');
    const [category ,setCategory] =useState('');
    const [code ,setCode] =useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleNameChange =(event) => {
        setName(event.target.value);
    };
    const handleQuantityChange =(event) => {
      setQstock(event.target.value);
  };
  const handleStateChange =(event) => {
    setState(event.target.value);
};
const handlePriceChange =(event) => {
  setPrix(event.target.value);
};
const handleCategoryChange =(event) => {
  setCategory(event.target.value);
};
const handleCodeChange =(event) => {
  setCode(event.target.value);
};

const validateForm = () => {
  let isValid = true;
  let errors = {};

  if (!code) {
    errors.code = "Product code is required";
    isValid = false;
  }
  if (!name) {
    errors.name = "Product name is required";
    isValid = false;
  }
  if (opt.find((p) => p.name.toLowerCase() === name.toLowerCase())) {
    errors.name = "Product name already exists";
    console.log(errors.name);
    isValid = false;
  }
  if (opt.find((p) => p.code === code)) {
    errors.code = "Product code already exists";
    console.log(errors.code);
    isValid = false;
  }
  if (!Qstock) {
    errors.Qstock = "Stock quantity is required";
    isValid = false;
  } else if (Qstock < 0) {
    errors.Qstock = "Stock quantity must be a positive number";
    isValid = false;
  }

  if (!prix) {
    errors.prix = "Product price is required";
    isValid = false;
  } else if (prix < 0) {
    errors.prix = "Product price must be a positive number";
    isValid = false;
  }

  if (!category) {
    errors.category = "Category is required";
    isValid = false;
  }
  setErrors(errors);
  return isValid;
};


const Add = (event) => {
  event.preventDefault();

  if (validateForm()) {
    Axios.post("http://localhost:3001/api/insertProduct", data)
      .then((response) => {
        console.log(response);
        setState('available')
        navigate("/Product");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const handleClearForm = () => {
  navigate('/Product')
};
   

    const data={
        name: name,
        Qstock:Qstock,
        state:state,
        prix:prix,
        category:category,
        code:code

    };
   

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Add Product">
        <form onSubmit={Add}>
          <Stack spacing={1} sx={{ marginTop: '-50px', paddingTop: '10px' }} >
          <TextField
          id="code"
          label="Product Code "
          variant="outlined"
          value={code}
          onChange={handleCodeChange}
          error={!!errors.code}
          helperText={errors.code}
          sx={{ width: "60%" }}
          onFocus={() => setErrors({ ...errors, code: '' })}
        />
                  <TextField
          id="name"
          label="Product Name "
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ width: "60%" }}
          onFocus={() => setErrors({ ...errors, name: '' })}
        />
            <TextField
              id="quantity"
              label="Stock quantity "
              variant="outlined"
              
              value={Qstock}
              type="number"
              error={!!errors.Qstock}
              helperText={errors.Qstock}
              onChange={handleQuantityChange}
              sx={{ width: "60%" }}
              onFocus={() => setErrors({ ...errors, Qstock: '' })}
            />
              
              <TextField
              id="price"
              label="Product Price "
              variant="outlined"
             
              value={prix}
              type='number'
              
              onChange={handlePriceChange}
              sx={{ width: '60%' }}  
              error={!!errors.prix}
              helperText={errors.prix}
              onFocus={() => setErrors({ ...errors, prix: '' })}
            />

<Autocomplete
  options={options}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select a category"
      variant="outlined"
      error={!!errors.category}
      helperText={errors.category}
       
    />
  )}
  onChange={(event, newValue) => {
    setCategory(newValue ? newValue.id : "");
  }}
  sx={{ width: "60%" }}
  onFocus={() => setErrors({ ...errors, category: '' })}
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

export default AddProduct