import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import BarraNavegacion from "./componentes/BarraNavegacion";
import RutaProtegida from "./componentes/RutaProtegida";
import Inicio from "./paginas/Inicio";
import Catalogo from "./paginas/Catalogo";
import Contacto from "./paginas/Contacto";
import Carrito from "./paginas/Carrito";
import DetalleProducto from "./paginas/DetalleProducto";
import Login from "./paginas/Login";
import Admin from "./paginas/Admin";
import { ProveedorCarrito } from "./contexto/ContextoCarrito";
import { ProveedorAuth } from "./contexto/ContextoAuth";
import { ProveedorProductos } from "./contexto/ContextoProductos";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <ProveedorAuth>
      <ProveedorProductos>
        <ProveedorCarrito>
          <Router>
            <div className="App">
              <Helmet>
                <title>PokéTattoo Studio - Tatuajes Pokémon Únicos</title>
                <meta
                  name="description"
                  content="Estudio de tatuajes especializado en diseños Pokémon. Calidad profesional, diseños únicos y atención personalizada en Buenos Aires."
                />
                <meta
                  name="keywords"
                  content="tatuajes, pokemon, tattoo, diseños, arte, buenos aires"
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
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
              </Helmet>

              <BarraNavegacion />
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/carrito"
                  element={
                    <RutaProtegida>
                      <Carrito />
                    </RutaProtegida>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RutaProtegida>
                      <Admin />
                    </RutaProtegida>
                  }
                />
              </Routes>

              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </div>
          </Router>
        </ProveedorCarrito>
      </ProveedorProductos>
    </ProveedorAuth>
  );
}

export default App;
