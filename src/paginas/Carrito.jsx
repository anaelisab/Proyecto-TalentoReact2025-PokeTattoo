"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Badge,
  Modal,
} from "react-bootstrap";
import { usarCarrito } from "../contexto/ContextoCarrito";
import { Link } from "react-router-dom";
import SeccionCuidados from "../componentes/SeccionCuidados";
import Footer from "../componentes/Footer";

const Carrito = () => {
  const {
    elementosCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    obtenerPrecioTotal,
    obtenerTotalElementos,
    vaciarCarrito,
  } = usarCarrito();

  const [comentario, setComentario] = useState("");
  const [mostrarModalCheckout, setMostrarModalCheckout] = useState(false);
  const [mostrarAlertaExito, setMostrarAlertaExito] = useState(false);

  const manejarCheckout = () => {
    setMostrarModalCheckout(true);
  };

  const manejarConfirmarCompra = () => {
    // Simular proceso de compra
    setMostrarModalCheckout(false);
    setMostrarAlertaExito(true);
    vaciarCarrito();
    setComentario("");

    // Ocultar alerta después de 5 segundos
    setTimeout(() => setMostrarAlertaExito(false), 5000);
  };

  if (elementosCarrito.length === 0 && !mostrarAlertaExito) {
    return (
      <>
        <Container className="py-5">
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="py-5">
                <div className="mb-4">
                  <i
                    className="bi bi-cart-x text-muted"
                    style={{ fontSize: "4rem" }}
                  ></i>
                </div>
                <h2 className="display-5 mb-4">Tu carrito está vacío</h2>
                <p className="lead text-muted mb-4">
                  ¡Explorá nuestra Pokédex y encontrá el Pokémon perfecto para
                  tu próximo tatuaje!
                </p>
                <Button as={Link} to="/catalogo" variant="primary" size="lg">
                  <i className="bi bi-search me-2"></i>
                  Ver Pokédex
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Componente de Cuidados */}
        <SeccionCuidados />

        {/* Componente Footer */}
        <Footer />
      </>
    );
  }

  return (
    <>
      <Container className="py-5">
        {mostrarAlertaExito && (
          <Alert variant="success" className="text-center mb-4 alerta-exito">
            <div className="d-flex align-items-center justify-content-center">
              <i
                className="bi bi-check-circle-fill me-3"
                style={{ fontSize: "2rem" }}
              ></i>
              <div>
                <h4 className="mb-1">¡Compra realizada con éxito! 🎉</h4>
                <p className="mb-0">
                  Te contactaremos pronto para coordinar tu cita. ¡Gracias por
                  elegirnos!
                </p>
              </div>
            </div>
          </Alert>
        )}

        <Row>
          <Col lg={8} className="mx-auto text-center mb-4">
            <h1 className="display-4 fw-bold mb-3">
              <i className="bi bi-cart3 me-3"></i>
              Carrito de Compras
            </h1>
            <p className="lead text-muted">
              Tenés {obtenerTotalElementos()}{" "}
              {obtenerTotalElementos() === 1 ? "producto" : "productos"} en tu
              carrito
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <div className="carrito-elementos">
              {elementosCarrito.map((elemento) => (
                <Card
                  key={elemento.id}
                  className="mb-3 shadow-sm tarjeta-carrito"
                >
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={2} className="text-center">
                        <img
                          src={
                            elemento.pokemon.sprites?.other?.[
                              "official-artwork"
                            ]?.front_default ||
                            elemento.pokemon.imagen ||
                            "https://via.placeholder.com/80x80"
                          }
                          alt={elemento.pokemon.name || elemento.pokemon.nombre}
                          className="img-fluid imagen-carrito"
                          style={{ maxHeight: "80px", maxWidth: "80px" }}
                        />
                      </Col>
                      <Col md={5}>
                        <h5 className="text-capitalize mb-2 fw-bold">
                          {elemento.pokemon.name
                            ? `#${elemento.pokemon.id
                                .toString()
                                .padStart(3, "0")} ${elemento.pokemon.name}`
                            : elemento.pokemon.nombre}
                        </h5>
                        <div className="mb-2">
                          {elemento.pokemon.types
                            ? elemento.pokemon.types.map((tipo) => (
                                <Badge
                                  key={tipo.type.name}
                                  bg="secondary"
                                  className="me-1 badge-tipo"
                                >
                                  {tipo.type.name}
                                </Badge>
                              ))
                            : null}
                        </div>
                        <div className="opciones-producto">
                          <div className="row text-muted small">
                            <div className="col-4">
                              <strong>Tamaño:</strong>
                              <br />
                              <span className="badge bg-light text-dark">
                                {elemento.opciones.tamaño}
                              </span>
                            </div>
                            <div className="col-4">
                              <strong>Color:</strong>
                              <br />
                              <span className="badge bg-light text-dark">
                                {elemento.opciones.color}
                              </span>
                            </div>
                            <div className="col-4">
                              <strong>Ubicación:</strong>
                              <br />
                              <span className="badge bg-light text-dark">
                                {elemento.opciones.ubicacion}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={3} className="text-center">
                        <div className="precio-seccion mb-3">
                          <div className="precio-total fw-bold text-primary fs-5">
                            $
                            {(
                              elemento.precio * elemento.cantidad
                            ).toLocaleString()}
                          </div>
                          <div className="precio-unitario text-muted small">
                            ${elemento.precio.toLocaleString()} c/u
                          </div>
                        </div>

                        <div className="controles-cantidad d-flex align-items-center justify-content-center mb-3">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="boton-cantidad"
                            onClick={() =>
                              actualizarCantidad(
                                elemento.id,
                                elemento.cantidad - 1
                              )
                            }
                          >
                            <i className="bi bi-dash"></i>
                          </Button>
                          <span className="cantidad-display mx-3 fw-bold fs-5">
                            {elemento.cantidad}
                          </span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="boton-cantidad"
                            onClick={() =>
                              actualizarCantidad(
                                elemento.id,
                                elemento.cantidad + 1
                              )
                            }
                          >
                            <i className="bi bi-plus"></i>
                          </Button>
                        </div>
                      </Col>
                      <Col md={2} className="text-center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="boton-eliminar"
                          onClick={() => eliminarDelCarrito(elemento.id)}
                          title="Eliminar del carrito"
                        >
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            <Card
              className="shadow-lg border-0 tarjeta-resumen sticky-top"
              style={{ top: "120px" }}
            >
              <Card.Header className="bg-primary text-white text-center">
                <h4 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Resumen del Pedido
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="resumen-precios">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span className="fw-bold">
                      ${obtenerPrecioTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Consulta inicial:</span>
                    <span className="text-success fw-bold">Gratis</span>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between mb-4 total-final">
                    <strong className="fs-5">Total:</strong>
                    <strong className="text-primary fs-4">
                      ${obtenerPrecioTotal().toLocaleString()}
                    </strong>
                  </div>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    <i className="bi bi-chat-text me-2"></i>
                    Comentarios adicionales:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Alguna preferencia especial, fecha tentativa, etc..."
                    className="comentarios-textarea"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={manejarCheckout}
                    className="boton-finalizar"
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Finalizar Compra
                  </Button>
                  <Button
                    as={Link}
                    to="/catalogo"
                    variant="outline-secondary"
                    className="boton-seguir"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Seguir Comprando
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-light rounded pasos-siguientes">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-list-check me-2"></i>
                    Próximos pasos:
                  </h6>
                  <ul className="list-unstyled mb-0 small">
                    <li className="mb-1">
                      <i className="bi bi-1-circle-fill text-primary me-2"></i>
                      Confirmación de tu pedido
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-2-circle-fill text-primary me-2"></i>
                      Diseñamos tu tatuaje
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-3-circle-fill text-primary me-2"></i>
                      Si te gusta señas el 20% del total
                    </li>
                    <li className="mb-1">
                      <i className="bi bi-4-circle-fill text-primary me-2"></i>
                      Agendamos el turno
                    </li>
                    <li className="mb-0">
                      <i className="bi bi-5-circle-fill text-primary me-2"></i>Y
                      listo, venis al local a tatuarte y divertirte!
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal de confirmación */}
        <Modal
          show={mostrarModalCheckout}
          onHide={() => setMostrarModalCheckout(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>
              <i className="bi bi-check-circle me-2"></i>
              Confirmar Compra
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <h5 className="mb-3">
              <i className="bi bi-list-ul me-2"></i>
              Resumen de tu pedido:
            </h5>
            <div className="resumen-modal">
              {elementosCarrito.map((elemento) => (
                <div
                  key={elemento.id}
                  className="elemento-resumen mb-3 p-3 bg-light rounded"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        elemento.pokemon.sprites?.other?.["official-artwork"]
                          ?.front_default ||
                        elemento.pokemon.imagen ||
                        "/placeholder.svg"
                      }
                      alt={elemento.pokemon.name || elemento.pokemon.nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                      className="me-3"
                    />
                    <div className="flex-grow-1">
                      <strong className="text-capitalize">
                        {elemento.pokemon.name || elemento.pokemon.nombre}
                      </strong>
                      <span className="text-muted"> x{elemento.cantidad}</span>
                      <div className="small text-muted">
                        {elemento.opciones.tamaño} • {elemento.opciones.color} •{" "}
                        {elemento.opciones.ubicacion}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">
                        $
                        {(elemento.precio * elemento.cantidad).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5">
              <strong>Total: ${obtenerPrecioTotal().toLocaleString()}</strong>
            </div>
            {comentario && (
              <div className="mt-3 p-3 bg-light rounded">
                <strong>
                  <i className="bi bi-chat-text me-2"></i>
                  Comentarios:
                </strong>
                <p className="text-muted small mb-0 mt-1">{comentario}</p>
              </div>
            )}
            <div className="mt-3 p-3 bg-info bg-opacity-10 rounded">
              <small className="text-info">
                <i className="bi bi-info-circle me-2"></i>
                Al confirmar, nos pondremos en contacto con vos para coordinar
                la consulta inicial gratuita y el proceso de diseño.
              </small>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarModalCheckout(false)}
            >
              <i className="bi bi-x-lg me-2"></i>
              Cancelar
            </Button>
            <Button variant="primary" onClick={manejarConfirmarCompra}>
              <i className="bi bi-check-lg me-2"></i>
              Confirmar Compra
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Componente de Cuidados */}
      <SeccionCuidados />

      {/* Componente Footer */}
      <Footer />
    </>
  );
};

export default Carrito;
