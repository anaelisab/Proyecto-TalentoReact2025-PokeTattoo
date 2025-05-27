import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SeccionCuidados = () => {
  const cuidados = [
    {
      icono: "bi-clock",
      titulo: "Mantené el vendaje por 2-4 horas",
      descripcion: "Protege la herida inicial del tatuaje",
    },
    {
      icono: "bi-droplet",
      titulo: "Lavá con agua tibia y jabón neutro",
      descripcion: "Limpieza suave 2-3 veces al día",
    },
    {
      icono: "bi-heart-pulse",
      titulo: "Aplicá crema cicatrizante",
      descripcion: "Capa fina, 2-3 veces al día",
    },
    {
      icono: "bi-sun",
      titulo: "Evitá la exposición solar directa",
      descripcion: "Protegé tu tatuaje del sol",
    },
    {
      icono: "bi-shield-check",
      titulo: "No rasques ni arranques las costras",
      descripción: "Dejá que se caigan naturalmente",
    },
    {
      icono: "bi-water",
      titulo: "Evitá piletas y mar por 2 semanas",
      descripcion: "El agua puede infectar la herida",
    },
  ];

  return (
    <section className="py-5 seccion-cuidados">
      <Container fluid className="px-3">
        <Row className="justify-content-center">
          <Col xs={12} lg={11} xl={11} xxl={10}>
            <div className="cuidados-compacto cuidados-horizontal">
              <div className="cuidados-header">
                <h3 className="mb-2 fw-bold">
                  <i className="bi bi-bandaid me-2"></i>
                  Cuidados del Tatuaje
                </h3>
                <p className="mb-0 opacity-90">
                  Seguí estos pasos para una perfecta cicatrización
                </p>
              </div>

              <div className="cuidados-contenido">
                <ul className="lista-cuidados">
                  {cuidados.map((cuidado, index) => (
                    <li key={index} className="item-cuidado">
                      <div className="icono-cuidado-mini">
                        <i className={cuidado.icono}></i>
                      </div>
                      <div className="texto-cuidado">
                        <strong>{cuidado.titulo}</strong>
                        <small>{cuidado.descripcion}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cuidados-footer">
                <p className="mb-3 text-muted">
                  <i className="bi bi-info-circle me-2"></i>
                  ¿Tenés dudas sobre el cuidado?
                </p>
                <Link to="/contacto" className="boton-contacto">
                  <i className="bi bi-chat-dots me-2"></i>
                  Contactanos
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionCuidados;
