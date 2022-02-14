//import area
import './App.css';
import { Button,  Table } from 'react-bootstrap';
import {  useState } from 'react';
const config = require ('./config.json')
function App() {
  //1. state/hook variable
  const [data, setData] = useState({
    data:[]
  });


  //2.functions
  let getData = (page=5)=>{
    try {
      fetch(`${config.dev_url}/api/friends?pagination[start]=0&pagination[limit]=${page}`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        console.log(data.data);

        setData(data)
        console.log(data)

      })
      .catch()

    } catch (error) {
      console.log(error);  
    }
  }
  let lodeMore = ()=>{
      if(data.meta.pagination.limit < data.meta.pagination.total ){
        getData(data.meta.pagination.limit+8)
      } 
  }

  //3. return statement
  return (
        <>
            <h1 className="d-flex justify-content-center">Read opration </h1>
            <Button className="d-flex justify-content-center" variant="primary" onClick={()=>{getData()}}>Get My Friends</Button>
            {
                data.data.length > 0 &&
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.data.map((currentValue,index,arr)=>{
                                // console.log(arr);
                                
                                return(
                                        <tr key={currentValue.id}>
                                            <td>{arr[index].id}</td>
                                            <td>{arr[index].attributes.Name}</td>
                                            <td>{arr[index].attributes.Email}</td>
                                            <td>
                                                <Button variant="success">View</Button>{' '}
                                                <Button variant="primary">Edit</Button>{' '}
                                                <Button variant="danger">Delete</Button>
                                            </td> 
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    
                    <Button variant="outline-success" className="mb-5" onClick={() => {lodeMore()}}>Load More</Button>

                    
                </>
            }    
        </>   
  );
}

export default App;