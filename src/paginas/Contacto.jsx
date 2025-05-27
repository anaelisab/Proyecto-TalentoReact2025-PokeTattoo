"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import SeccionCuidados from "../componentes/SeccionCuidados";
import Footer from "../componentes/Footer";

const Contacto = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviando(true);

    // Simular envío del formulario
    setTimeout(() => {
      setMostrarAlerta(true);
      setEnviando(false);
      setDatosFormulario({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });

      // Ocultar alerta después de 5 segundos
      setTimeout(() => setMostrarAlerta(false), 5000);
    }, 1000);
  };

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center mb-5">
            <h1 className="display-4 fw-bold mb-4">Contacto</h1>
            <p className="lead text-muted">
              ¿Tenés alguna consulta? Estamos acá para ayudarte con tu próximo
              tatuaje Pokémon
            </p>
          </Col>
        </Row>

        {mostrarAlerta && (
          <Alert variant="success" className="text-center mb-4">
            <h5>¡Mensaje enviado correctamente! ✅</h5>
            <p className="mb-0">
              Te responderemos a la brevedad. ¡Gracias por contactarnos!
            </p>
          </Alert>
        )}

        <Row>
          <Col lg={8}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <h3 className="mb-4">Envianos tu consulta</h3>
                <Form onSubmit={manejarEnvio}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre completo *</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={datosFormulario.nombre}
                          onChange={manejarCambio}
                          required
                          placeholder="Tu nombre"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={datosFormulario.email}
                          onChange={manejarCambio}
                          required
                          placeholder="tu@email.com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={datosFormulario.telefono}
                          onChange={manejarCambio}
                          placeholder="+54 11 1234-5678"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Asunto *</Form.Label>
                        <Form.Select
                          name="asunto"
                          value={datosFormulario.asunto}
                          onChange={manejarCambio}
                          required
                        >
                          <option value="">Seleccioná un asunto</option>
                          <option value="consulta-general">
                            Consulta general
                          </option>
                          <option value="presupuesto">
                            Solicitar presupuesto
                          </option>
                          <option value="cuidados">
                            Cuidados post-tatuaje
                          </option>
                          <option value="cita">Agendar cita</option>
                          <option value="otro">Otro</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Mensaje *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="mensaje"
                      value={datosFormulario.mensaje}
                      onChange={manejarCambio}
                      required
                      placeholder="Contanos sobre tu idea de tatuaje, dudas o consultas..."
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={enviando}
                    >
                      {enviando ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-lg border-0 mb-4">
              <Card.Body className="p-4">
                <h4 className="mb-4">Información de Contacto</h4>

                <div className="mb-3">
                  <h6 className="fw-bold">📍 Dirección</h6>
                  <p className="text-muted mb-0">
                    Dirección falsa 123
                    <br />
                    Buenos Aires, Argentina
                    <br />
                    C1043AAZ
                  </p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold">📱 Teléfono</h6>
                  <p className="text-muted mb-0">+54 221 234-5678</p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold">📧 Email</h6>
                  <p className="text-muted mb-0">info@poketattoo.com</p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold">📷 Instagram</h6>
                  <p className="text-muted mb-0">@poketattoo_studio</p>
                </div>

                <hr />

                <div>
                  <h6 className="fw-bold">🕒 Horarios de Atención</h6>
                  <p className="text-muted small mb-1">
                    Lunes a Viernes: 10:00 - 20:00
                  </p>
                  <p className="text-muted small mb-1">
                    Sábados: 10:00 - 18:00
                  </p>
                  <p className="text-muted small mb-0">Domingos: Cerrado</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Componente de Cuidados */}
      <SeccionCuidados />

      {/* Componente Footer */}
      <Footer />
    </>
  );
};

export default Contacto;
