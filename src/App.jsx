import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./componentes/BarraNavegacion";
import Inicio from "./paginas/Inicio";
import Catalogo from "./paginas/Catalogo";
import Contacto from "./paginas/Contacto";
import Carrito from "./paginas/Carrito";
import DetalleProducto from "./paginas/DetalleProducto";
import { ProveedorCarrito } from "./contexto/ContextoCarrito";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ProveedorCarrito>
      <Router>
        <div className="App">
          <BarraNavegacion />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
        </div>
      </Router>
    </ProveedorCarrito>
  );
}

export default App;
