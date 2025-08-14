
import React, { useState, useEffect } from 'react';
import { Registro, Cliente, Portal, Pais, Registrante, Estado } from '../types';
import { PAISES, REGISTRANTES, ESTADOS } from '../constants';
import { EyeIcon, EyeSlashIcon } from './icons';

interface RegistrationFormProps {
  onSave: (registro: Registro) => void;
  onClose: () => void;
  initialData: Registro | null;
  clientes: Cliente[];
  portales: Portal[];
}

const InputField: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className="" }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
    </div>
);

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSave, onClose, initialData, clientes, portales }) => {
  const [formData, setFormData] = useState<Omit<Registro, 'id'>>({
    portalId: initialData?.portalId || '',
    clienteId: initialData?.clienteId || '',
    pais: initialData?.pais || Pais.Argentina,
    registrante: initialData?.registrante || Registrante.GieSA,
    estado: initialData?.estado || Estado.SinMovimiento,
    fechaPresentacion: initialData?.fechaPresentacion || '',
    fechaVencimiento: initialData?.fechaVencimiento || '',
    linkAcceso: initialData?.linkAcceso || '',
    usuario: initialData?.usuario || '',
    contrasena: initialData?.contrasena || '',
    contactoNombre: initialData?.contactoNombre || '',
    contactoEmail: initialData?.contactoEmail || '',
    contactoTelefono: initialData?.contactoTelefono || '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        portalId: '', clienteId: '', pais: Pais.Argentina, registrante: Registrante.GieSA,
        estado: Estado.SinMovimiento, fechaPresentacion: '', fechaVencimiento: '',
        linkAcceso: '', usuario: '', contrasena: '', contactoNombre: '',
        contactoEmail: '', contactoTelefono: ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.portalId || !formData.clienteId) {
      alert("Por favor, seleccione un Portal y un Cliente.");
      return;
    }
    onSave({
      id: initialData?.id || `reg_${new Date().getTime()}`,
      ...formData,
    });
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-dark focus:border-brand-primary-dark sm:text-sm text-gray-900 placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Datos Generales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <InputField label="Portal">
            <select name="portalId" value={formData.portalId} onChange={handleChange} className={commonInputClasses} required>
              <option value="" disabled>Seleccione un portal</option>
              {portales.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </InputField>
          <InputField label="Cliente">
            <select name="clienteId" value={formData.clienteId} onChange={handleChange} className={commonInputClasses} required>
              <option value="" disabled>Seleccione un cliente</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </InputField>
          <InputField label="País">
            <select name="pais" value={formData.pais} onChange={handleChange} className={commonInputClasses}>
              {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </InputField>
          <InputField label="Registrante">
            <select name="registrante" value={formData.registrante} onChange={handleChange} className={commonInputClasses}>
              {REGISTRANTES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </InputField>
          <InputField label="Estado">
            <select name="estado" value={formData.estado} onChange={handleChange} className={commonInputClasses}>
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </InputField>
          <div></div>
          <InputField label="Fecha de Presentación">
            <input type="date" name="fechaPresentacion" value={formData.fechaPresentacion} onChange={handleChange} className={commonInputClasses} />
          </InputField>
          <InputField label="Fecha de Vencimiento">
            <input type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} className={commonInputClasses} />
          </InputField>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Datos de acceso</h3>
             <div className="space-y-4">
                <InputField label="Link de Acceso">
                    <input type="url" name="linkAcceso" value={formData.linkAcceso} onChange={handleChange} className={commonInputClasses} placeholder="https://..." />
                </InputField>
                <InputField label="Usuario">
                    <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} className={commonInputClasses} />
                </InputField>
                <InputField label="Contraseña">
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="contrasena" value={formData.contrasena} onChange={handleChange} className={commonInputClasses} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </InputField>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contacto / Soporte</h3>
            <div className="space-y-4">
                <InputField label="Nombre">
                    <input type="text" name="contactoNombre" value={formData.contactoNombre} onChange={handleChange} className={commonInputClasses} />
                </InputField>
                <InputField label="Correo Electrónico">
                    <input type="email" name="contactoEmail" value={formData.contactoEmail} onChange={handleChange} className={commonInputClasses} placeholder="nombre@ejemplo.com"/>
                </InputField>
                <InputField label="Teléfono">
                    <input type="tel" name="contactoTelefono" value={formData.contactoTelefono} onChange={handleChange} className={commonInputClasses} />
                </InputField>
            </div>
          </div>
      </div>

      <div className="pt-6 flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
          Cancelar
        </button>
        <button type="submit" className="bg-brand-primary text-black font-bold py-2 px-6 rounded-lg hover:bg-brand-primary-dark transition-colors">
          Guardar Registro
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
