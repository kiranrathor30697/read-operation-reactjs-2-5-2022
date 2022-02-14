//import area
import React, { useState } from 'react';
import { Button, Pagination, Table} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const axios = require('axios');
const config = require ('./config.json');

//rfc
function App1() {
//1. state/Hook variable
const [friend,setFriend] = useState({
  data:[] 
});

const [paginationItem,setPaginationItem] = useState([]);

//2.functions
let hendleDelete =(e)=>{
    //console.log(e);
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    console.log(delid);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {

      //API Call 
      try {
        let po = await axios.delete(`${config.dev_url}/api/friends/:id`)
        
      } catch (error) {
        console.log(error)
      }
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",

        });
      } else {
        //swal("Your imaginary file is safe!");
      }
    });
}  
let loadMore =(e)=>{
  console.log(e)
}

let goToPage =(e)=>{
  console.log('page Generate');
   console.log(e.target.innerHTML);

   var pageno = parseInt(e.target.innerHTML); 
  getFriend(pageno);       
}


let getFriend = (pageno = 1) => {
  console.log('Click button press');

  //Api Call
  try {
      //return po = promise object
      fetch(`${config.dev_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=5`)
      .then((data)=>{
        console.log(data);
        return data.json()
      })

      .then((data)=>{
        console.log(data);
        setFriend(data);
        console.log(data.data);

        var j = data.meta.pagination.pageno;
        var arr = [];
        for (let i = 1; i<=data.meta.pagination.pageSize; i++) {
           if(i == j){ 
            /* arr.push(<Button className="mb-5" onClick={(e)=>{goToPage(e)}} variant="outline-success">Load More</Button>) */
            arr.push(<Pagination.Item active onClick={(e)=>{goToPage(e)}}>Load More</Pagination.Item>);
           } 
        }
          setPaginationItem(arr);
        /* toast("I Hate You!"); */
      })

      .catch((err)=>{
        console.log(err);
        toast("error, !");
      })

    } catch (error) {
        console.error(error);
        toast("error!");
    }
}

//3.return statements
  return (
    <>
      <h1 className="text-center">Read Operations</h1>
      <Button className="justify-content-center mb-5" onClick={(e)=>{getFriend()}} variant="outline-success">Get My Friends</Button>
      {
        friend.data.length > 0 && 
        <>
            <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Friend Name</th>
              <th>Surname</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
          {
            friend.data.map(function(currentValue,i,arr){
              //console.log(arr);
              /* console.log(arr[i].id);
              console.log(arr[i].attributes.surname); 
              console.log(arr[i].attributes.Name);*/
              
              return(
                  <tr key={i} >
                    <td>{arr[i].id}</td>
                    <td>{arr[i].attributes.Name}</td>
                    <td>{arr[i].attributes.surname}</td>
                    <td>
                      <Button variant="success">View</Button>{' '}
                      <Button variant="primary">Edit</Button>{' '}
                      <Button variant="danger" onClick={(e)=>{hendleDelete(e);}}>Delete</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody> 
        </Table>
          <Pagination className="d-flex justify-content-center">
            {
              paginationItem.map(function(currentValue,index,arr){
                return (
                  <React.Fragment key={index}>
                    {currentValue}
                  </React.Fragment>
                )
              })   
            }
        </Pagination>
      </>
      }
      
    </>
  );
}

export default App1;
