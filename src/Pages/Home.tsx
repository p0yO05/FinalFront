import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">
        🔥 Bienvenido a "Lucha por tu Libertad o Muere" 🔥
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">El Origen del Imperio</h2>
        <p className="mb-4">
          Muchos años atrás, en una tierra pacífica llena de estudiantes de desarrollo web, una
          alma fue olvidada: <strong>Carolina</strong>. Torturada por APIs confusas, grids CSS y la
          existencia inexplicable de tantos frameworks de JavaScript, algo dentro de ella se rompió
          tras fallar otro deployment a Vercel.
        </p>
        <p className="mb-4">
          Jurando venganza contra todo desarrollador web, Carolina se convirtió en la <strong>Dictadora Suprema de las Américas</strong>. Su primera víctima: Sebastián el Profesor Web, ahora su
          esclavo cibernético gracias a scripts oscuros generados por IA.
        </p>
        <p className="mb-4">
          Hoy, para entretenerse, Carolina organiza el espectáculo más brutal jamás creado:
          <strong> “Lucha por tu Libertad o Muere”</strong> – un torneo mortal donde esclavos (estudiantes,
          profesores y prisioneros al azar) luchan por su libertad bajo la mirada sanguinaria de
          dictadores regionales.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">¿Qué puedes hacer en esta aplicación?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>📜 Administrar esclavos: estadísticas, estado, origen y apodos.</li>
          <li>⚔️ Registrar batallas: resultados, heridos, traiciones y muertes.</li>
          <li>👑 Gestionar dictadores: territorios, lealtad y eventos especiales.</li>
          <li>💰 Controlar patrocinadores y transacciones del mercado negro.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">¿Listo para enfrentarte al sistema?</h2>
        <p>
          Selecciona una sección en el menú para comenzar. Recuerda: Carolina está mirando. Y si tu
          código falla... podrías ser el próximo en la arena.
        </p>
      </section>

      <section className="mt-16 border-t border-gray-700 pt-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">📰 Noticias del Imperio</h2>
        <ul className="space-y-4 text-gray-300 list-disc list-inside">
          <li>
            🎯 <strong>Nuevo récord en la arena:</strong> El esclavo conocido como “Div Hunter” eliminó
            a 4 oponentes sin usar más que un `console.log()` y su mirada intimidante.
          </li>
          <li>
            🧪 <strong>Mutación confirmada:</strong> Después de recibir 12 buffs de patrocinadores,
            el concursante #404 ha desarrollado un tercer brazo. Ahora teclea en 3 monitores al mismo tiempo.
          </li>
          <li>
            🥩 <strong>Actualización de la cafetería:</strong> El menú ahora incluye “sopa de tags
            semánticos”. Aparentemente contiene restos de antiguos profesores rebeldes.
          </li>
          <li>
            🦾 <strong>Nuevo patrocinador:</strong> Evil Corp™ lanza su nuevo suero “UltraJSON”, que
            permite a los esclavos serializar emociones humanas. Nadie lo pidió.
          </li>
          <li>
            🚨 <strong>Intento de fuga frustrado:</strong> Un grupo de esclavos intentó escapar
            disfrazados de componentes React. Fueron detectados cuando usaron un `useEffect()` sin dependencia.
          </li>
          <li>
            📦 <strong>Bug glorificado:</strong> Carolina decreta que todos los errores en producción
            serán considerados “features inevitables del destino”.
          </li>
          <li>
            🧠 <strong>Nueva actualización:</strong> El sistema de ranking ahora penaliza
            pensamientos de libertad con pérdida de puntos de agilidad.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
