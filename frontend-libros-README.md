# Frontend - CRUD de Libros 📚

Frontend moderno y responsivo para gestionar una biblioteca personal. Construido con **React 18** + **Tailwind CSS** + **Axios**.

## 🚀 Características

✅ **CRUD Completo** - Crear, leer, actualizar y eliminar libros  
✅ **Diseño Moderno** - Interfaz elegante con Tailwind CSS  
✅ **Responsivo** - Funciona en desktop, tablet y móvil  
✅ **Búsqueda en Tiempo Real** - Filtrar libros por título o autor  
✅ **Validación de Formularios** - Campos requeridos validados  
✅ **Manejo de Errores** - Mensajes claros al usuario  
✅ **Animaciones Suaves** - Transiciones y efectos visuales  

## 📋 Requisitos Previos

- Node.js 16+
- npm o yarn

## 🛠️ Instalación Rápida

```bash
# 1. Crear proyecto Vite + React
npm create vite@latest frontend-libros -- --template react
cd frontend-libros

# 2. Instalar dependencias
npm install

# 3. Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Instalar librerías adicionales
npm install axios lucide-react
```

## 📁 Estructura de Archivos

```
frontend-libros/
├── src/
│   ├── components/
│   │   ├── LibroCard.jsx       # Tarjeta individual de libro
│   │   └── LibroForm.jsx       # Formulario agregar/editar
│   ├── services/
│   │   └── libroService.js     # Llamadas API
│   ├── App.jsx                 # Componente principal
│   ├── index.css               # Estilos Tailwind
│   └── main.jsx                # Punto de entrada
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── .env.local                  # Variables de entorno
├── vite.config.js
└── package.json
```

## 🔧 Configuración

### 1. Variables de Entorno

Crea archivo `.env.local` en la raíz:

```env
VITE_API_URL=http://localhost:8080/api/libros
```

Para producción:
```env
VITE_API_URL=https://tuapi.com/api/libros
```

### 2. tailwind.config.js

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🚀 Ejecución

**Desarrollo:**
```bash
npm run dev
# Accede a http://localhost:5173
```

**Producción:**
```bash
npm run build
npm run preview
```

## 📡 API Endpoints Esperados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/libros` | Obtener todos los libros |
| GET | `/api/libros/{id}` | Obtener un libro por ID |
| POST | `/api/libros` | Crear nuevo libro |
| PUT | `/api/libros/{id}` | Actualizar un libro |
| DELETE | `/api/libros/{id}` | Eliminar un libro |

## 📦 Modelo de Datos Esperado

```javascript
{
  id: 1,
  titulo: "El Quijote",
  autor: "Miguel de Cervantes",
  isbn: "978-0-123456-78-9",
  anio: 1605,
  genero: "Ficción",
  descripcion: "Una de las obras maestras de la literatura mundial",
  rating: 5
}
```

## 🎨 Personalización

### Colores
Edita `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: "#6366f1",      // Índigo
      secondary: "#ec4899",    // Rosa
      accent: "#f59e0b",       // Ámbar
    },
  },
}
```

### Fuentes
Añade en `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
```

## 🐛 Solución de Problemas

### "Cannot find module 'axios'"
```bash
npm install axios
```

### CORS Error
Asegúrate que tu backend tenga CORS habilitado:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

### Puerto 5173 en uso
```bash
npm run dev -- --port 3000
```

## 📝 Ejemplo de Uso

1. **Inicia el backend** (Spring Boot en puerto 8080)
2. **Inicia el frontend** (Vite en puerto 5173)
3. **Haz click en "Nuevo Libro"**
4. **Completa el formulario y guarda**
5. **La lista se actualiza automáticamente**

## 🎯 Características Futuras

- [ ] Autenticación de usuarios
- [ ] Clasificación por estrellas
- [ ] Importar/Exportar CSV
- [ ] Modo oscuro/claro
- [ ] Sincronización en tiempo real (WebSockets)
- [ ] Categorías personalizadas
- [ ] Historial de lectura

## 📄 Licencia

Proyecto educativo - Libre para usar y modificar

---

**¡Disfruta organizando tu biblioteca! 📚✨**
