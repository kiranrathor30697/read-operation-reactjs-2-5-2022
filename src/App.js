//import area
import { Button, Table} from 'react-bootstrap'

//rfc
function App() {
//1. state/Hook variable

let getFriend = (e) => {
  console.log('Click button press');

  //Api Call
  try {
      //return po = promise object
      fetch('http://localhost:1337/api/friends')
      .then((data)=>{
        console.log(data)
      })
      .then(()=>{

      })
      .catch((err)=>{
        console.log(err)
      })

    } catch (error) {
        console.error(error)
    }
      

}

//2.functions

//3.return statements
  return (
    <>
      <h1 className="text-center">Read Operations</h1>
      <Button className="text-center mb-5" onClick={(e)=>{getFriend(e)}} variant="outline-success">Get My Friends</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default App;
