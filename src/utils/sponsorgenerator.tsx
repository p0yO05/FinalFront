import React, { useState, useEffect } from "react";

const sponsorNames = [
  "Corporación Omega", "Fundación Redención", "El Club del Látigo Dorado",
  "Sociedad del Averno", "Almas Benevolentes", "NeoDictadores Anónimos",
  "La Mano que Alimenta", "Hermanos del Dolor", "Consejo del Norte", "Círculo de Sangre",
  "Legión de Titanes", "Los Hijos del Abismo", "Vanguardia de la Fortuna",
  "Industria del Caos", "Alianza Sombría", "Gladiadores del Destino",
  "Corporación Nemesis", "Dominio del Hierro", "Pacto de los Antiguos",
  "Sublime Iniciativa", "Renegados Sin Nombre", "Cazadores de Gloria",
  "Fraternidad del Fuego", "Círculo de la Devastación", "Los Señores del Viento",
  "Fundación Aegis", "Los Amos de la Guerra", "Coalición del Crepúsculo",
  "Legión Oscura", "Titanes del Comercio", "El Gremio del Colmillo",
  "Asociación del Último Amanecer", "Exaltados de la Muerte", "Mercenarios del Olvido",
  "Dominio del Trueno", "Corporación Antares", "Lobos de la Fortuna",
  "Imperio del Vacío", "Los Hijos de la Tormenta", "Arcanos del Destino",
  "Ejército de los Caídos", "Orden de la Sombra", "El Sindicato de la Sangre",
  "Emporio del Dragón", "Magnates de la Perpetuidad", "El Concilio de Acero",
  "Guardianes del Abismo", "El Trono de la Infamia", "Culto del Poder",
  "Dominadores del Tiempo", "La Casa de la Inmortalidad", "Asesores del Pacto Final",
  "Cruzados del Olvido", "Los Heraldos del Terror", "Corporación Umbra",
  "Legión de la Peste", "Fundadores del Reino Perdido", "Los Señores del Fin",
  "Patrocinadores del Apocalipsis", "La Orden del Destino", "El Consorcio Supremo",
  "Generadores del Caos", "Fabricantes del Dolor", "Gremio del Eclipse",
  "Los Hijos de la Devastación", "Empresarios del Último Día", "Dictadores del Abismo",

  // 💀 Nombres adicionales para más patrocinadores épicos
  "Los Inmortales del Acero", "Orden del Dragón Carmesí", "El Concilio de la Perdición",
  "Fundación del Último Respiro", "Los Guardianes de la Ruina", "El Gremio del Pacto Oscuro",
  "La Legión de los Impíos", "Dictadores de la Eternidad", "Soberanos de la Anarquía",
  "Corporación Ragnarok", "Los Predestinados", "La Orden del Destino Fragmentado",
  "Ejército del Olvido", "Alianza del Eclipse Final", "Fundadores de la Destrucción",
  "Los Amos del Abismo", "Sindicato de la Tormenta", "Los Déspotas de la Sangre",
  "El Consejo de la Condenación", "Pacto de la Ruina", "Los Exiliados del Caos",
  "Industria del Terror Supremo", "La Compañía del Último Amanecer", "La Cámara de la Muerte",
  "Los Arquitectos de la Oscuridad", "Los Mercenarios de la Discordia", "Culto del Dominio Eterno",
  "Hijos de la Noche Interminable", "Sociedad del Fénix Corrupto", "Los Portadores del Ocaso"
];

const itemsList = [
  // 📌 Ítems Básicos y Esenciales
  "Armadura ligera", "Espada ceremonial", "Comida enlatada", "Libro de tácticas",
  "Botiquín de primeros auxilios", "Adrenalina pura", "Brazaletes explosivos",
  "Poción de coraje", "Mapa de escape", "Sueros genéticos", "Capa de invisibilidad",
  "Casco reforzado", "Guantes de impacto", "Raciones de emergencia", "Daga de sombras",
  "Chaleco antibalas", "Arco encantado", "Pólvora experimental", "Elixir de velocidad",
  "Runas de protección", "Medallón de venganza", "Cuchillas de relámpago", "Espada de plasma",
  "Brazaletes de fuerza", "Llaves de la cámara secreta", "Dispositivo de rastreo",
  "Antorchas mágicas", "Escudo indestructible", "Reliquia perdida", "Set de ganzúas avanzadas",

  // ⚔️ Reliquias Mitológicas (God of War, Elden Ring, Dante’s Inferno)
  "Blades of Chaos", "Draupnir Spear", "Horn of Heimdall", "Shield of Valhalla", "Mjolnir",
  "Scythe of Death", "Charon's Oar", "Seal of Epicurus", "Eyes of St. Lucia", "Tail of Minos",
  "Moonveil Katana", "Rivers of Blood", "Radagon’s Scarseal", "Maliketh’s Black Blade",
  "Dragon Communion Seal", "Eclipse Shotel", "Starscourge Greatswords", "Bolt of Gransax",
  "Marika’s Hammer", "Serpent-Hunter Spear", "Golden Order Seal", "Black Knife",

  // ⚡ Artefactos Tecnológicos (Cyberpunk 2077, Ciencia Ficción)
  "Sandevistan MK-V", "Mantis Blades", "Cyberware Overclock", "Relic Chip", "Nanoarmadura de Arasaka",
  "Batería de energía oscura", "Lentes de visión nocturna", "Escudo espectral", "Llave de bóveda perdida",
  "Dron de defensa", "Guantes electromagnéticos", "Armadura Tesla", "NeuralHack™ Chip",
  "Cyberstealth Module", "Aimbot Neurovisor", "Rifle de pulso gravitacional", "Nanobot de autoreparación",
  "Antimateria Disruptor", "Implante de visión predictiva", "Motor de evasión cuántica",

  // 😈 Poderes Demoníacos (Devil May Cry, Objetos Malditos)
  "Rebellion", "Ebony & Ivory", "Devil Trigger", "Yamato", "Beowulf Gauntlets",
  "Talisman de la Condenación", "Amuleto de Mundus", "Guantelete de Berial",
  "Espada de Sparda", "Soul Eater Blade", "Runa de los Condenados", "Anillo de Lucifer",
  "Fragmento de la Lanza de Longinus", "Llave de los Portales Infernos", "Marca de la Traición",
  "La Daga Maldita de Judas", "Elixir del Demonio", "Pergamino del Apocalipsis",

  // 💀 Herramientas de Caos y Muerte (Easter Eggs y Sorpresas)
  "La Espada del Olimpo", "El Ticket Dorado", "La Doom Shotgun", "El Enchiridion",
  "Una Bandana de Munición Infinita", "Un Sable de Luz", "La Chancla", "El Anillo Único",
  "La Piedra Filosofal", "Las Botas de Hermes", "El Escudo de Atenea", "La BFG 9000",
  "Batarang de Batman", "Semilla del Ermitaño", "Poción de inmortalidad", "Código de guerra",
  "Cristal de sangre", "Pergamino de invocación", "Kit Médico Experimental", "Arma Perdida de Elden Ring",
  "Guantelete del Infinito", "Portal Gun", "Huevo de Dragón", "Cuerno de batalla",
  "Manual del dominio absoluto", "Piedra de la eternidad", "Piedra de teletransportación",
  "Caja de Schrödinger", "Dispositivo de Singularidad", "Llavero de la Realidad Alterna",

  // 🔥 Objetos de Rareza Extrema (Legendarios y Únicos)
  "Esfera de manipulación mental", "Artefacto de la destrucción", "Corona del conquistador",
  "Reliquia de los antepasados", "Sello del pacto eterno", "Herramientas de sabotaje",
  "Anillo de engaño absoluto", "Arma secreta del culto", "Llave del Nexus",
  "Piedra del Caos Primordial", "Moneda del Destino Divino", "Energía Inestable del Vacío",
  "Libro de las Profecías Perdidas", "Cristal de la Verdad Absoluta", "La Última Voluntad de los Dioses"
];

function getRandomFromArray<T>(arr: T[], quantity: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, quantity);
}

const SponsorGenerator: React.FC<{ onLoad: (sponsors: any[]) => void }> = ({ onLoad }) => {
  const [sponsors, setSponsors] = useState<any[]>([]);

  // 📌 Cargar sponsors al inicio
  useEffect(() => {
    const initialSponsors = Array.from({ length: 5 }).map(() => ({
      sponsorName: sponsorNames[Math.floor(Math.random() * sponsorNames.length)],
      itemsDonated: getRandomFromArray(itemsList, 2 + Math.floor(Math.random() * 2))
    }));

    setSponsors(initialSponsors);
    onLoad(initialSponsors); // 📌 Llamada correcta a la función
  }, [onLoad]);

  const reloadSponsors = () => {
    const newSponsors = Array.from({ length: 5 }).map(() => ({
      sponsorName: sponsorNames[Math.floor(Math.random() * sponsorNames.length)],
      itemsDonated: getRandomFromArray(itemsList, 2 + Math.floor(Math.random() * 2))
    }));

    setSponsors(newSponsors);
    onLoad(newSponsors);
  };

  return (
    <div style={{ padding: "15px", backgroundColor: "#333", color: "white" }}>
      <button 
        style={{ backgroundColor: "#22c55e", padding: "10px", border: "none", cursor: "pointer" }}
        onClick={reloadSponsors}
      >
        Recargar Sponsors
      </button>
    </div>
  );
};

export default SponsorGenerator;