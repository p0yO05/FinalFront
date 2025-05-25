function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export enum TransactionType {
  SlaveToDictador = "SlaveToDictador",
  DictadorToDictador = "DictadorToDictador",
}

export enum TransactionStatus {
  Proposed = "Disponible",
  Completed = "Completed",
  Failed = "Failed",
  Discovered = "Discovered",
}

interface Dictador {
  id: string;
  name: string;
  territory: string;
}

interface Esclavo {
  id: string;
  nickname: string;
  status: string; // Necesario para filtrar esclavos vivos
  dictadorId?: string; // Para verificar propiedad de esclavos
}

export interface CreateBlackmarketDto {
  buyerEsclavoId?: string;
  buyerDictadorId?: string;
  sellerId: string;
  item: string;
  amount: string; // Ahora en formato de cadena con decimales
  transactionType: TransactionType;
  status: TransactionStatus;
  description: string;
  onlyForSlaves?: boolean;
}

export const itemsRiqueza = [
  "Oro", "Joyas", "Artefactos antiguos", "Monedas raras", "Piedras preciosas",
  "Lingotes de plata", "Coronas de reyes", "Cofres de tesoros", "Reliquias sagradas",
];

const itemsValiosos = [
  "Corona imperial", "Trono de obsidiana", "Mapa de territorios secretos",
  "Contrato de lealtad eterna", "Llave de la prisión dorada", "Cetro de mando absoluto",
];

const pagosEspecialesEsclavo = [
  "Comida que no huele raro", "Día libre (sin electroshocks)",
  "Permiso para usar ropa (por 1 hora)", "Protección contra castigos... de bajo voltaje",
];

const itemsEsclavo = [
  "Esquincle pendejo", "Esclavo fuerte", "Esclavo inteligente",
  "Esclavo leal", "Esclavo con miedo al combate",
];

function randomPrice(): string {
  const min = 10;
  const max = 10000;
  const steps = Math.floor((max - min) / 5) + 1;
  const value = min + Math.floor(Math.random() * steps) * 5;
  return value.toFixed(2); // Devuelve como string con dos decimales
}

export function createRandomBlackmarketOffers(
  dictadores: Dictador[],
  esclavos: Esclavo[],
  cantidad: number = 5
): CreateBlackmarketDto[] {
  const offers: CreateBlackmarketDto[] = [];
  if (dictadores.length === 0) return offers;

  const esclavosVivos = esclavos.filter(e => e.status === "Alive");

  let intentos = 0;
  while (offers.length < cantidad && intentos < cantidad * 10) {
    intentos++;
    const typeRand = Math.random();
    let transactionType: TransactionType;
    let item = "";
    let amount = randomPrice();
    let sellerId: string | undefined = undefined;
    let buyerDictadorId: string | undefined = undefined;
    let buyerEsclavoId: string | undefined = undefined;
    let description = "";
    let onlyForSlaves = false;

    if (typeRand < 0.5 && esclavosVivos.length > 0) {
      transactionType = TransactionType.SlaveToDictador;
      const seller = dictadores[Math.floor(Math.random() * dictadores.length)];
      sellerId = seller.id;
      item = Math.random() < 0.5
        ? itemsRiqueza[Math.floor(Math.random() * itemsRiqueza.length)]
        : pagosEspecialesEsclavo[Math.floor(Math.random() * pagosEspecialesEsclavo.length)];
      
      description = `Oferta abierta: dictador ofrece en venta ${item} a cualquier esclavo interesado.`;
      onlyForSlaves = true;
    } else {
      transactionType = TransactionType.DictadorToDictador;
      const seller = dictadores[Math.floor(Math.random() * dictadores.length)];
      sellerId = seller.id;

      const rand = Math.random();
      if (esclavosVivos.length > 0 && rand < 1 / 3) {
        const esclavosDelDictador = esclavosVivos.filter(e => e.dictadorId === sellerId);
        if (esclavosDelDictador.length === 0) continue;
        const esclavoEnVenta = esclavosDelDictador[Math.floor(Math.random() * esclavosDelDictador.length)];
        item = `Esclavo: ${esclavoEnVenta.nickname}`;
        description = `Oferta abierta: dictador ofrece en venta al esclavo ${esclavoEnVenta.nickname} a cualquier dictador interesado.`;
      } else if (rand < 2 / 3) {
        item = itemsEsclavo[Math.floor(Math.random() * itemsEsclavo.length)];
        description = `Oferta abierta: dictador ofrece en venta un ${item.toLowerCase()} a cualquier dictador interesado.`;
      } else {
        item = itemsValiosos[Math.floor(Math.random() * itemsValiosos.length)];
        description = `Oferta abierta: dictador ofrece en venta ${item.toLowerCase()} a cualquier dictador interesado.`;
      }
      onlyForSlaves = false;
    }

    offers.push({
      sellerId,
      item,
      amount, // Ahora en formato "500.00"
      transactionType,
      status: TransactionStatus.Proposed,
      description,
      onlyForSlaves,
    });
  }
  return offers;
}