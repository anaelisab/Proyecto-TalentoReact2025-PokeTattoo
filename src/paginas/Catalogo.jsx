"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import SeccionCuidados from "../componentes/SeccionCuidados";
import Footer from "../componentes/Footer";

const Catalogo = () => {
  const [pokemon, setPokemon] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);
  const pokemonPorPagina = 12;

  useEffect(() => {
    const obtenerPokemon = async () => {
      try {
        // Obtener lista de los primeros 151 Pokémon
        const respuesta = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const datos = await respuesta.json();

        // Obtener detalles de cada Pokémon
        const detallesPokemon = await Promise.all(
          datos.results.map(async (poke) => {
            const respuestaDetalle = await fetch(poke.url);
            return respuestaDetalle.json();
          })
        );

        setPokemon(detallesPokemon);
        setPokemonFiltrado(detallesPokemon);
      } catch (error) {
        console.error("Error obteniendo Pokémon:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPokemon();
  }, []);

  useEffect(() => {
    const filtrado = pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setPokemonFiltrado(filtrado);
    setPaginaActual(1);
  }, [terminoBusqueda, pokemon]);

  // Calcular Pokémon para la página actual
  const indiceFinalPokemon = paginaActual * pokemonPorPagina;
  const indiceInicialPokemon = indiceFinalPokemon - pokemonPorPagina;
  const pokemonActual = pokemonFiltrado.slice(
    indiceInicialPokemon,
    indiceFinalPokemon
  );
  const totalPaginas = Math.ceil(pokemonFiltrado.length / pokemonPorPagina);

  const manejarCambioPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cargando) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" size="lg" />
          <h3 className="mt-3">Cargando catálogo...</h3>
          <p className="text-muted">Esto puede tomar unos momentos</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center mb-5">
            <h1 className="display-4 fw-bold mb-4">Pokédex</h1>
            <p className="lead text-muted">
              Explorá y elige tu compañero Pokémon
            </p>
          </Col>
        </Row>

        {/* Barra de búsqueda */}
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar Pokémon..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
              <InputGroup.Text>🔍</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        {/* Resultados de búsqueda */}
        <Row className="mb-4">
          <Col>
            <p className="text-muted">
              Mostrando {pokemonActual.length} de {pokemonFiltrado.length}{" "}
              Pokémon
            </p>
          </Col>
        </Row>

        {/* Grid de Pokémon */}
        <Row className="g-4">
          {pokemonActual.map((poke) => (
            <Col md={6} lg={4} xl={3} key={poke.id}>
              <Card className="h-100 shadow-sm tarjeta-pokemon">
                <Card.Img
                  variant="top"
                  src={poke.sprites.other["official-artwork"].front_default}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "20px",
                  }}
                  alt={poke.name}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-capitalize text-center">
                    #{poke.id.toString().padStart(3, "0")} {poke.name}
                  </Card.Title>
                  <Card.Text className="text-center text-muted mb-3">
                    {poke.types.map((tipo) => (
                      <span
                        key={tipo.type.name}
                        className="badge bg-secondary me-1"
                      >
                        {tipo.type.name}
                      </span>
                    ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <Button
                      as={Link}
                      to={`/producto/${poke.id}`}
                      variant="primary"
                      className="w-100"
                    >
                      <i className="bi bi-eye me-2"></i>
                      Ver Más
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <Row className="mt-5">
            <Col>
              <nav aria-label="Navegación del catálogo">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      paginaActual === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => manejarCambioPagina(paginaActual - 1)}
                      disabled={paginaActual === 1}
                    >
                      Anterior
                    </button>
                  </li>

                  {[...Array(totalPaginas)].map((_, index) => {
                    const numeroPagina = index + 1;
                    // Mostrar solo algunas páginas alrededor de la actual
                    if (
                      numeroPagina === 1 ||
                      numeroPagina === totalPaginas ||
                      (numeroPagina >= paginaActual - 2 &&
                        numeroPagina <= paginaActual + 2)
                    ) {
                      return (
                        <li
                          key={numeroPagina}
                          className={`page-item ${
                            paginaActual === numeroPagina ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => manejarCambioPagina(numeroPagina)}
                          >
                            {numeroPagina}
                          </button>
                        </li>
                      );
                    } else if (
                      numeroPagina === paginaActual - 3 ||
                      numeroPagina === paginaActual + 3
                    ) {
                      return (
                        <li key={numeroPagina} className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      );
                    }
                    return null;
                  })}

                  <li
                    className={`page-item ${
                      paginaActual === totalPaginas ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => manejarCambioPagina(paginaActual + 1)}
                      disabled={paginaActual === totalPaginas}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        )}
      </Container>

      {/* Componente de Cuidados */}
      <SeccionCuidados />

      {/* Componente Footer */}
      <Footer />
    </>
  );
};

export default Catalogo;
