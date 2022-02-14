import './App.css';
import { Button,  Table } from 'react-bootstrap';
import {  useState } from 'react';
const config = require ('./config.json')
function App() {
  //1. hooks for
  const [data, setData] = useState({
    data:[]
  });
  let getData = (page=5)=>{
    try {
      fetch(`${config.dev_url}/api/friends?pagination[start]=0&pagination[limit]=${page}`).then((res)=>{
        return res.json();
      }).then((data)=>{
        console.log(data.data);
        setData(data)
        console.log(data)
        if(data.meta.pagination.limit >= data.meta.pagination.total){
            var element = document.getElementById("a1");
            element.classList.add("my");
        }
      }).catch().finally()  
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
    <Button className="d-flex justify-content-center" variant="primary" onClick={()=>{getData()}}>get data</Button>
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
                        <Button variant="primary" >View</Button>&nbsp;{/* setModalShow(true,arr) */}
                        <Button variant="success">Edit</Button>&nbsp;
                        <Button variant="danger" >Delete</Button>&nbsp;
                  </td> 
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <div className="text-center" onClick={()=>{}}>
      <button id="a1" variant="danger" onClick={() => {lodeMore()}}>Load more</button>

      </div>
        </>
      }    
    </>   
  );
}

export default App;