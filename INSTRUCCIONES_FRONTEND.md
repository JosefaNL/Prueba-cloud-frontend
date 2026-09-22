#  Cómo Instalar el Frontend de Libros

## Paso 1: Crear el Proyecto React

```bash
npm create vite@latest frontend-libros -- --template react
cd frontend-libros
```

## Paso 2: Instalar Dependencias

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install axios lucide-react
npx tailwindcss init -p
```

## Paso 3: Crear la Estructura de Carpetas

```bash
mkdir -p src/components
mkdir -p src/services
```

## Paso 4: Copiar Archivos

### 4.1 Configuración Tailwind

Reemplaza el contenido de **`tailwind.config.js`**:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#ec4899",
        accent: "#f59e0b",
      },
    },
  },
  plugins: [],
}
```

### 4.2 CSS Base

Reemplaza el contenido de **`src/index.css`** (ver archivo frontend-libros-index.css)

### 4.3 Servicio API

Crea **`src/services/libroService.js`** (ver archivo frontend-libros-libroService.js)

### 4.4 Componentes

Crea **`src/components/LibroCard.jsx`** (ver archivo frontend-libros-LibroCard.jsx)

Crea **`src/components/LibroForm.jsx`** (ver archivo frontend-libros-LibroForm.jsx)

### 4.5 App Principal

Reemplaza **`src/App.jsx`** (ver archivo frontend-libros-App.jsx)

### 4.6 Main

Reemplaza **`src/main.jsx`** (ver archivo frontend-libros-main.jsx)

## Paso 5: Crear Variables de Entorno

Crea archivo **`.env.local`** en la raíz:

```env
VITE_API_URL=http://localhost:8080/api/libros
```

## Paso 6: Ejecutar

```bash
npm run dev
```

Abre: **http://localhost:5173**

---

##  Verificar que Todo Funciona

1.  La página carga correctamente
2.  El header dice "MisBibliografia"
3.  Hay un botón "Nuevo Libro"
4.  Cuando haces click, se abre un formulario
5.  Puedes llenar los campos y guardar
6.  Los libros aparecen en tarjetas
7.  Puedes editar y eliminar libros

---

##  Conectar con el Backend

### Backend (Spring Boot)

El backend debe tener CORS habilitado:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

O simplemente agregar a LibroController:

```java
@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:5173")
public class LibroController {
    // ...
}
```

### Levantar Backend

```bash
cd practica_cloud-main
mvn spring-boot:run
```

Backend debe estar en: **http://localhost:8080**

---

##  Personalizaciones Adicionales

### Cambiar Colores Primarios

En `tailwind.config.js`:
```javascript
colors: {
  primary: "#YOUR_COLOR",
  secondary: "#YOUR_COLOR",
  accent: "#YOUR_COLOR",
}
```

### Cambiar Nombre de la App

En `App.jsx`, busca "MisBibliografia" y cámbialo:
```jsx
<h1 className="text-3xl font-bold text-white">Tu Nombre Aquí</h1>
```

---

##  Problemas Comunes

### Error: "Cannot find module 'axios'"
```bash
npm install axios
```

### Error: "Cannot find module 'lucide-react'"
```bash
npm install lucide-react
```

### El frontend se conecta pero no trae datos
1. Verifica que el backend esté corriendo en puerto 8080
2. Verifica que CORS esté habilitado
3. Abre DevTools (F12) → Network → busca la llamada a /api/libros
4. Si da error 0, es problema de CORS

### Tailwind no aplica estilos
1. Verifica que `tailwind.config.js` tenga los paths correctos
2. Verifica que `src/index.css` importe @tailwind
3. Reinicia el servidor: `npm run dev`

---

##  Ahora es Tu Turno

¡El frontend está listo! Solo copia los archivos y ejecuta. Si algo no funciona, avísame y lo arreglamos juntos.

**¿Necesitas ayuda con algo más?** 🚀
