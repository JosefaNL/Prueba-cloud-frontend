import { Trash2, Edit2, Star } from 'lucide-react';

function LibroCard({ libro, onEditar, onEliminar }) {
  return (
    <div className="bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow fade-in">
      {/* Card Header */}
      <div className="gradient-secondary p-4 text-white">
        <h3 className="text-lg font-bold truncate">{libro.titulo || 'Sin título'}</h3>
        <p className="text-sm opacity-90">{libro.autor || 'Autor desconocido'}</p>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* ISBN */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm font-semibold">ISBN:</span>
          <span className="text-white text-sm font-mono">{libro.isbn || 'No especificado'}</span>
        </div>

        {/* Año de publicación */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm font-semibold">Año:</span>
          <span className="text-white text-sm">{libro.anio || '-'}</span>
        </div>

        {/* Género */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm font-semibold">Género:</span>
          <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {libro.genero || 'General'}
          </span>
        </div>

        {/* Rating (opcional) */}
        {libro.rating && (
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm font-semibold">Rating:</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(libro.rating) ? 'fill-accent text-accent' : 'text-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Descripción */}
        {libro.descripcion && (
          <p className="text-slate-300 text-sm line-clamp-2">{libro.descripcion}</p>
        )}
      </div>

      {/* Card Footer - Actions */}
      <div className="bg-slate-600 px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-slate-400">ID: #{libro.id}</span>
        <div className="flex space-x-2">
          <button
            onClick={onEditar}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition flex items-center space-x-1"
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-xs">Editar</span>
          </button>
          <button
            onClick={onEliminar}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition flex items-center space-x-1"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs">Borrar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LibroCard;
