import { useState, useEffect } from 'react';
import libroService from './services/libroService';
import LibroCard from './components/LibroCard';
import LibroForm from './components/LibroForm';
import './index.css';
import { Plus, Trash2, Edit2, BookOpen, Search, AlertCircle, CheckCircle, Loader } from 'lucide-react';

function App() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLibro, setEditingLibro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar libros al montar
  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    setLoading(true);
    try {
      const data = await libroService.getAllLibros();
      setLibros(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setLibros([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarLibro = async (nuevoLibro) => {
    try {
      const libroGuardado = await libroService.createLibro(nuevoLibro);
      setLibros([...libros, libroGuardado]);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditarLibro = async (libroActualizado) => {
    try {
      await libroService.updateLibro(editingLibro.id, libroActualizado);
      setLibros(libros.map(l => l.id === editingLibro.id ? libroActualizado : l));
      setEditingLibro(null);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminarLibro = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        await libroService.deleteLibro(id);
        setLibros(libros.filter(l => l.id !== id));
        setError('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const librosFiltrados = libros.filter(libro =>
    libro.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.autor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="gradient-primary shadow-lg-custom sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">MisBibliografia</h1>
            </div>
            <button
              onClick={() => {
                setEditingLibro(null);
                setShowForm(!showForm);
              }}
              className="flex items-center space-x-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Libro</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500 text-white p-4 rounded-lg animate-pulse">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="mb-8 fade-in">
            <LibroForm
              onSubmit={editingLibro ? handleEditarLibro : handleAgregarLibro}
              libroInicial={editingLibro}
              onCancel={() => {
                setShowForm(false);
                setEditingLibro(null);
              }}
            />
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por titulo o autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-primary border-t-white rounded-full"></div>
            </div>
            <p className="mt-4 text-slate-300 text-lg">Cargando libros...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">Total de libros</p>
                <p className="text-3xl font-bold text-primary">{libros.length}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">Encontrados</p>
                <p className="text-3xl font-bold text-secondary">{librosFiltrados.length}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">Estado</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-xl font-bold text-accent">Activo</span>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            {librosFiltrados.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No hay libros para mostrar</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 text-primary hover:underline font-semibold"
                >
                  Crea el primero
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {librosFiltrados.map((libro) => (
                  <LibroCard
                    key={libro.id}
                    libro={libro}
                    onEditar={() => {
                      setEditingLibro(libro);
                      setShowForm(true);
                    }}
                    onEliminar={() => handleEliminarLibro(libro.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p>© 2026 MisBibliografia - Gestiona tu biblioteca personal</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
