import React, {useState, useContext} from "react";
import UserInfoContext from '../context/userInfo.tsx'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

export default function NavBar(){
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwtToken"));
    const userInfoContext = useContext(UserInfoContext);
    // const [userAlias] = useState(localStorage.getItem("userAlias"));


    const userAlias = userInfoContext.localContext.userAlias;
    const submitLogout = e => {
        e.preventDefault();

        localStorage.setItem("jwtToken", "");
        localStorage.setItem("userAlias", "");
        localStorage.setItem("userId", "");
        setLoggedIn("");
        window.location.href="/";
        }



    if (userAlias && userAlias !== "Anonymous user") {
        return (

        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Voteam</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/topics">Dashboard</Nav.Link>
                <NavDropdown title={userAlias} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={submitLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }

    else if (userAlias === "Anonymous user"){
        return (
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Voteam</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/topics">Dashboard</Nav.Link>
                    <NavDropdown title="Anonymous user" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/users/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/users/register">Register</NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }

    else {
        return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Voteam</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/topics">Dashboard</Nav.Link>
                <Nav.Link href="/users/login">Login</Nav.Link>
                <Nav.Link href="/users/register">Register</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        )
    }
}