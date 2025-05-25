import React from "react";

interface Stats {
  fuerza?: number;
  inteligencia?: number;
  carisma?: number;
  [key: string]: number | undefined;
}

interface StatsOverviewProps {
  stats: Stats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="w-full mb-4">
      <h3 className="text-lg font-bold text-indigo-200 mb-2">Estadísticas</h3>
      <div className="space-y-1">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <span className="w-32 capitalize text-indigo-100">{key}:</span>
            <div className="flex-1 bg-gray-700 rounded h-3 mx-2">
              <div
                className="bg-indigo-400 h-3 rounded"
                style={{ width: `${Math.min(Number(value ?? 0), 100)}%` }}
              ></div>
            </div>
            <span className="w-8 text-indigo-100">{value ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;