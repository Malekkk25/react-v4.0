import React,{useState,useEffect} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
} from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/

const ProductsPerformance = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] =useState(false);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(4);
  const [name ,setName]=useState('');
  const [Qstock , setQstock]=useState('');
  const [state , setState] =useState('available');
  const [prix ,setPrix] =useState('');
  const [marque, setMarque] = useState('a');
  const [value, setValue] = useState('');
  const [category ,setCategory] =useState('');
  const [errors, setErrors] = useState({});
  const user=JSON.parse(localStorage.getItem('user-info'))
   useEffect(() => {
    Axios.get('http://localhost:3001/api/getProduct').then((response) => {
      setProducts(response.data);
      console.log(response.data);
     });
    Axios.get('http://localhost:3001/api/getCategorie').then((response) => {
    setCategories(response.data);
      console.log(response.data);
   });
   axios.get(`http://localhost:3001/api/getProduct/${id}`)
      .then(response => {
        const { name, Qstock,state,prix,category,marque } = response.data;
        setName(name);
        setQstock(Qstock);
        setState(state);
        setPrix(prix);
        setCategory(category);
        setMarque(marque);
  
        
      })
      .catch(error => console.log(error));
   }, [id]);

  const indexOfLastPost =currentPage *postsPerPage;
  const indexOfFirstPost =indexOfLastPost -postsPerPage;
  const currentPosts =products.slice(indexOfFirstPost,indexOfLastPost);

  

  // const testProduct = (id) => {
  //   // Axios.put(`http://localhost:3001/api/updateState/${id}`);
  //   // alert("Are you sure");
  //   // console.log(id);
    
  // }

  const testProduct = (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      Axios.put(`http://localhost:3001/api/updateState/${id}`);
      console.log(id);
      window.location.reload(); // Reload the page if the user clicked "Yes"
    }
  };

  const test = (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      Axios.put(`http://localhost:3001/api/updateStateA/${id}`);
      console.log(id);
      window.location.reload(); // Reload the page if the user clicked "Yes"
    }
  };

  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddProduct');
  };
  const handleDelete = (id) => {
    window.location.reload();
  };
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <BaseCard title="Products Perfomance">
    
      
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
      {
      user.role =='admin'?
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Product</Button>
        :<></>  
      }
      </div>
      <Table
        aria-label="simple table"
        sx={{
          mt: -5,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Id
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Code
              </Typography>
              </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Name
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Category
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Price
              </Typography>
            </TableCell>
            
            <TableCell>
              <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Stock Quantity
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        textAlign:"center"
                        
                      }}
                    >
                State
              </Typography>
            </TableCell>
           
            
            {
                user.role =='admin'?
                <>
                <TableCell >
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Update
              </Typography>
            </TableCell>
            <TableCell align="right">
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Delete
              </Typography>
            </TableCell>
            </>
            :
            <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          
          {currentPosts.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <Typography
                color="textSecondary"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>
              <TableCell>
              <Typography variant="h6" >{product.code}</Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    <img  src='../../assets/users/1.jpg' />
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                     
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                {categories.find(cat => cat.id === product.category)?.name}
                </Typography>
              </TableCell>
              
                           <TableCell>
              <Typography variant="h6" color="textSecondary">{product.prix} Dinars </Typography>
              </TableCell>

              <TableCell>
              <Typography variant="h6" textAlign="center" color="textSecondary">{product.Qstock}</Typography>
              </TableCell>
              <TableCell>
              {product.state === 'unavailable'?
              <button onClick={() => {test(product.id)}} style={{ border: 'none', background: 'none' }}>
                <Chip
                 sx={product.state === 'available' ? {pl: "4px",
                  pr: "4px",
                  backgroundColor: "green",
                  color: "#fff",}:
                  {pl: "4px",
                  pr: "4px",
                   backgroundColor: "#E46A76",
                   color: "#fff",}
                }
                  label={product.state}
                 ></Chip>
                 </button>:
                 <Chip
                 sx={product.state === 'available' ? {pl: "4px",
                  pr: "4px",
                  backgroundColor: "green",
                  color: "#fff",}:
                  {pl: "4px",
                  pr: "4px",
                   backgroundColor: "#E46A76",
                   color: "#fff",}
                }
                  label={product.state}
                 ></Chip>}
               </TableCell>
               {
      user.role =='admin' && product.state === 'available'?
      <>
      
              <TableCell  >
              <Link to={`updateProduct/${product.id}`}><ModeEditIcon/></Link>
              </TableCell>
              
              <TableCell align="right" >
              <button onClick={() => {testProduct(product.id)}} /*onClick={handleDelete(user.id)}*/ style={{ border: 'none', background: 'none' }} ><DeleteOutlineIcon/></button>
              </TableCell>
              </>
              :<></>  
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(products.length / postsPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
               />
    </BaseCard>
  );
};

export default ProductsPerformance;