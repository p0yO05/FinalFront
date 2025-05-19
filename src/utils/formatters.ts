// utils/formatters.ts

// 🔹 Formatea fecha tipo "17 de mayo de 2025, 13:45"
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 🔹 Capitaliza la primera letra
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 🔹 Iconos para eventos clave en batalla
export const eventEmoji = (event: string) => {
  const map: Record<string, string> = {
    traición: '🗡️',
    muerte: '💀',
    escape: '🏃‍♂️',
    victoria: '🏆',
    herido: '🩸',
    golpeCrítico: '💥',
    rendición: '🚩',
  };
  return map[event] || '⚔️';
};

// 🔹 Estado visual para estadísticas de personajes
export const formatStat = (stat: number): string => {
  if (stat >= 90) return '🔥 Legendario';
  if (stat >= 75) return '💪 Imponente';
  if (stat >= 60) return '🧠 Competente';
  if (stat >= 40) return '🛡️ Mediocre';
  return '😬 Patético';
};

// 🔹 Barra de poder visual con emojis
export const powerBar = (value: number): string => {
  const maxBlocks = 10;
  const filled = Math.round((value / 100) * maxBlocks);
  return '▰'.repeat(filled) + '▱'.repeat(maxBlocks - filled);
};

// 🔹 Resumen narrativo simple
export const summarizeBattle = (winner: string, loser: string): string => {
  const formats = [
    `${winner} arrasó a ${loser} sin piedad.`,
    `${loser} cayó derrotado ante la furia de ${winner}.`,
    `${winner} emergió como campeón tras un duelo brutal con ${loser}.`,
    `${loser} no tuvo oportunidad frente a la táctica letal de ${winner}.`,
    `El combate terminó con ${winner} alzando el puño en victoria sobre ${loser}.`,
  ];
  return formats[Math.floor(Math.random() * formats.length)];
};

// 🔹 Tiempo transcurrido en forma humana (ej. "hace 3 días")
export const timeAgo = (dateStr: string): string => {
  const now = new Date();
  const past = new Date(dateStr);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return 'Hace unos segundos';
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;

  return formatDate(dateStr);
};
