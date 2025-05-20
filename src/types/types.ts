
export enum Estado {
  Alive = 'Alive',
  Dead = 'Dead',
  Escaped = 'Escaped for now',
  Free = 'Has been set Free',
}

export interface Esclavo {
  id: string;
  name: string;
  nickname: string;
  origin: string;
  strength: number;
  agility: number;
  wins: number;
  losses: number;
  status: Estado;
  healthStatus: string;
  dictadorId: string;
}

export interface Battle {
  id: string;
  name: string;
  description?: string;
  contestant_1: Esclavo;
  contestant_2: Esclavo;
  winner_id?: string;
  death_occurred: boolean;
  kills: number;
  injuries?: string;
  betrayal_occurred: boolean;
  miraculous_escape: boolean;
  success: boolean;
  createdAt: string; // date como string o Date (dependiendo del parseo)
}

export interface Sponsor {
  id: string;
  company_name: string;
  preferred_fighter: string; // puedes cambiar esto a `Esclavo` si traes info completa
  donated_items: string;
}

export interface Dictador {
  id: string;
  name: string;
  territory: string;
  loyalty_to_Carolina: number;
}

export enum TransactionType {
  SlaveToDictador = 'SlaveToDictador',
  DictadorToDictador = 'DictadorToDictador',
}

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export interface BlackMarketTransaction {
  id: string;
  buyerEsclavoId?: string;      // Solo si es SlaveToDictador
  buyerDictadorId?: string;     // Solo si es DictadorToDictador
  sellerId: string;             // ID del dictador vendedor
  item: string;
  amount: number;
  transactionType: TransactionType;
  status: TransactionStatus;
  createdAt: string;            // Fecha de la transacción
}