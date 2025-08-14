
import { Pais, Registrante, Estado, Cliente, Portal, Registro } from './types';

export const PAISES: Pais[] = Object.values(Pais);
export const REGISTRANTES: Registrante[] = Object.values(Registrante);
export const ESTADOS: Estado[] = Object.values(Estado);

export const MOCK_CLIENTS: Cliente[] = [
  { id: 'cli_1', nombre: 'YPF' },
  { id: 'cli_2', nombre: 'Pluspetrol' },
  { id: 'cli_3', nombre: 'Pan American Energy' },
];

export const MOCK_PORTALS: Portal[] = [
  { id: 'por_1', nombre: 'SAP Ariba' },
  { id: 'por_2', nombre: 'Jaggaer' },
  { id: 'por_3', nombre: 'Oracle Fusion' },
];

export const MOCK_REGISTROS: Registro[] = [
  {
    id: 'reg_1',
    portalId: 'por_1',
    clienteId: 'cli_1',
    pais: Pais.Argentina,
    registrante: Registrante.GieSA,
    estado: Estado.Registrado,
    fechaPresentacion: '2024-07-15',
    fechaVencimiento: '2025-07-15',
    linkAcceso: 'https://ypf.ariba.com',
    usuario: 'ypf_admin',
    contrasena: 'password123',
    contactoNombre: 'Juan Perez',
    contactoEmail: 'juan.perez@example.com',
    contactoTelefono: '11-1234-5678',
  },
  {
    id: 'reg_2',
    portalId: 'por_2',
    clienteId: 'cli_2',
    pais: Pais.Peru,
    registrante: Registrante.GiePeru,
    estado: Estado.EnProceso,
    fechaPresentacion: '2024-06-20',
    fechaVencimiento: '2024-12-20',
    linkAcceso: 'https://pluspetrol.jaggaer.com',
    usuario: 'plus_user',
    contrasena: 'securepass',
    contactoNombre: 'Maria Garcia',
    contactoEmail: 'maria.garcia@example.com',
    contactoTelefono: '987654321',
  },
];
