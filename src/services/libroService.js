import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/libros';

const libroService = {
  // Obtener todos los libros
  getAllLibros: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener libros: ' + error.message);
    }
  },

  // Obtener un libro por ID
  getLibroById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el libro: ' + error.message);
    }
  },

  // Crear un nuevo libro
  createLibro: async (libro) => {
    try {
      const response = await axios.post(API_BASE_URL, libro, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el libro: ' + error.message);
    }
  },

  // Actualizar un libro (PUT)
  updateLibro: async (id, libro) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, libro, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el libro: ' + error.message);
    }
  },

  // Eliminar un libro
  deleteLibro: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el libro: ' + error.message);
    }
  },
};

export default libroService;
