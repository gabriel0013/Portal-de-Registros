
import React, { useState, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import RegistrationForm from './components/RegistrationForm';
import GenericList from './components/GenericList';
import GenericForm from './components/GenericForm';
import { PlusIcon, EditIcon, TrashIcon } from './components/icons';
import { Cliente, Portal, Registro } from './types';
import { MOCK_CLIENTS, MOCK_PORTALS, MOCK_REGISTROS } from './constants';

type View = 'registros' | 'clientes' | 'portales';
type ModalType = 'registro' | 'cliente' | 'portal' | null;

const RegistrationListView: React.FC<{
    registros: Registro[];
    clientes: Cliente[];
    portales: Portal[];
    onEdit: (registro: Registro) => void;
    onDelete: (id: string) => void;
}> = ({ registros, clientes, portales, onEdit, onDelete }) => {

    const clientMap = useMemo(() => new Map(clientes.map(c => [c.id, c.nombre])), [clientes]);
    const portalMap = useMemo(() => new Map(portales.map(p => [p.id, p.nombre])), [portales]);

    return (
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                {['ID Registro', 'Portal', 'Cliente', 'País', 'Registrante', 'Estado', 'F. Presentación', 'F. Vencimiento'].map(header => (
                                    <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{header}</th>
                                ))}
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {registros.length > 0 ? registros.map(reg => (
                                <tr key={reg.id}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono text-xs">{reg.id.substring(0, 8)}...</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{portalMap.get(reg.portalId) || 'N/A'}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{clientMap.get(reg.clienteId) || 'N/A'}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reg.pais}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reg.registrante}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.estado === 'VENCIDO' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{reg.estado}</span></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reg.fechaPresentacion}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reg.fechaVencimiento}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div className="flex items-center justify-end space-x-4">
                                            <button onClick={() => onEdit(reg)} className="text-indigo-600 hover:text-indigo-900 transition-colors"><EditIcon /></button>
                                            <button onClick={() => onDelete(reg.id)} className="text-red-600 hover:text-red-900 transition-colors"><TrashIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                 <tr>
                                    <td colSpan={9} className="text-center py-10 text-gray-500">
                                        No hay registros para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const App: React.FC = () => {
    const [view, setView] = useState<View>('registros');
    const [modal, setModal] = useState<ModalType>(null);
    const [editingItem, setEditingItem] = useState<Registro | Cliente | Portal | null>(null);

    const [registros, setRegistros] = useState<Registro[]>(MOCK_REGISTROS);
    const [clientes, setClientes] = useState<Cliente[]>(MOCK_CLIENTS);
    const [portales, setPortales] = useState<Portal[]>(MOCK_PORTALS);

    const handleOpenModal = (type: ModalType, item: any = null) => {
        setEditingItem(item);
        setModal(type);
    };

    const handleCloseModal = () => {
        setModal(null);
        setEditingItem(null);
    };
    
    const handleSaveRegistro = (registro: Registro) => {
        setRegistros(prev => {
            const index = prev.findIndex(r => r.id === registro.id);
            if (index > -1) {
                const updated = [...prev];
                updated[index] = registro;
                return updated;
            }
            return [...prev, registro];
        });
        handleCloseModal();
    };

    const handleSaveCliente = (cliente: Cliente) => {
        setClientes(prev => {
            const index = prev.findIndex(c => c.id === cliente.id);
            if (index > -1) {
                const updated = [...prev];
                updated[index] = cliente;
                return updated;
            }
            return [...prev, cliente];
        });
        handleCloseModal();
    };

    const handleSavePortal = (portal: Portal) => {
        setPortales(prev => {
            const index = prev.findIndex(p => p.id === portal.id);
            if (index > -1) {
                const updated = [...prev];
                updated[index] = portal;
                return updated;
            }
            return [...prev, portal];
        });
        handleCloseModal();
    };

    const handleDelete = (id: string, type: View) => {
        if (!window.confirm("¿Está seguro de que desea eliminar este elemento?")) return;
        switch (type) {
            case 'registros':
                setRegistros(prev => prev.filter(r => r.id !== id));
                break;
            case 'clientes':
                setClientes(prev => prev.filter(c => c.id !== id));
                break;
            case 'portales':
                setPortales(prev => prev.filter(p => p.id !== id));
                break;
        }
    }

    const viewConfig = {
        registros: {
            title: "Mis Registros",
            buttonText: "Nuevo Registro",
            onAdd: () => handleOpenModal('registro'),
            component: <RegistrationListView
                registros={registros}
                clientes={clientes}
                portales={portales}
                onEdit={(item) => handleOpenModal('registro', item)}
                onDelete={(id) => handleDelete(id, 'registros')}
            />
        },
        clientes: {
            title: "Mis Clientes",
            buttonText: "Nuevo Cliente",
            onAdd: () => handleOpenModal('cliente'),
            component: <GenericList<Cliente>
                items={clientes}
                columns={[{ key: 'id', header: 'ID del Cliente' }, { key: 'nombre', header: 'Cliente' }]}
                onEdit={(item) => handleOpenModal('cliente', item)}
                onDelete={(id) => handleDelete(id, 'clientes')}
            />
        },
        portales: {
            title: "Mis Portales",
            buttonText: "Nuevo Portal",
            onAdd: () => handleOpenModal('portal'),
            component: <GenericList<Portal>
                items={portales}
                columns={[{ key: 'id', header: 'ID del Portal' }, { key: 'nombre', header: 'Portal' }]}
                onEdit={(item) => handleOpenModal('portal', item)}
                onDelete={(id) => handleDelete(id, 'portales')}
            />
        }
    };

    const currentViewConfig = viewConfig[view];

    return (
        <div className="flex bg-gray-100">
            <Sidebar currentView={view} onViewChange={setView} />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">{currentViewConfig.title}</h2>
                    <button
                        onClick={currentViewConfig.onAdd}
                        className="flex items-center gap-2 bg-brand-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-brand-primary-dark transition-colors shadow"
                    >
                        <PlusIcon className="w-5 h-5" />
                        {currentViewConfig.buttonText}
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {currentViewConfig.component}
                </div>
            </main>
            
            {modal && (
                <Modal 
                    isOpen={!!modal} 
                    onClose={handleCloseModal}
                    title={
                        modal === 'registro' ? (editingItem ? 'Editar Registro' : 'Formulario de Portales de Clientes') :
                        modal === 'cliente' ? (editingItem ? 'Editar Cliente' : 'Formulario de Clientes') :
                        (editingItem ? 'Editar Portal' : 'Formulario de Portales')
                    }
                >
                    {modal === 'registro' && <RegistrationForm onSave={handleSaveRegistro} onClose={handleCloseModal} initialData={editingItem as Registro | null} clientes={clientes} portales={portales}/>}
                    {modal === 'cliente' && <GenericForm onSave={handleSaveCliente} onClose={handleCloseModal} initialData={editingItem as Cliente | null} entityName="Cliente" />}
                    {modal === 'portal' && <GenericForm onSave={handleSavePortal} onClose={handleCloseModal} initialData={editingItem as Portal | null} entityName="Portal" />}
                </Modal>
            )}
        </div>
    );
};

export default App;
