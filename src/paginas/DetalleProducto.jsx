"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { usarCarrito } from "../contexto/ContextoCarrito";
import SeccionCuidados from "../componentes/SeccionCuidados";
import Footer from "../componentes/Footer";

const DetalleProducto = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { agregarAlCarrito, calcularPrecio } = usarCarrito();

  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [opciones, setOpciones] = useState({
    tamaño: "5cm",
    color: "blanco&negro",
    ubicacion: "brazo",
  });

  useEffect(() => {
    const obtenerPokemon = async () => {
      try {
        const respuesta = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (!respuesta.ok) {
          throw new Error("Pokémon no encontrado");
        }
        const datos = await respuesta.json();
        setPokemon(datos);
      } catch (error) {
        console.error("Error obteniendo Pokémon:", error);
        navegar("/catalogo");
      } finally {
        setCargando(false);
      }
    };

    obtenerPokemon();
  }, [id, navegar]);

  const manejarAgregarAlCarrito = () => {
    if (pokemon) {
      agregarAlCarrito(pokemon, opciones);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
    }
  };

  const manejarCambioOpcion = (tipoOpcion, valor) => {
    setOpciones((prev) => ({
      ...prev,
      [tipoOpcion]: valor,
    }));
  };

  if (cargando) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" size="lg" />
          <h3 className="mt-3">Cargando detalles del Pokémon...</h3>
        </div>
      </Container>
    );
  }

  if (!pokemon) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3>Pokémon no encontrado</h3>
          <Button variant="primary" onClick={() => navegar("/catalogo")}>
            Volver al Pokédex
          </Button>
        </div>
      </Container>
    );
  }

  const precioActual = calcularPrecio(opciones);

  return (
    <>
      <Container className="py-5">
        {mostrarAlerta && (
          <Alert variant="success" className="text-center alerta-agregado">
            <div className="d-flex align-items-center justify-content-center">
              <i
                className="bi bi-check-circle-fill me-2"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <div>
                <strong>¡{pokemon.name} agregado al carrito!</strong>
                <div className="small">
                  Ya podés seguir explorando o ir al carrito para finalizar tu
                  compra.
                </div>
              </div>
            </div>
          </Alert>
        )}

        <Row>
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-lg">
              <Card.Img
                variant="top"
                src={pokemon.sprites.other["official-artwork"].front_default}
                style={{
                  height: "400px",
                  objectFit: "contain",
                  padding: "40px",
                }}
                alt={pokemon.name}
              />
            </Card>
          </Col>

          <Col lg={6}>
            <div className="contenido-opciones">
              <h1 className="display-5 fw-bold text-capitalize mb-3">
                #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
              </h1>

              <div className="mb-4">
                {pokemon.types.map((tipo) => (
                  <Badge
                    key={tipo.type.name}
                    bg="secondary"
                    className="me-2 p-2"
                  >
                    {tipo.type.name}
                  </Badge>
                ))}
              </div>

              <Card className="mb-4">
                <Card.Body>
                  <h5>Características del Pokémon:</h5>
                  <Row>
                    <Col sm={6}>
                      <p>
                        <strong>Altura:</strong> {pokemon.height / 10} m
                      </p>
                      <p>
                        <strong>Peso:</strong> {pokemon.weight / 10} kg
                      </p>
                    </Col>
                    <Col sm={6}>
                      <p>
                        <strong>Experiencia base:</strong>{" "}
                        {pokemon.base_experience}
                      </p>
                      <p>
                        <strong>Habilidades:</strong>
                      </p>
                      <ul className="list-unstyled">
                        {pokemon.abilities.slice(0, 2).map((habilidad) => (
                          <li
                            key={habilidad.ability.name}
                            className="text-capitalize"
                          >
                            • {habilidad.ability.name}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-4">Personalizá tu tatuaje:</h5>

                  {/* Tamaño */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Tamaño:</strong>
                    </Form.Label>
                    <div>
                      {["5cm", "10cm", "15cm"].map((tamaño) => (
                        <Form.Check
                          key={tamaño}
                          type="radio"
                          id={`tamaño-${tamaño}`}
                          name="tamaño"
                          label={`${tamaño} (+$${
                            tamaño === "5cm"
                              ? "5.000"
                              : tamaño === "10cm"
                              ? "10.000"
                              : "15.000"
                          })`}
                          checked={opciones.tamaño === tamaño}
                          onChange={() => manejarCambioOpcion("tamaño", tamaño)}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Color */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Color:</strong>
                    </Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        id="color-bn"
                        name="color"
                        label="Blanco y Negro (+$0)"
                        checked={opciones.color === "blanco&negro"}
                        onChange={() =>
                          manejarCambioOpcion("color", "blanco&negro")
                        }
                        className="mb-2"
                      />
                      <Form.Check
                        type="radio"
                        id="color-color"
                        name="color"
                        label="A Color (+$5.000)"
                        checked={opciones.color === "color"}
                        onChange={() => manejarCambioOpcion("color", "color")}
                        className="mb-2"
                      />
                    </div>
                  </Form.Group>

                  {/* Ubicación */}
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <strong>Ubicación aproximada:</strong>
                    </Form.Label>
                    <Form.Select
                      value={opciones.ubicacion}
                      onChange={(e) =>
                        manejarCambioOpcion("ubicacion", e.target.value)
                      }
                    >
                      <option value="brazo">Brazo</option>
                      <option value="pierna">Pierna</option>
                      <option value="pecho">Pecho</option>
                      <option value="espalda">Espalda</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-primary fw-bold mb-0">
                      ${precioActual.toLocaleString()}
                    </h3>
                    <small className="text-muted">Precio final</small>
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={manejarAgregarAlCarrito}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar al Carrito
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => navegar("/catalogo")}
                    >
                      Volver a la Pokédex
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <Card className="bg-light">
                <Card.Body>
                  <h6 className="fw-bold">💡 Información importante:</h6>
                  <ul className="list-unstyled mb-0 small">
                    <li>• El precio es un valor aproximado</li>
                    <li>• De necesitar un retoque al mes, éste es gratis</li>
                    <li>• Consulta y diseños personalizados son gratuitos</li>
                    <li>• Se agenda sesión con una seña del 20% del total</li>
                    <li>
                      • El precio incluye múltiples pruebas del diseño
                      personalizado
                    </li>
                  </ul>
                </Card.Body>
              </Card>
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
};

export default DetalleProducto;
