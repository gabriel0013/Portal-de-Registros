
import React, { useState, useEffect } from 'react';

interface Item {
  id: string;
  nombre: string;
}

interface GenericFormProps {
  onSave: (item: Item) => void;
  onClose: () => void;
  initialData: Item | null;
  entityName: string;
}

const GenericForm: React.FC<GenericFormProps> = ({ onSave, onClose, initialData, entityName }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.nombre);
    } else {
      setName('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(`El nombre del ${entityName.toLowerCase()} no puede estar vacío.`);
      return;
    }
    onSave({
      id: initialData?.id || `${entityName.slice(0, 3).toLowerCase()}_${new Date().getTime()}`,
      nombre: name,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del {entityName}
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-dark focus:border-brand-primary-dark sm:text-sm text-gray-900"
            required
          />
        </div>
      </div>
      <div className="pt-6 flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
          Cancelar
        </button>
        <button type="submit" className="bg-brand-primary text-black font-bold py-2 px-6 rounded-lg hover:bg-brand-primary-dark transition-colors">
          Guardar {entityName}
        </button>
      </div>
    </form>
  );
};

export default GenericForm;
