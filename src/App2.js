//import area
import React, { useState } from 'react';
import { Button, Pagination, Table} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const axios = require('axios');
const config = require ('./config.json');

//rfc
function App() {
//1. state/Hook variable
const [friend,setFriend] = useState({
  data:[],
  meta:{
    pagination:{
      page:'',
      pageCount:'',
      pageSize:'',
      total:''
    }
  } 
});

const [paginationItem,setPaginationItem] = useState([]);

//2.functions
let loadMore = ()=>{
  getFriend(friend.meta.pagination.page + 1);
}

let hendleDelete =(e)=>{
   
    var tr = e.target.closest('tr')
    //console.log(e);
    console.log(tr.querySelector('td:first-child').innerHTML);
    var delId = parseInt(tr.querySelector('td:first-child').innerHTML);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {

      if (willDelete) {

        //API Call 
      try {
        let po = await axios.delete(`${config.dev_url}/api/friends/${delId}`);

        tr.remove();
        swal("Good job!", "You clicked the button!", "success");
      } 
      catch (error) {
        console.log(error)
      }
        /* swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",

        }); */
      }
    });
}                       
let goToPage =(e)=>{
  console.log('page Generate');
  console.log(e.target.innerHTML);

  var pageno = parseInt(e.target.innerHTML);
  getFriend(pageno);      
  }

let getFriend = (pageno = 1) => {
  //console.log('Click button press');

  //Api Call
  try {
      //return po = promise object
      fetch(`${config.dev_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
      .then((data)=>{
        //console.log(data);
        return data.json()
      })

      .then((data)=>{
        //console.log(data);
        setFriend({
          ...friend,
          data:friend.data.concat(data.data),
          meta:data.meta


        });
        //console.log(data.data);
        //console.log(friend.meta.pagination.pageCount)

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
          {
            (friend.meta.pagination.page !== friend.meta.pagination.pageCount) &&
            <Button variant="outline-success" className="mb-5" onClick={() => {loadMore()}}>Load More</Button>
            
          }
            
        </>
        
      }
      
    </>
  );
}

export default App;
