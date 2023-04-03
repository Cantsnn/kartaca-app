import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from '../context/UserContext';
import axios from 'axios';

function AppNavBar() {
  const { user, getUserToken } = useUser()
  const signOutUrl = "http://localhost:5000/api/v1/auth/logout"

  async function signOut() {
    await axios.post(signOutUrl,
      { "access_token": getUserToken() },
      {
        headers: {
          'Access-Control-Allow-Origin': "*",
          'Content-Type': 'application/json'
        }
      })
      .then((data) => console.log(data))
      .catch((e) => console.log(e))
  }
  function removeStorageData() {
    signOut()
    localStorage.removeItem("access_token")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
  }
  return (
    <>
      <Navbar sticky="top" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Kartaca App</Navbar.Brand>
          <Nav className="me-auto">

            <Nav.Link href="/">Home</Nav.Link>
            {!getUserToken() ? <Nav> <Nav.Link href="signup">Sign Up</Nav.Link> <Nav.Link href="login">Login</Nav.Link> </Nav> : <Nav.Link onClick={removeStorageData} href='login' >Sign Out</Nav.Link>}

          </Nav>
        </Container>
      </Navbar>

      <br />

    </>
  );
}

export default AppNavBar;