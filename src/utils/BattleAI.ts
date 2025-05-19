import { Battle, Esclavo } from '../types/types';

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateBattleNarration = (
  battle: Battle,
  contestant1: Esclavo,
  contestant2: Esclavo
): string => {
  const intros = [
    `La arena rugía mientras comenzaba el enfrentamiento entre ${contestant1.nickname} y ${contestant2.nickname}.`,
    `Bajo un cielo sombrío, ${contestant1.nickname} y ${contestant2.nickname} se encontraron cara a cara.`,
    `La multitud observaba con ansias el duelo sangriento entre ${contestant1.name}, conocido como "${contestant1.nickname}", y ${contestant2.nickname}.`,
  ];

  const actions = [
    `${contestant1.nickname} lanzó el primer golpe, directo y brutal.`,
    `${contestant2.nickname} esquivó con agilidad felina y contraatacó.`,
    `Un forcejeo desesperado terminó con ${contestant1.nickname} tomando ventaja.`,
    `${contestant2.nickname} utilizó una táctica inesperada que cambió el rumbo del combate.`,
  ];

  const events: string[] = [];

  if (battle.betrayal_occurred) {
    events.push(
      `En un giro inesperado, ${contestant2.nickname} traicionó a su aliado anterior, apuñalándolo por la espalda.`,
      `${contestant1.nickname} fingió debilidad... solo para traicionar sin piedad.`
    );
  }

  if (battle.miraculous_escape) {
    events.push(
      `${contestant2.nickname} logró escapar por un túnel oculto entre las sombras.`,
      `Cuando todo parecía perdido, ${contestant1.nickname} desapareció entre el humo, logrando escapar milagrosamente.`
    );
  }

  if (battle.injuries) {
    events.push(
      `${contestant1.nickname} sufrió heridas severas: ${battle.injuries}.`,
      `Las heridas de ${contestant2.nickname} eran evidentes: ${battle.injuries}.`,
    );
  }

  if (battle.kills && battle.kills > 0) {
    events.push(
      `Un grito mortal llenó la arena cuando ${battle.kills} cuerpo(s) cayeron ante el vencedor.`,
      `${battle.kills} bajas confirmadas dejaron una marca sangrienta en el campo.`,
    );
  }

  if (battle.death_occurred && battle.winner_id) {
    const loser = battle.contestant_1.id === battle.winner_id ? contestant2 : contestant1;
    events.push(
      `${loser.nickname} cayó sin vida mientras la arena se tiñó de rojo.`,
      `La victoria fue amarga, pues ${loser.nickname} no vivió para contarla.`
    );
  }

  const outros = [
    `La batalla quedó escrita en las paredes de la historia...`,
    `La multitud gritaba el nombre del vencedor, mientras los perdedores eran arrastrados lejos.`,
    `Desde ese día, la arena no volvió a ser la misma...`,
    `Los ojos de Carolina lo vieron todo, y ella... sonrió.`
  ];

  const narration = [
    getRandomElement(intros),
    getRandomElement(actions),
    ...events.map(() => getRandomElement(events)),
    getRandomElement(outros)
  ];

  return narration.join(' ');
};
