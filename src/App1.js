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
  data:[] 
});

const [paginationItem,setPaginationItem] = useState([]);

//2.functions
let hendleDelete =(e)=>{
    //console.log(e);
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    var delId = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
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
        let po = await axios();
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
let goToPage =(e)=>{
  console.log('page Generate');
  console.log(e.target.innerHTML);

  var pageno = parseInt(e.target.innerHTML);
  getFriend(pageno);      
}
let first =(e)=>{
  console.log('First');
  if(friend.meta.pagination.page !== 1){
    getFriend(1);
  }
}
let prev =(e)=>{
  console.log('Prev');
  if(friend.meta.pagination.page !== 1){
    getFriend(friend.meta.pagination.page - 1);
  }
}
let next =(e)=>{
  console.log('Next');
  if(friend.meta.pagination.page !== friend.meta.pagination.pageCount){
    getFriend(friend.meta.pagination.page + 1);
  }
}
let last =(e)=>{
  console.log('Last');
  if(friend.meta.pagination.page !== friend.meta.pagination.pageCount){
    getFriend(friend.meta.pagination.pageCount);
  }
}

let getFriend = (pageno = 1) => {
  console.log('Click button press');

  //Api Call
  try {
      //return po = promise object
      fetch(`${config.dev_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
      .then((data)=>{
        console.log(data);
        return data.json()
      })

      .then((data)=>{
        console.log(data);
        setFriend(data);
        console.log(data.data);

        var j = data.meta.pagination.page;
        var arr = [];
        for (let i = 1; i<=data.meta.pagination.pageCount; i++) {
          if(i == j){
            arr.push(<Pagination.Item active onClick={(e)=>{goToPage(e)}}>{i}</Pagination.Item>);
          }else{
            arr.push(<Pagination.Item onClick={(e)=>{goToPage(e)}}>{i}</Pagination.Item>);
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
          <Pagination.First onClick={(e)=>{first(e)}} />
          <Pagination.Prev onClick={(e)=>{prev(e)}} />
         {
            paginationItem.map(function(currentValue,index,arr){
              return (
                <React.Fragment key={index}>
                  currentValue;
                </React.Fragment>
              )
            })   
          }
          <Pagination.Next onClick={(e)=>{next(e)}} />
          <Pagination.Last onClick={(e)=>{last(e)}} />
        </Pagination>
      </>
      }
      
    </>
  );
}

export default App;
