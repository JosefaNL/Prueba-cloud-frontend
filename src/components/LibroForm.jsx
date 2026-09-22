import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

function LibroForm({ onSubmit, libroInicial, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    anio: new Date().getFullYear(),
    genero: 'Ficción',
    descripcion: '',
    rating: 5,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (libroInicial) {
      setFormData(libroInicial);
    }
  }, [libroInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'anio' || name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.autor.trim()) {
      alert('Por favor completa título y autor');
      return;
    }
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        titulo: '',
        autor: '',
        isbn: '',
        anio: new Date().getFullYear(),
        genero: 'Ficción',
        descripcion: '',
        rating: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const géneros = ['Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 'Misterio', 'Romance', 'Infantil', 'Técnico'];

  return (
    <div className="bg-slate-700 rounded-lg shadow-lg-custom p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {libroInicial ? '✏️ Editar Libro' : '➕ Agregar Nuevo Libro'}
        </h2>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: El Quijote"
              className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-slate-400"
              required
            />
          </div>

          {/* Autor */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Autor *</label>
            <input
              type="text"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              placeholder="Ej: Miguel de Cervantes"
              className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-slate-400"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Ej: 978-0-123456-78-9"
              className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-slate-400"
            />
          </div>

          {/* Año */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Año de Publicación</label>
            <input
              type="number"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              min="1000"
              max={new Date().getFullYear() + 10}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Género */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {géneros.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Rating ⭐ ({formData.rating}/5)</label>
            <input
              type="range"
              name="rating"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Escribe una breve descripción del libro..."
            rows="3"
            className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-slate-400 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-600">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-300 hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Guardando...' : 'Guardar Libro'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LibroForm;
