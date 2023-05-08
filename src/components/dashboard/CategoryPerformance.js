import React,{useState,useEffect} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
 import './pag.css';
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
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import axios from "axios";

const CategoryPerformance = () => {
  const [Category, setCategories] = useState([]);
  const [loading, setLoading] =useState(false);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(4);
  const user=JSON.parse(localStorage.getItem('user-info'))
 
  useEffect(() => {
    const fetchPosts =async() =>{
      setLoading(true);
    const res =await axios.get('http://localhost:3001/api/getCategorie');
      setCategories(res.data);
      console.log(res.data);
      setLoading(false);}
      fetchPosts();
    }, []);
  const indexOfLastPost =currentPage *postsPerPage;
  const indexOfFirstPost =indexOfLastPost -postsPerPage;
  const currentPosts =Category.slice(indexOfFirstPost,indexOfLastPost);
  
  const deleteCategorie = (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      Axios.delete(`http://localhost:3001/api/deleteCategorie/${id}`);
      console.log(id);
      window.location.reload(); // Reload the page if the user clicked "Yes"
    }
    
   
  }
  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddCategory');
  };

  // function handleDelete = async (id) =>{
  //   try{
  //     await axios.delete
  //   }

  // }
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <BaseCard title="Category Perfomance">
     <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
     {
      user.role =='admin'?
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Category</Button>
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
                Description
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
          {currentPosts.map((cat) => (
            <TableRow key={cat.name}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {cat.name}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {cat.description}
                </Typography>
              </TableCell>
              
              {
                user.role =='admin'?
                <>
              <TableCell  >
              <Link to={`updateCategory/${cat.id}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              <button onClick={() => {deleteCategorie(cat.id)}}  style={{ border: 'none', background: 'none' }}  ><DeleteOutlineIcon/></button>
              </TableCell>
              </>
              :
              <>
              </>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <br/>
      <CustomPag postsPerPage={postsPerPage} totalPosts={Category.length} paginate={paginate}/> */}
   <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(Category.length / postsPerPage)}
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

export default CategoryPerformance;