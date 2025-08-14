
export enum Pais {
  Argentina = "Argentina",
  Peru = "Perú",
  Colombia = "Colombia",
  Ecuador = "Ecuador",
  Bolivia = "Bolivia",
  Chile = "Chile",
  Uruguay = "Uruguay",
}

export enum Registrante {
  GieSA = "GIE SA",
  GiePeru = "GIE PERU SAC",
  GieChile = "GIE CHILE SPA",
}

export enum Estado {
  SinMovimiento = "SIN MOVIMIENTO",
  Registrado = "REGISTRADO",
  EnProceso = "EN PROCESO",
  Enviado = "ENVIADO",
  Vencido = "VENCIDO",
}

export interface Cliente {
  id: string;
  nombre: string;
}

export interface Portal {
  id: string;
  nombre: string;
}

export interface Registro {
  id: string;
  portalId: string;
  clienteId: string;
  pais: Pais;
  registrante: Registrante;
  estado: Estado;
  fechaPresentacion: string; // YYYY-MM-DD
  fechaVencimiento: string; // YYYY-MM-DD
  linkAcceso: string;
  usuario: string;
  contrasena: string;
  contactoNombre: string;
  contactoEmail: string;
  contactoTelefono: string;
}
