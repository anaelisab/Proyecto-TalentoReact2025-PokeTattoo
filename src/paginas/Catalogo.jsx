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
import { Helmet } from "react-helmet";
import { TarjetaProducto } from "../componentes/EstilosPersonalizados";
import SeccionCuidados from "../componentes/SeccionCuidados";
import Footer from "../componentes/Footer";
import { usarProductos } from "../contexto/ContextoProductos";
import { usarCarrito } from "../contexto/ContextoCarrito";

const Catalogo = () => {
  const [pokemon, setPokemon] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);
  const pokemonPorPagina = 12;
  const { productos: productosEspeciales } = usarProductos();
  const { agregarAlCarrito } = usarCarrito();

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

  // Búsqueda en tiempo real
  useEffect(() => {
    const filtrado = pokemon.filter(
      (poke) =>
        poke.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        poke.types.some((type) =>
          type.type.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
        )
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
        <div className="text-center" role="status" aria-live="polite">
          <Spinner animation="border" variant="primary" size="lg" />
          <h2 className="mt-3">Cargando catálogo...</h2>
          <p className="text-muted">Esto puede tomar unos momentos</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Catálogo de Diseños Pokémon - Todos los Tatuajes | PokéTattoo Studio
        </title>
        <meta
          name="description"
          content="Explora nuestro catálogo completo de diseños de tatuajes Pokémon. Más de 150 diseños únicos disponibles. Busca por nombre o tipo de Pokémon."
        />
        <meta
          name="keywords"
          content="catalogo pokemon, diseños tatuajes pokemon, todos los pokemon, buscar pokemon tattoo"
        />
        <link rel="canonical" href="https://poketattoo.com/catalogo" />
      </Helmet>

      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center mb-5">
            <h1 className="display-4 fw-bold mb-4">Catálogo de Diseños</h1>
            <p className="lead text-muted">
              Explorá nuestra colección completa de diseños Pokémon para
              tatuajes
            </p>
          </Col>
        </Row>

        {/* Barra de búsqueda */}
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <Form role="search">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Buscar por nombre o tipo de Pokémon..."
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  aria-label="Buscar Pokémon"
                  aria-describedby="search-help"
                />
                <InputGroup.Text>
                  <i className="bi bi-search" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup>
              <Form.Text id="search-help" className="text-muted">
                Busca por nombre (ej: pikachu) o tipo (ej: electric)
              </Form.Text>
            </Form>
          </Col>
        </Row>

        {/* Resultados de búsqueda */}
        <Row className="mb-4">
          <Col>
            <p className="text-muted" role="status" aria-live="polite">
              {terminoBusqueda ? (
                <>
                  Mostrando {pokemonActual.length} de {pokemonFiltrado.length}{" "}
                  resultados para "{terminoBusqueda}"
                </>
              ) : (
                <>
                  Mostrando {pokemonActual.length} de {pokemonFiltrado.length}{" "}
                  Pokémon
                </>
              )}
            </p>
          </Col>
        </Row>

        {/* Grid de Pokémon */}
        {pokemonFiltrado.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-search text-muted"
              style={{ fontSize: "3rem" }}
              aria-hidden="true"
            ></i>
            <h3 className="mt-3 text-muted">No se encontraron resultados</h3>
            <p className="text-muted">Intenta con otro término de búsqueda</p>
          </div>
        ) : (
          <Row
            className="g-4"
            role="list"
            aria-label="Lista de diseños Pokémon"
          >
            {pokemonActual.map((poke) => (
              <Col md={6} lg={4} xl={3} key={poke.id} role="listitem">
                <TarjetaProducto as={Card} className="h-100 shadow-sm">
                  <Link
                    to={`/producto/${poke.id}`}
                    className="text-decoration-none text-dark"
                    aria-label={`Ver detalles del diseño de ${poke.name}`}
                  >
                    <Card.Img
                      variant="top"
                      src={poke.sprites.other["official-artwork"].front_default}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        padding: "20px",
                      }}
                      alt={`Diseño de tatuaje de ${poke.name}`}
                      loading="lazy"
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
                        <Button variant="primary" className="w-100">
                          <i className="bi bi-eye me-2" aria-hidden="true"></i>
                          Ver Más
                        </Button>
                      </div>
                    </Card.Body>
                  </Link>
                </TarjetaProducto>
              </Col>
            ))}
          </Row>
        )}

        {/* Paginación*/}
        {totalPaginas > 1 && (
          <Row className="mt-5">
            <Col>
              <nav aria-label="Navegación del catálogo de productos">
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
                      aria-label="Página anterior"
                    >
                      <i className="bi bi-chevron-left" aria-hidden="true"></i>
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
                            aria-label={`Ir a página ${numeroPagina}`}
                            aria-current={
                              paginaActual === numeroPagina ? "page" : undefined
                            }
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
                          <span className="page-link" aria-hidden="true">
                            ...
                          </span>
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
                      aria-label="Página siguiente"
                    >
                      Siguiente
                      <i
                        className="bi bi-chevron-right ms-1"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        )}
        {/* Sección Especiales */}
        {productosEspeciales.length > 0 && (
          <>
            <Row className="mb-4 mt-5">
              <Col lg={8} className="mx-auto text-center">
                <h2 className="display-5 fw-bold mb-4 text-primary">
                  Especiales
                </h2>
                <p className="lead text-muted">
                  Productos personalizados y diseños únicos agregados por el
                  estudio.
                </p>
                <p className="lead text-muted">
                  Tener en cuenta que el precio base de todos los tatuajes es de
                  15 mil. Los precios debajo de los diseños especiales son
                  aproximados, puestos por los artistas (según tamaño,
                  dificultad del diseño, horas, sesiones). Todo es charlable.
                </p>
              </Col>
            </Row>
            <Row
              className="g-4"
              role="list"
              aria-label="Lista de productos especiales"
            >
              {productosEspeciales.map((prod) => (
                <Col md={6} lg={4} xl={3} key={prod.id} role="listitem">
                  <TarjetaProducto
                    as={Card}
                    className="h-100 shadow-sm tarjeta-pokemon"
                  >
                    <Card.Img
                      variant="top"
                      src={prod.imagen}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        padding: "20px",
                      }}
                      alt={prod.nombre}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-capitalize text-center">
                        {prod.nombre}
                      </Card.Title>
                      <Card.Text className="text-center text-muted mb-3">
                        {prod.descripcion}
                      </Card.Text>
                      <Card.Text className="text-center fw-bold text-success mb-3">
                        ${prod.precio?.toLocaleString()}
                      </Card.Text>
                      <div className="mt-auto text-center">
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() =>
                            agregarAlCarrito(prod, {
                              tamaño: prod.tamaño || "N/A",
                              color: prod.color || "N/A",
                              ubicacion: prod.ubicacion || "N/A",
                            })
                          }
                        >
                          <i
                            className="bi bi-cart-plus me-2"
                            aria-hidden="true"
                          ></i>
                          Agregar al carrito
                        </Button>
                      </div>
                    </Card.Body>
                  </TarjetaProducto>
                </Col>
              ))}
            </Row>
          </>
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
