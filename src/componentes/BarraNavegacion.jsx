"use client";

import { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { usarCarrito } from "../contexto/ContextoCarrito";
import { usarAuth } from "../contexto/ContextoAuth";
import { toast } from "react-toastify";

const BarraNavegacion = () => {
  const { obtenerTotalElementos } = usarCarrito();
  const { usuario, cerrarSesion } = usarAuth();
  const [mostrarOffcanvas, setMostrarOffcanvas] = useState(false);
  const ubicacion = useLocation();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    toast.info("Sesión cerrada correctamente");
  };

  const cerrarOffcanvas = () => setMostrarOffcanvas(false);
  const abrirOffcanvas = () => setMostrarOffcanvas(true);

  // Cerrar offcanvas cuando se navega a una nueva página
  const manejarNavegacion = () => {
    cerrarOffcanvas();
  };

  return (
    <>
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

          {/* Botón hamburguesa personalizado para móvil */}
          <div className="d-lg-none d-flex align-items-center gap-3">
            {/* Carrito en móvil */}
            <Nav.Link
              as={Link}
              to="/carrito"
              className="position-relative p-2"
              onClick={manejarNavegacion}
            >
              <i
                className="bi bi-cart3 text-white"
                style={{ fontSize: "1.2rem" }}
              ></i>
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

            {/* Botón hamburguesa */}
            <button
              className="navbar-toggler border-0 p-1"
              type="button"
              onClick={abrirOffcanvas}
              aria-label="Toggle navigation"
            >
              <i
                className="bi bi-list text-white"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </button>
          </div>

          {/* Menú desktop */}
          <BootstrapNavbar.Collapse
            id="basic-navbar-nav"
            className="d-none d-lg-block"
          >
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={ubicacion.pathname === "/" ? "active" : ""}
              >
                <i className="bi bi-house me-1"></i>
                Inicio
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/catalogo"
                className={ubicacion.pathname === "/catalogo" ? "active" : ""}
              >
                <i className="bi bi-grid me-1"></i>
                Catálogo
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contacto"
                className={ubicacion.pathname === "/contacto" ? "active" : ""}
              >
                <i className="bi bi-envelope me-1"></i>
                Contacto
              </Nav.Link>

              {usuario && (
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className={ubicacion.pathname === "/admin" ? "active" : ""}
                >
                  <i className="bi bi-gear me-1"></i>
                  Admin
                </Nav.Link>
              )}

              {/* Carrito desktop */}
              <Nav.Link
                as={Link}
                to="/carrito"
                className="position-relative me-3"
              >
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

              {/* Usuario desktop */}
              {usuario ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-light"
                    id="dropdown-usuario"
                    className="border-0"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {usuario.nombre}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <small className="text-muted">{usuario.email}</small>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={manejarCerrarSesion}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-person me-1"></i>
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      {/* Offcanvas para móvil */}
      <Offcanvas
        show={mostrarOffcanvas}
        onHide={cerrarOffcanvas}
        placement="end"
        className="offcanvas-mobile"
      >
        <Offcanvas.Header closeButton className="bg-primary text-white">
          <Offcanvas.Title>
            <i className="bi bi-list me-2"></i>
            Menú
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link-mobile ${
                ubicacion.pathname === "/" ? "active" : ""
              }`}
              onClick={manejarNavegacion}
            >
              <i className="bi bi-house me-3"></i>
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/catalogo"
              className={`nav-link-mobile ${
                ubicacion.pathname === "/catalogo" ? "active" : ""
              }`}
              onClick={manejarNavegacion}
            >
              <i className="bi bi-grid me-3"></i>
              Catálogo
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              className={`nav-link-mobile ${
                ubicacion.pathname === "/contacto" ? "active" : ""
              }`}
              onClick={manejarNavegacion}
            >
              <i className="bi bi-envelope me-3"></i>
              Contacto
            </Nav.Link>

            {usuario && (
              <Nav.Link
                as={Link}
                to="/admin"
                className={`nav-link-mobile ${
                  ubicacion.pathname === "/admin" ? "active" : ""
                }`}
                onClick={manejarNavegacion}
              >
                <i className="bi bi-gear me-3"></i>
                Admin
              </Nav.Link>
            )}

            <hr className="my-3" />

            {usuario ? (
              <>
                <div className="px-3 py-2 bg-light">
                  <div className="d-flex align-items-center">
                    <i
                      className="bi bi-person-circle me-2 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <div>
                      <div className="fw-bold">{usuario.nombre}</div>
                      <small className="text-muted">{usuario.email}</small>
                    </div>
                  </div>
                </div>
                <Nav.Link
                  className="nav-link-mobile text-danger"
                  onClick={manejarCerrarSesion}
                >
                  <i className="bi bi-box-arrow-right me-3"></i>
                  Cerrar Sesión
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className={`nav-link-mobile ${
                  ubicacion.pathname === "/login" ? "active" : ""
                }`}
                onClick={manejarNavegacion}
              >
                <i className="bi bi-person me-3"></i>
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BarraNavegacion;
