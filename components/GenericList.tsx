
import React from 'react';
import { EditIcon, TrashIcon } from './icons';

interface Item {
  id: string;
  [key: string]: any;
}

interface Column {
  key: keyof Item;
  header: string;
}

interface GenericListProps<T extends Item> {
  items: T[];
  columns: Column[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
}

const GenericList = <T extends Item,>({ items, columns, onEdit, onDelete }: GenericListProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(col => (
                  <th key={String(col.key)} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {col.header}
                  </th>
                ))}
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {items.length > 0 ? items.map(item => (
                <tr key={item.id}>
                  {columns.map(col => (
                    <td key={String(col.key)} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item[col.key]}
                    </td>
                  ))}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex items-center justify-end space-x-4">
                      <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                        <EditIcon />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900 transition-colors">
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={columns.length + 1} className="text-center py-10 text-gray-500">
                        No hay elementos para mostrar.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenericList;
