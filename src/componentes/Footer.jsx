import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>PokéTattoo Studio</h5>
            <p className="mb-0">
              © 2024 Todos los derechos reservados. Página falsa para Talento
              Tech
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <h6>Contacto:</h6>
            <p className="mb-1">📧 info@poketattoo.com</p>
            <p className="mb-1">📱 +54 221 234-5678</p>
            <p className="mb-1">📍 Buenos Aires, Argentina</p>
            <p className="mb-0">📷 @poketattoo_studio</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
