"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SeccionCuidados from "../componentes/SeccionCuidados";
import Footer from "../componentes/Footer";

const Inicio = () => {
  const [pokemonDestacados, setPokemonDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPokemonDestacados = async () => {
      try {
        const idsDestacados = [25, 6, 150, 448, 94, 130]; // Pikachu, Charizard, Mewtwo, etc.
        const promesas = idsDestacados.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
            res.json()
          )
        );

        const resultados = await Promise.all(promesas);
        setPokemonDestacados(resultados);
      } catch (error) {
        console.error("Error obteniendo Pokémon destacados:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPokemonDestacados();
  }, []);

  return (
    <>
      {/* Sección Hero */}
      <section className="seccion-hero text-white py-5">
        <Container>
          <Row className="align-items-center h-100">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Tatuajes Pokémon Únicos
              </h1>
              <p className="lead mb-4">
                Convertí a tu Pokémon favorito en una obra de arte permanente.
                Diseños únicos, calidad profesional y atención personalizada.
              </p>
              <Button as={Link} to="/catalogo" variant="light" size="lg">
                Ver Catálogo
              </Button>
            </Col>
            <Col lg={6} className="text-center">
              <div className="imagen-hero">
                <img
                  src="https://via.placeholder.com/400x400/667eea/ffffff?text=PokéTattoo"
                  alt="Arte de Tatuajes Pokémon"
                  className="img-fluid rounded-circle shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección de Servicios */}
      <section className="py-5 seccion-servicios">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">Nuestros Servicios</h2>
              <p className="lead text-muted">
                Especializados en tatuajes de Pokémon con más de 10 años de
                experiencia. Cada diseño es único y personalizado según tus
                preferencias.
              </p>
            </Col>
          </Row>
          <Row className="g-4 mb-5">
            <Col md={6}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <i
                      className="bi bi-palette2 text-primary"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <Card.Title>Diseños Personalizados</Card.Title>
                  <Card.Text>
                    Adaptamos cada Pokémon a tu estilo personal y preferencias
                    de tamaño y color.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <i
                      className="bi bi-shield-check text-primary"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <Card.Title>Máxima Higiene</Card.Title>
                  <Card.Text>
                    Cumplimos con todos los protocolos de seguridad e higiene
                    para tu tranquilidad.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Invitación a agendar consulta */}
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <Card className="card-invitacion shadow-lg text-white">
                <Card.Body className="p-5">
                  <h3 className="mb-3">¿Tenés algo en mente?</h3>
                  <p className="lead mb-4">
                    Mandanos tu idea, consulta, o cualquier duda que tengas en
                    relación a los tatuajes. Estamos acá para ayudarte en todo
                    el proceso y hacer realidad tu tatuaje ideal.
                  </p>
                  <Button
                    as={Link}
                    to="/contacto"
                    variant="light"
                    size="lg"
                    className="fw-bold"
                  >
                    <i className="bi bi-chat-dots me-2"></i>
                    Escribinos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección Pokémon Destacados */}
      <section className="py-5 seccion-pokemon-destacados">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">Pokémones destacados</h2>
              <p className="lead text-muted">
                Algunos de los pokemones más populares
              </p>
            </Col>
          </Row>
          {cargando ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando Pokémon...</p>
            </div>
          ) : (
            <Row className="g-4">
              {pokemonDestacados.map((pokemon) => (
                <Col md={6} lg={4} key={pokemon.id}>
                  <Card
                    as={Link}
                    to={`/producto/${pokemon.id}`}
                    className="h-100 shadow-sm tarjeta-pokemon"
                  >
                    <Card.Img
                      variant="top"
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        padding: "20px",
                      }}
                    />
                    <Card.Body className="text-center">
                      <Card.Title className="text-capitalize">
                        #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        Tipo:{" "}
                        {pokemon.types.map((tipo) => tipo.type.name).join(", ")}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Componente de Cuidados */}
      <SeccionCuidados />

      {/* Componente Footer */}
      <Footer />
    </>
  );
};

export default Inicio;
