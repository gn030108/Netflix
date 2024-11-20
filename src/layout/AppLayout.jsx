import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

//네비바
const AppLayout = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  //검색기능
  const searchByKeyword = (event) => {
    event.preventDefault();

    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary-dark"
        variant="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              style={{ width: "100px" }}
              alt="logo"
              src="https://blog.kakaocdn.net/dn/841wr/btqVyUSKkEb/okkPugbnfbAdGbsVZRBPAk/img.png"
              onClick={() => navigate("/")}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/movies")}>Movies</Nav.Link>
            </Nav>
            <Form
              className="d-flex"
              onSubmit={(event) => searchByKeyword(event)}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") searchByKeyword(event);
                }}
              />
              <Button variant="outline-danger dark">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
