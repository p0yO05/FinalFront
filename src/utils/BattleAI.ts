import { Battle, Esclavo } from "../types/types";

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const generateBattleNarration = (
  battle: Battle,
  contestant1: Esclavo,
  contestant2: Esclavo
): string[] => {
  // ✨ Introducciones épicas
  const intros = [
    `Las puertas de la arena se abrieron con un crujido infernal. ${contestant1.nickname} y ${contestant2.nickname} avanzaron bajo un cielo opresivo, sabiendo que solo uno podría caminar fuera con vida.`,
    `El público rugía, hambriento de sangre y gloria. ${contestant1.nickname} observó a su adversario, la mirada cargada de ira contenida.`,
    `Los tambores retumbaban en el aire, anunciando el inicio de la lucha más desesperada. ${contestant1.nickname} y ${contestant2.nickname} inhalaban el olor a polvo y metal, listos para la batalla.`,
    `El sol ardiente iluminaba la arena, proyectando sombras amenazantes mientras ${contestant1.nickname} y ${contestant2.nickname} se preparaban para el enfrentamiento.`,
    `El aire estaba cargado de electricidad. Las miradas de ${contestant1.nickname} y ${contestant2.nickname} se cruzaron en un duelo silencioso antes de que todo comenzara.`,
    `Cada paso hacia el centro de la arena resonaba con el peso del destino. ${contestant1.nickname} y ${contestant2.nickname} sentían la presión de miles de ojos observándolos.`,
  ];

  // ⚔️ Ataques y estrategias
  const actions = [
    `${contestant1.nickname} atacó con la furia de un león acorralado, desatando una serie de golpes brutales.`,
    `${contestant2.nickname} giró con velocidad, esquivando por poco un golpe mortal y contraatacando con precisión.`,
    `Ambos guerreros chocaron con violencia. ${contestant1.nickname} logró desarmar parcialmente a ${contestant2.nickname}.`,
    `Una lluvia de golpes cayó sobre ${contestant1.nickname}, quien apenas pudo bloquear el ataque con un movimiento desesperado.`,
    `${contestant2.nickname} fingió retroceder, solo para lanzar un contraataque sorpresivo que casi derriba a su oponente.`,
    `La arena tembló bajo el peso del enfrentamiento. ${contestant1.nickname} y ${contestant2.nickname} luchaban con una intensidad feroz.`,
  ];

  // 🌀 Movimientos acrobáticos y tácticos
  const combatEvents = [
    `${contestant1.nickname} ejecutó una maniobra increíble, impulsándose en la pared para atacar desde las alturas.`,
    `Rodando por la arena, ${contestant2.nickname} esquivó un golpe mortal y contraatacó con un giro perfectamente calculado.`,
    `El aire se volvió pesado mientras ${contestant2.nickname} analizaba los movimientos de ${contestant1.nickname}, encontrando una pequeña debilidad en su defensa.`,
    `Con una explosión de furia, ${contestant1.nickname} lanzó una serie de golpes frenéticos, cada impacto retumbando como truenos en la arena.`,
    `${contestant2.nickname} utilizó una cuerda suelta para girar en el aire y atacar desde un ángulo inesperado.`,
    `Aprovechando la distracción de la multitud, ${contestant1.nickname} realizó un giro inesperado que dejó a su oponente vulnerable.`,
  ];

  // 😂 Bloopers inesperados
  const bloopers = [
    `${contestant1.nickname} intentó un giro espectacular... pero perdió el equilibrio y cayó de cara en la arena.`,
    `Intentando esquivar un ataque feroz, ${contestant1.nickname} tropezó con un guardia y provocó una cadena de tropiezos absurdos.`,
    `${contestant2.nickname} saltó para un golpe final, pero calculó mal la distancia y aterrizó en una pose nada heroica.`,
    `En un intento de intimidación, ${contestant1.nickname} gritó con furia… solo para que su voz se quebrara en un sonido ridículo.`,
    `Un movimiento mal calculado dejó a ${contestant2.nickname} atrapado en una red que nadie sabía por qué estaba ahí.`,
  ];

  // 🛸 Eventos de victoria instantánea raros
  const rareInstantWinEvents = [
    `¡Un OVNI abduce a ${contestant1.nickname}! Nadie entiende qué ocurrió, pero ${contestant2.nickname} se lleva la victoria.`,
    `Una grieta se abre bajo ${contestant2.nickname} y lo traga en segundos. ${contestant1.nickname} queda de pie, confundido, pero victorioso.`,
    `Un trueno sacude la arena, y una bola de fuego cae sobre ${contestant1.nickname}. ${contestant2.nickname} sobrevive por pura suerte.`,
    `Un portal interdimensional absorbe a ${contestant2.nickname}. ${contestant1.nickname} observa incrédulo pero acepta la victoria.`,
    `El suelo bajo ${contestant1.nickname} se convierte en gelatina y lo absorbe lentamente. ${contestant2.nickname} mira horrorizado, pero es declarado ganador.`,
    `Un ejército de ardillas furiosas ataca a ${contestant2.nickname}, quien huye despavorido. ${contestant1.nickname} ni siquiera tuvo que moverse para ganar.`,
    `Un agujero negro miniatura aparece y engulle a ${contestant1.nickname}. ${contestant2.nickname} celebra mientras el espacio se cierra detrás.`,
    `De la nada, ${contestant2.nickname} es transformado en una estatua de mármol. ${contestant1.nickname} toca la figura con miedo, pero gana automáticamente.`,
    `Un glitch en la simulación del torneo borra a ${contestant1.nickname} de la existencia. ${contestant2.nickname} revisa los archivos, pero ya no hay oponente.`,
  ];

  // 🔥 Clímax y desenlace
  const outros = [
    `La arena quedó en silencio mientras el nombre del vencedor se grababa en la memoria de todos.`,
    `Desde ese día, se decía que la arena aún susurra los nombres de los caídos.`,
    `Aunque la muerte visitó la arena, uno logró lo imposible: sobrevivir.`,
    `El último suspiro de la batalla se desvaneció entre el polvo mientras el vencedor alzaba los brazos en triunfo.`,
    `La sangre y el sudor se mezclaban en el suelo cuando la multitud vitoreó al sobreviviente.`,
  ];

  // 🧠 Composición narrativa
  const narration: string[] = [
    getRandomElement(intros),
    getRandomElement(actions),
    getRandomElement(combatEvents),
    getRandomElement(bloopers),
  ];

  // 🎭 Eventos especiales según el estado del combate
  if (battle.betrayal_occurred && battle.miraculous_escape) {
    narration.push(
      `${contestant1.nickname} fingió una alianza hasta el último instante, solo para clavar su arma en la espalda de ${contestant2.nickname}. Pero con un último esfuerzo, ${contestant2.nickname} activó un mecanismo oculto y desapareció.`,
      `La batalla parecía decidida cuando ${contestant1.nickname} traicionó a ${contestant2.nickname}. Pero una explosión inesperada permitió que ${contestant2.nickname} se esfumara.`
    );
  }

  if (battle.injuries) {
    narration.push(
      `El suelo quedó teñido de rojo mientras ${contestant1.nickname} intentaba mantenerse en pie con una herida abierta.`,
      `${contestant2.nickname} apenas podía sostener su arma, su cuerpo cubierto de cicatrices de la brutal batalla.`
    );
  }

  if (battle.death_occurred && battle.winner_id) {
    const loser = battle.contestant_1.id === battle.winner_id ? contestant2 : contestant1;
    narration.push(
      `El silencio fue absoluto cuando ${loser.nickname} cayó. Nadie se atrevió a pronunciar una palabra.`,
      `Con un último suspiro, ${loser.nickname} dejó de moverse. ${battle.winner_id} observó en silencio.`
    );
  }

  // 🎲 Evento raro de victoria instantánea (1% de probabilidad)
  if (Math.random() < 0.01) {
    narration.push(getRandomElement(rareInstantWinEvents));
  }

  narration.push(getRandomElement(outros));
  return narration;
};
