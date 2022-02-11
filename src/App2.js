//import area
import { useEffect, useState } from 'react';
import { Button, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = require('./config.json')


//rfc
function App2() {

//1. state/Hook variable
const [friend,setFriend] = useState({
    data:[]
});


//2.functions

useEffect(()=>{
    console.log('page loaded succesfully');

     //Api Call
  try {
      //return po = promise object
      fetch(`${config.dev_url}/api/friends`)
      .then((data)=>{
        console.log(data);
        return data.json()
      })

      .then((data)=>{
        console.log(data);
        setFriend(data);
        console.log(data.data);
        
        toast("I Hate You!");
      })

      .catch((err)=>{
        console.log(err);
        toast("error, !");
      })

    } catch (error) {
        console.error(error);
        toast("error!");
    } 
},[]);

//3.return statements
  return (
    <>
    
      <h1 className="text-center">Read Operations 2</h1>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
                friend.data.map(function(currentValue,index,arr){
                    console.log(arr);
                    return(
                        <tr key={index}>
                            <td>{arr[index].id}</td>
                            <td>{arr[index].attributes.Name}</td>
                            <td>{arr[index].attributes.surname}</td>
                            <td>
                                <Button variant="success">View</Button>&nbsp;
                                <Button variant="primary">Edit</Button>&nbsp;
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </Table>
    </>
  );
}

export default App2;
