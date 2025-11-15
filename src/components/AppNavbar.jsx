import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = ({ products, carts, setToken }) => {
  return (
    /* Navbar Container (เต็มความกว้าง, ขอบล่าง) */
    <Navbar variant="light" className="p-0 border-bottom px-5 bg-white">
      <div className="w-100 d-flex justify-content-center"> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ส่วนของ Links (จัดให้อยู่กึ่งกลาง) */}
          <Nav className="mx-auto my-2 nav-pills"> 
            {/* Link แต่ละหน้า */}
            <Nav.Link as={Link} to={"/home"} className="fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/calculator"} className="fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Calculator
            </Nav.Link>
            <Nav.Link as={Link} to={"/animation"} className="fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Animation
            </Nav.Link>
            <Nav.Link as={Link} to={"/components"} className="fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Components
            </Nav.Link>
            <Nav.Link as={Link} to={"/todos"} className="fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Todos
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"} className="fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Products ({products?.length || 0})
            </Nav.Link>
            {/* Link: Carts (มี Badge แสดงจำนวนสินค้าในตะกร้า) */}
            <Nav.Link as={Link} to={"/carts"} className="position-relative fw-semibold text-dark-subtle rounded-pill mx-1 px-3">
              Carts
              {/* Badge แสดงจำนวนสินค้าในตะกร้า (ถ้ามี) */}
              {carts?.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.65rem' }}>
                  {carts?.length < 10 ? carts.length : "9+"}
                  <span className="visually-hidden">unread messages</span>
                </span>
              )}
            </Nav.Link>
            <button className="btn btn-outline-danger fw-semibold rounded-pill mx-1 px-3" onClick={() => {setToken('')}}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;