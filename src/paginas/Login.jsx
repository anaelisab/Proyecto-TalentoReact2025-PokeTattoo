"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { usarAuth } from "../contexto/ContextoAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [datosLogin, setDatosLogin] = useState({ email: "", contraseña: "" });
  const [datosRegistro, setDatosRegistro] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [cargandoLogin, setCargandoLogin] = useState(false);
  const [cargandoRegistro, setCargandoRegistro] = useState(false);
  const [tabActiva, setTabActiva] = useState("login");

  const { iniciarSesion, registrarse } = usarAuth();
  const navegar = useNavigate();
  const ubicacion = useLocation();

  const desde = ubicacion.state?.desde?.pathname || "/";

  const manejarCambioLogin = (e) => {
    setDatosLogin({ ...datosLogin, [e.target.name]: e.target.value });
  };

  const manejarCambioRegistro = (e) => {
    setDatosRegistro({ ...datosRegistro, [e.target.name]: e.target.value });
  };

  const manejarEnvioLogin = async (e) => {
    e.preventDefault();
    setCargandoLogin(true);

    const resultado = await iniciarSesion(
      datosLogin.email,
      datosLogin.contraseña
    );

    if (resultado.exito) {
      toast.success("¡Bienvenido! Sesión iniciada correctamente");
      navegar(desde, { replace: true });
    } else {
      toast.error(resultado.mensaje);
    }

    setCargandoLogin(false);
  };

  const manejarEnvioRegistro = async (e) => {
    e.preventDefault();
    setCargandoRegistro(true);

    if (datosRegistro.contraseña !== datosRegistro.confirmarContraseña) {
      toast.error("Las contraseñas no coinciden");
      setCargandoRegistro(false);
      return;
    }

    if (datosRegistro.contraseña.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      setCargandoRegistro(false);
      return;
    }

    const resultado = await registrarse(
      datosRegistro.nombre,
      datosRegistro.email,
      datosRegistro.contraseña
    );

    if (resultado.exito) {
      toast.success("¡Cuenta creada! Bienvenido a PokéTattoo Studio");
      navegar(desde, { replace: true });
    } else {
      toast.error(resultado.mensaje);
    }

    setCargandoRegistro(false);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                Mi Cuenta
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              <Tabs
                activeKey={tabActiva}
                onSelect={(k) => setTabActiva(k)}
                className="mb-4"
              >
                <Tab eventKey="login" title="Iniciar Sesión">
                  <Form onSubmit={manejarEnvioLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={datosLogin.email}
                        onChange={manejarCambioLogin}
                        required
                        placeholder="tu@email.com"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="contraseña"
                        value={datosLogin.contraseña}
                        onChange={manejarCambioLogin}
                        required
                        placeholder="Tu contraseña"
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={cargandoLogin}
                      >
                        {cargandoLogin ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Iniciando sesión...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Iniciar Sesión
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>

                  <div className="mt-4 p-3 bg-light rounded">
                    <h6 className="fw-bold mb-2">
                      <i className="bi bi-info-circle me-2"></i>
                      Datos de prueba:
                    </h6>
                    <p className="mb-1">
                      <strong>Email:</strong> demo@poketattoo.com
                    </p>
                    <p className="mb-0">
                      <strong>Contraseña:</strong> cualquier contraseña
                    </p>
                  </div>
                </Tab>

                <Tab eventKey="registro" title="Crear Cuenta">
                  <Form onSubmit={manejarEnvioRegistro}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre completo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={datosRegistro.nombre}
                        onChange={manejarCambioRegistro}
                        required
                        placeholder="Tu nombre completo"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={datosRegistro.email}
                        onChange={manejarCambioRegistro}
                        required
                        placeholder="tu@email.com"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="contraseña"
                        value={datosRegistro.contraseña}
                        onChange={manejarCambioRegistro}
                        required
                        placeholder="Mínimo 6 caracteres"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirmar contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmarContraseña"
                        value={datosRegistro.confirmarContraseña}
                        onChange={manejarCambioRegistro}
                        required
                        placeholder="Repetir contraseña"
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        disabled={cargandoRegistro}
                      >
                        {cargandoRegistro ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Creando cuenta...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-plus me-2"></i>
                            Crear Cuenta
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>

              <div className="text-center mt-4">
                <Link to="/" className="text-muted">
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver al inicio
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
