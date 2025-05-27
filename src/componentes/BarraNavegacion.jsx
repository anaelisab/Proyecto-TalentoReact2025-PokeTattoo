import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { usarCarrito } from "../contexto/ContextoCarrito";

const BarraNavegacion = () => {
  const { obtenerTotalElementos } = usarCarrito();

  return (
    <BootstrapNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow"
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          🎨 PokéTattoo Studio
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo">
              Catálogo
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="position-relative">
              <i className="bi bi-cart3" style={{ fontSize: "1.2rem" }}></i>
              {obtenerTotalElementos() > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {obtenerTotalElementos()}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default BarraNavegacion;
