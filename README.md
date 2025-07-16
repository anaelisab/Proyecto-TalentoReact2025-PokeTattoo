# Proyecto-TalentoReact2025-PokeTattoo

Pre-entrega Talento Tech.

## Índice

1. Descripción del proyecto
2. Acceso al proyecto
3. Recorrido
4. Tecnologías utilizadas

## 1. Descripción del proyecto

Es una página para calcular el precio de la sesión de tatuaje y tener comunicación con el "Poke tattoo studio", para por ejemplo agendar o consultar.

### ✅ Funcionalidades Implementadas

- **🛒 Carrito de Compras**: Sistema completo con Context API
- **📱 Diseño Responsivo**: Optimizado para todos los dispositivos
- **🔍 Búsqueda y Filtros**: Búsqueda en tiempo real por nombre y tipo
- **🎨 UI/UX Moderna**: Bootstrap + Styled Components

### **Carrito Inteligente**
- Persistencia en localStorage
- Cálculo automático de precios
- Prefería cuando era accesible sin loggearse pero por cuestiones de consigna intenté darle otro sentido, <br> aunque mantiene la esencia de herramienta para presupuestar

### **Panel de Administración**
- CRUD completo con validaciones
- Interfaz intuitiva con modales
- Confirmaciones antes de eliminar
- Manejo de errores y estados de carga

### **Búsqueda Avanzada**
- Filtrado por nombre de Pokémon
- Filtrado por tipo de Pokémon
- Resultados en tiempo real
- Paginación inteligente

### **Experiencia de Usuario**
- Diseño responsive y moderno
- Navegación intuitiva
- Notificaciones informativas
- Accesibilidad completa

## 🔧 **Configuración de MockAPI**

El proyecto utiliza MockAPI con fallback local:
- **Endpoint**: `https://6876a0ca814c0dfa653cbba0.mockapi.io/api/v1`
- **Fallback**: Si la API no está disponible, funciona localmente
- **Recursos**: `/productos`

## 👤 **Sistema de Autenticación**

### Credenciales de Prueba
- **Email**: cualquier email válido
- **Contraseña**: cualquier contraseña

### Funcionalidades
- Login simulado con validación
- Registro de nuevos usuarios
- Persistencia con localStorage

## 📱 **Compatibilidad y Responsive**

### Dispositivos Soportados
- 📱 **Móviles**: 320px - 767px
- 📱 **Tablets**: 768px - 1023px
- 💻 **Desktop**: 1024px+


## 2. Acceso al proyecto

https://proyecto-talento-react2025-poke-tat.vercel.app/

## 3. Inicio

Hero:
Con su título, slogan y una invitación(cta) a recorrer el catálogo.
![Pantalla inicial](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Inicio-hero-rm.png)

Secciones:
La primera es una breve descripción de los servicios con una invitación a contactarse con el equipo.
![Pantalla inicial sección 1](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Inicio-seccion-1-rm.png)
![Pantalla inicial sección 1.2](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Inicio-seccion-1-2-rm.png)
La segunda sección cuenta con los pokemones más populares.
![Pantalla inicial sección 2](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Inicio-seccion-2-rm.png)

## 2.1 Catálogo 
Pantalla de carga:
![Catálogo pantalla carga](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Pantalla-carga-rm.png)
Pantalla incial: muestra un título, un subtitulo, un buscador, la cantidad total de pokemones disponibles y varias cards de los pokemones de manera ordenada.
![Catálogo pantalla inicial](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Catalogo-buscador-rm.png)

Card: tiene información sobre el pokemon. El número, el nombre, y el tipo. Además tiene un botón para expandir la card en detalle.
![Card](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Card-Pokemon-rm.png)

Buscador: podes buscar por nombre el pokemon.
![Catálogo buscador](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Catalogo-buscador2-rm.png)

## 3.2 Producto detallado
Card expandida: tiene información sobre el pokemon. Lo básico al igual que antes tiene el número, el nombre, y el tipo. Luego tiene otras características que pueden ser simbólicas para el usuario o simplemente un dato de color
![Detalle Imagen con información del pokemon](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Detalle-1-rm.png)
Más abajo tenes opciones para personalizar tu tatuaje y aportar información para que el total sea lo más aproximado posible al precio final.
![Opciones a elegir](https://https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Detalle-2-rm.png)
Y por último, los botones de agregar y volver, más una lista de avisos/información para tener en cuenta a la hora de continuar.
![Información sobre el servicio](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Detalle-3-rm.png)
Feedback visual al agregar un producto al carrito
![Feedback](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Feedback-agregado-rm.png)


## 3.3 Contacto
Pantalla inicial del contacto: Formulario de contacto a la izquierda, y a la derecha ubicación del local, teléfono, mail, red social, y horarios de atención.
![Información sobre el servicio](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Contacto-rm.png?raw=true)
Feedback de mensaje enviado:
![Información sobre el servicio](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Mensaje-enviado-rm.png)

## 3.4 Carrito
Carrito inhabilitado sesión cerrada:
![Sesión cerrada](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Sesion-sinloggear.png)
Carrito vacío:
![Carrito vacío](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Carrito-1-rm.png)
Carrito con pokemones:
![Carrito lleno](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Carrito-2-rm.png)
A la izquierda tenes: detallados los productos, elecciones hechas por el usuario, cantidad, precio por unidad y opcion de eliminar, quitar, o agregar.
A la derecha tenes: un resumen con el total y un cuadro de texto para que puedas dejar alguna aclaración o comentario, botón finalizar, botón seguir comprando que te dirige al catálogo y debajo una serie de pasos que le informan como es la secuencia luego de dar finalizar.
![Detalles botones y lista](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Carrito-detalle-rm.png)
Confirmar compra.
![Confirmar luego de hacer click en finalizar](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Finalizar-compra-rm.png)
Finalizada.
![Compra finalizada](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Feedback-Compra-Finalizada-rm.png)

## 3.5 Admin
Admin (solo se muestra iniciando sesión):
Productos agregados:
![Sesión abierta](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Admin-productos-agregados.png)
Formulario para agregar productos:
![Agregar productos](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Admin-agregar-productos.png)
Eliminar productos con confirmación:
![Eliminar productos](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Admin-eliminarproductos-confirmacion.png)

#### 3.6 Componentes presentes en todas las páginas:
Navbar:
![Barra de Navegación](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/BarraNavegacion-rm.png)

Footer:
![Footer](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Footer-rm.png)

Sección cuidados del tatuaje:
![Cuidado del tatuaje](https://github.com/anaelisab/Proyecto-TalentoReact2025-PokeTattoo/blob/main/public/images/Complemento-cuidado-rm.png)





## Tecnologías utilizadas

`Visual Studio Code`
`Git and GitHub`
`JavaScript` `Vite` `React` `Bootstrap`
`HTML`
`CSS`
