"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ContenedorHero,
  TarjetaProducto,
  BotonPrimario,
} from "../componentes/EstilosPersonalizados";
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
      <Helmet>
        <title>
          PokéTattoo Studio - Tatuajes Pokémon Únicos en Buenos Aires
        </title>
        <meta
          name="description"
          content="Estudio de tatuajes especializado en diseños Pokémon. Calidad profesional, diseños únicos y atención personalizada en Buenos Aires. ¡Convertí a tu Pokémon favorito en arte permanente!"
        />
        <meta
          name="keywords"
          content="tatuajes pokemon, tattoo pokemon, diseños pokemon, tatuajes buenos aires, arte pokemon"
        />
        <meta name="author" content="PokéTattoo Studio" />
        <meta
          property="og:title"
          content="PokéTattoo Studio - Tatuajes Pokémon Únicos"
        />
        <meta
          property="og:description"
          content="Convertí a tu Pokémon favorito en una obra de arte permanente"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://poketattoo.com" />
        <link rel="canonical" href="https://poketattoo.com" />
      </Helmet>

      {/* Sección Hero con Styled Components */}
      <ContenedorHero role="banner" aria-label="Sección principal">
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
              <BotonPrimario
                as={Link}
                to="/catalogo"
                aria-label="Ver catálogo completo de diseños"
              >
                <i className="bi bi-grid me-2" aria-hidden="true"></i>
                Ver Catálogo
              </BotonPrimario>
            </Col>
            <Col lg={6} className="text-center">
              <div className="imagen-hero">
                <img
                  src="/images/hero-image.png"
                  alt="Diseños de tatuajes Pokémon profesionales"
                  className="img-fluid rounded-circle shadow-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400/667eea/ffffff?text=PokéTattoo";
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </ContenedorHero>

      {/* Sección de Servicios */}
      <section
        className="py-5 seccion-servicios"
        aria-labelledby="servicios-heading"
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 id="servicios-heading" className="display-5 fw-bold mb-4">
                Nuestros Servicios
              </h2>
              <p className="lead text-muted">
                Especializados en tatuajes de Pokémon con más de 10 años de
                experiencia. Cada diseño es único y personalizado según tus
                preferencias.
              </p>
            </Col>
          </Row>
          <Row className="g-4 mb-5">
            <Col md={6}>
              <Card
                className="h-100 text-center border-0 shadow-sm"
                role="article"
              >
                <Card.Body>
                  <div className="mb-3" aria-hidden="true">
                    <i
                      className="bi bi-palette2 text-primary"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <Card.Title as="h3">Diseños Personalizados</Card.Title>
                  <Card.Text>
                    Adaptamos cada Pokémon a tu estilo personal y preferencias
                    de tamaño y color.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card
                className="h-100 text-center border-0 shadow-sm"
                role="article"
              >
                <Card.Body>
                  <div className="mb-3" aria-hidden="true">
                    <i
                      className="bi bi-shield-check text-primary"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <Card.Title as="h3">Máxima Higiene</Card.Title>
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
              <Card
                className="card-invitacion shadow-lg text-white"
                role="complementary"
              >
                <Card.Body className="p-5">
                  <h3 className="mb-3">¿Tenés algo en mente?</h3>
                  <p className="lead mb-4">
                    Mandanos tu idea, consulta, o cualquier duda que tengas en
                    relación a los tatuajes. Estamos acá para ayudarte en todo
                    el proceso y hacer realidad tu tatuaje ideal.
                  </p>
                  <BotonPrimario
                    as={Link}
                    to="/contacto"
                    aria-label="Ir a página de contacto"
                  >
                    <i className="bi bi-chat-dots me-2" aria-hidden="true"></i>
                    Contactanos
                  </BotonPrimario>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección Pokémon Destacados */}
      <section
        className="py-5 seccion-pokemon-destacados"
        aria-labelledby="destacados-heading"
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 id="destacados-heading" className="display-5 fw-bold mb-4">
                Pokémones Destacados
              </h2>
              <p className="lead text-muted">
                Algunos de nuestros diseños más populares
              </p>
            </Col>
          </Row>
          {cargando ? (
            <div className="text-center" role="status" aria-live="polite">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando Pokémon...</p>
            </div>
          ) : (
            <Row className="g-4" role="list">
              {pokemonDestacados.map((pokemon) => (
                <Col md={6} lg={4} key={pokemon.id} role="listitem">
                  <TarjetaProducto as={Card} className="h-100 shadow-sm">
                    <Link
                      to={`/producto/${pokemon.id}`}
                      className="text-decoration-none text-dark"
                      aria-label={`Ver detalles de ${pokemon.name}`}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          pokemon.sprites.other["official-artwork"]
                            .front_default
                        }
                        style={{
                          height: "200px",
                          objectFit: "contain",
                          padding: "20px",
                        }}
                        alt={`Diseño de tatuaje de ${pokemon.name}`}
                        loading="lazy"
                      />
                      <Card.Body className="text-center">
                        <Card.Title className="text-capitalize">
                          #{pokemon.id.toString().padStart(3, "0")}{" "}
                          {pokemon.name}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Tipo:{" "}
                          {pokemon.types
                            .map((tipo) => tipo.type.name)
                            .join(", ")}
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </TarjetaProducto>
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
