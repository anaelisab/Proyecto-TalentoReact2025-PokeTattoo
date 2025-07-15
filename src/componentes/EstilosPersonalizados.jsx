import styled from "styled-components";

export const ContenedorHero = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    text-align: center;
    padding: 2rem 0;
  }
`;

export const TarjetaProducto = styled.div`
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #2c3e50;
  }
`;

export const BotonPrimario = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ContenedorCarrito = styled.div`
  .tarjeta-carrito {
    border-radius: 15px;
    border: none;
    transition: all 0.3s ease;
    background-color: white;
    margin-bottom: 1rem;

    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .precio-total {
    font-size: 1.2rem;
    color: #667eea;
    font-weight: bold;
  }

  .controles-cantidad {
    background-color: white;
    border-radius: 25px;
    padding: 5px;
    border: 1px solid #ecf0f1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const FormularioEstilizado = styled.form`
  .form-control:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }

  .form-select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }

  .is-invalid {
    border-color: #dc3545;
  }

  .invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

export const NavbarEstilizada = styled.nav`
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nav-link {
    transition: color 0.3s ease;

    &:hover {
      color: #667eea !important;
    }

    &.active {
      color: #667eea !important;
      font-weight: bold;
    }
  }

  .dropdown-toggle {
    border: none;

    &:focus {
      box-shadow: none;
    }
  }
`;
