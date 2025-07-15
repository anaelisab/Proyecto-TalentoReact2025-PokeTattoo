import { Navigate } from "react-router-dom";
import { usarAuth } from "../contexto/ContextoAuth";
import { Spinner, Container } from "react-bootstrap";

const RutaProtegida = ({ children }) => {
  const { usuario, cargando } = usarAuth();

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Verificando autenticación...</p>
      </Container>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;
