"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import {
  FormularioEstilizado,
  BotonPrimario,
} from "../componentes/EstilosPersonalizados";
import { usarProductos } from "../contexto/ContextoProductos";
import { usarAuth } from "../contexto/ContextoAuth";

const Admin = () => {
  const {
    productos,
    cargando,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
  } = usarProductos();
  const { usuario } = usarAuth();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEliminar, setProductoEliminar] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: "",
    disponible: true,
  });

  const [erroresValidacion, setErroresValidacion] = useState({});

  const limpiarFormulario = () => {
    setDatosFormulario({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      imagen: "",
      disponible: true,
    });
    setErroresValidacion({});
    setProductoEditando(null);
  };

  const validarFormulario = () => {
    const errores = {};

    // validación nombre obligatorio
    if (!datosFormulario.nombre.trim()) {
      errores.nombre = "El nombre es obligatorio";
    }

    // validación descripción mínima de 10 caracteres
    if (!datosFormulario.descripcion.trim()) {
      errores.descripcion = "La descripción es obligatoria";
    } else if (datosFormulario.descripcion.trim().length < 10) {
      errores.descripcion = "La descripción debe tener al menos 10 caracteres";
    }

    // validación precio mayor a 0
    if (!datosFormulario.precio) {
      errores.precio = "El precio es obligatorio";
    } else if (Number.parseFloat(datosFormulario.precio) <= 0) {
      errores.precio = "El precio debe ser mayor a 0";
    }

    if (!datosFormulario.categoria.trim()) {
      errores.categoria = "La categoría es obligatoria";
    }

    if (!datosFormulario.imagen.trim()) {
      errores.imagen = "La URL de la imagen es obligatoria";
    }

    setErroresValidacion(errores);
    return Object.keys(errores).length === 0;
  };

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpiar error específico cuando el usuario empiece a escribir
    if (erroresValidacion[name]) {
      setErroresValidacion((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const abrirModalAgregar = () => {
    limpiarFormulario();
    setMostrarModal(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoEditando(producto);
    setDatosFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      imagen: producto.imagen,
      disponible: producto.disponible,
    });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    limpiarFormulario();
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    const datosProducto = {
      ...datosFormulario,
      precio: Number.parseFloat(datosFormulario.precio),
      fechaCreacion: productoEditando
        ? productoEditando.fechaCreacion
        : new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
    };

    let resultado;
    if (productoEditando) {
      resultado = await actualizarProducto(productoEditando.id, datosProducto);
    } else {
      resultado = await agregarProducto(datosProducto);
    }

    if (resultado.exito) {
      cerrarModal();
    }

    setEnviando(false);
  };

  const confirmarEliminar = (producto) => {
    setProductoEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const manejarEliminar = async () => {
    if (productoEliminar) {
      const resultado = await eliminarProducto(productoEliminar.id);
      if (resultado.exito) {
        setMostrarModalEliminar(false);
        setProductoEliminar(null);
      }
    }
  };

  const categorias = [
    "Tatuaje Pequeño",
    "Tatuaje Mediano",
    "Tatuaje Grande",
    "Diseño Personalizado",
  ];

  return (
    <>
      <Helmet>
        <title>
          Panel de Administración - Gestión de Productos | PokéTattoo Studio
        </title>
        <meta
          name="description"
          content="Panel de administración para gestionar productos y servicios del estudio de tatuajes Pokémon"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Container className="py-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="display-5 fw-bold mb-2">
                  <i
                    className="bi bi-gear-fill me-3 text-primary"
                    aria-hidden="true"
                  ></i>
                  Panel de Administración
                </h1>
                <p className="text-muted mb-0">
                  Bienvenido, <strong>{usuario?.nombre}</strong> - Gestiona los
                  productos del estudio
                </p>
              </div>
              <BotonPrimario
                onClick={abrirModalAgregar}
                aria-label="Abrir formulario para agregar nuevo producto"
              >
                <i className="bi bi-plus-circle me-2" aria-hidden="true"></i>
                Agregar Producto
              </BotonPrimario>
            </div>

            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h2 className="mb-0 h5">
                  <i className="bi bi-table me-2" aria-hidden="true"></i>
                  Productos Registrados ({productos.length})
                </h2>
              </Card.Header>
              <Card.Body className="p-0">
                {cargando ? (
                  <div
                    className="text-center py-5"
                    role="status"
                    aria-live="polite"
                  >
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Cargando productos...</p>
                  </div>
                ) : productos.length === 0 ? (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-inbox text-muted"
                      style={{ fontSize: "3rem" }}
                      aria-hidden="true"
                    ></i>
                    <h3 className="mt-3 text-muted">
                      No hay productos registrados
                    </h3>
                    <p className="text-muted">
                      Agregá tu primer producto para comenzar
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table
                      hover
                      className="mb-0"
                      role="table"
                      aria-label="Lista de productos"
                    >
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">Imagen</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Descripción</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Categoría</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((producto) => (
                          <tr key={producto.id}>
                            <td>
                              <img
                                src={producto.imagen || "/placeholder.svg"}
                                alt={`Imagen de ${producto.nombre}`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                                className="rounded"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src =
                                    "/placeholder.svg?height=50&width=50";
                                }}
                              />
                            </td>
                            <td className="fw-bold">{producto.nombre}</td>
                            <td>
                              <span className="text-muted">
                                {producto.descripcion.length > 50
                                  ? `${producto.descripcion.substring(
                                      0,
                                      50
                                    )}...`
                                  : producto.descripcion}
                              </span>
                            </td>
                            <td className="fw-bold text-success">
                              ${producto.precio?.toLocaleString()}
                            </td>
                            <td>
                              <Badge bg="secondary">{producto.categoria}</Badge>
                            </td>
                            <td>
                              <Badge
                                bg={producto.disponible ? "success" : "danger"}
                              >
                                {producto.disponible
                                  ? "Disponible"
                                  : "No disponible"}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => abrirModalEditar(producto)}
                                  aria-label={`Editar producto ${producto.nombre}`}
                                >
                                  <i
                                    className="bi bi-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => confirmarEliminar(producto)}
                                  aria-label={`Eliminar producto ${producto.nombre}`}
                                >
                                  <i
                                    className="bi bi-trash"
                                    aria-hidden="true"
                                  ></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* agregar/editar producto */}
        <Modal
          show={mostrarModal}
          onHide={cerrarModal}
          size="lg"
          centered
          aria-labelledby="modal-titulo"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-titulo">
              <i
                className={`bi ${
                  productoEditando ? "bi-pencil" : "bi-plus-circle"
                } me-2`}
                aria-hidden="true"
              ></i>
              {productoEditando ? "Editar Producto" : "Agregar Nuevo Producto"}
            </Modal.Title>
          </Modal.Header>
          <FormularioEstilizado onSubmit={manejarEnvio}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">
                      Nombre del producto *
                    </Form.Label>
                    <Form.Control
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={datosFormulario.nombre}
                      onChange={manejarCambio}
                      isInvalid={!!erroresValidacion.nombre}
                      placeholder="Ej: Tatuaje Pikachu 10cm"
                      aria-describedby={
                        erroresValidacion.nombre ? "nombre-error" : undefined
                      }
                    />
                    {erroresValidacion.nombre && (
                      <div
                        id="nombre-error"
                        className="invalid-feedback"
                        role="alert"
                      >
                        {erroresValidacion.nombre}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="precio">Precio *</Form.Label>
                    <Form.Control
                      id="precio"
                      type="number"
                      name="precio"
                      value={datosFormulario.precio}
                      onChange={manejarCambio}
                      isInvalid={!!erroresValidacion.precio}
                      placeholder="15000"
                      min="0"
                      step="100"
                      aria-describedby={
                        erroresValidacion.precio ? "precio-error" : undefined
                      }
                    />
                    {erroresValidacion.precio && (
                      <div
                        id="precio-error"
                        className="invalid-feedback"
                        role="alert"
                      >
                        {erroresValidacion.precio}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="descripcion">Descripción *</Form.Label>
                <Form.Control
                  id="descripcion"
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={datosFormulario.descripcion}
                  onChange={manejarCambio}
                  isInvalid={!!erroresValidacion.descripcion}
                  placeholder="Describe el producto o servicio (mínimo 10 caracteres)"
                  aria-describedby={
                    erroresValidacion.descripcion
                      ? "descripcion-error"
                      : "descripcion-help"
                  }
                />
                {erroresValidacion.descripcion && (
                  <div
                    id="descripcion-error"
                    className="invalid-feedback"
                    role="alert"
                  >
                    {erroresValidacion.descripcion}
                  </div>
                )}
                <Form.Text id="descripcion-help" className="text-muted">
                  {datosFormulario.descripcion.length}/10 caracteres mínimos
                </Form.Text>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="categoria">Categoría *</Form.Label>
                    <Form.Select
                      id="categoria"
                      name="categoria"
                      value={datosFormulario.categoria}
                      onChange={manejarCambio}
                      isInvalid={!!erroresValidacion.categoria}
                      aria-describedby={
                        erroresValidacion.categoria
                          ? "categoria-error"
                          : undefined
                      }
                    >
                      <option value="">Seleccionar categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </Form.Select>
                    {erroresValidacion.categoria && (
                      <div
                        id="categoria-error"
                        className="invalid-feedback"
                        role="alert"
                      >
                        {erroresValidacion.categoria}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="imagen">URL de la imagen *</Form.Label>
                    <Form.Control
                      id="imagen"
                      type="url"
                      name="imagen"
                      value={datosFormulario.imagen}
                      onChange={manejarCambio}
                      isInvalid={!!erroresValidacion.imagen}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      aria-describedby={
                        erroresValidacion.imagen ? "imagen-error" : undefined
                      }
                    />
                    {erroresValidacion.imagen && (
                      <div
                        id="imagen-error"
                        className="invalid-feedback"
                        role="alert"
                      >
                        {erroresValidacion.imagen}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  id="disponible"
                  type="checkbox"
                  name="disponible"
                  checked={datosFormulario.disponible}
                  onChange={manejarCambio}
                  label="Producto disponible"
                />
              </Form.Group>

              {datosFormulario.imagen && (
                <div className="text-center">
                  <p className="text-muted mb-2">Vista previa:</p>
                  <img
                    src={datosFormulario.imagen || "/placeholder.svg"}
                    alt="Vista previa del producto"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                    className="rounded border"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarModal}>
                Cancelar
              </Button>
              <BotonPrimario type="submit" disabled={enviando}>
                {enviando ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    {productoEditando ? "Actualizando..." : "Agregando..."}
                  </>
                ) : (
                  <>
                    <i
                      className={`bi ${
                        productoEditando ? "bi-check-lg" : "bi-plus-lg"
                      } me-2`}
                      aria-hidden="true"
                    ></i>
                    {productoEditando
                      ? "Actualizar Producto"
                      : "Agregar Producto"}
                  </>
                )}
              </BotonPrimario>
            </Modal.Footer>
          </FormularioEstilizado>
        </Modal>

        {/* confirmación para eliminar */}
        <Modal
          show={mostrarModalEliminar}
          onHide={() => setMostrarModalEliminar(false)}
          centered
          aria-labelledby="modal-eliminar-titulo"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-eliminar-titulo" className="text-danger">
              <i
                className="bi bi-exclamation-triangle me-2"
                aria-hidden="true"
              ></i>
              Confirmar Eliminación
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Estás seguro de que querés eliminar el producto{" "}
              <strong>"{productoEliminar?.nombre}"</strong>?
            </p>
            <Alert variant="warning" className="mb-0" role="alert">
              <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
              Esta acción no se puede deshacer.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarModalEliminar(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={manejarEliminar}>
              <i className="bi bi-trash me-2" aria-hidden="true"></i>
              Eliminar Producto
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Admin;
