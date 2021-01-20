import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";

export default function NavBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">KM</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Module">Module</Nav.Link>
                    <Nav.Link href="/Klassen">Klassen</Nav.Link>
                    <Nav.Link href="/Schulen">Schulen</Nav.Link>
                    <Nav.Link href="/Firmen">Firmen</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}