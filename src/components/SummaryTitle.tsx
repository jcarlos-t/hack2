const kawaiiIcons: Record<string, string> = {
  // Gastos básicos
  "Comida": "🍙",
  "Transporte": "🚌",
  "Vivienda": "🏠",
  "Servicios": "⚡",
  
  // Entretenimiento y ocio
  "Entretenimiento": "🎮",
  "Cine": "🎬",
  "Música": "🎵",
  "Deportes": "⚽",
  "Viajes": "✈️",
  
  // Salud y bienestar
  "Salud": "💊",
  "Medicinas": "💊",
  "Gimnasio": "💪",
  "Belleza": "💄",
  
  // Educación y desarrollo
  "Educación": "📚",
  "Cursos": "🎓",
  "Libros": "📖",
  "Tecnología": "💻",
  
  // Compras y consumo
  "Compras": "🛍️",
  "Ropa": "👕",
  "Zapatos": "👟",
  "Accesorios": "👜",
  "Electrónicos": "📱",
  
  // Servicios personales
  "Peluquería": "✂️",
  "Spa": "🧖‍♀️",
  "Masajes": "💆‍♀️",
  
  // Gastos del hogar
  "Limpieza": "🧹",
  "Jardín": "🌱",
  "Mascotas": "🐕",
  
  // Financieros
  "Préstamos": "💰",
  "Seguros": "🛡️",
  "Inversiones": "📈",
  
  // Otros
  "Otros": "🎀",
  "Regalos": "🎁",
  "Donaciones": "🤝",
  "Emergencias": "🚨",
};

interface Props {
  category: string;
  total: number;
  onClick: () => void;
}

export default function SummaryTile({ category, total, onClick }: Props) {
  const icon = kawaiiIcons[category] || "🎀";
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left rounded-2xl border-2
        border-purple-200 p-6 shadow-xl
        bg-white/90 hover:bg-purple-50
        transition-transform hover:-translate-y-2 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-purple-400
        relative overflow-hidden group
      "
    >
      <span className="absolute -top-4 -right-4 text-6xl opacity-20 group-hover:opacity-40 transition-opacity select-none pointer-events-none">
        {icon}
      </span>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl animate-bounce-slow">{icon}</span>
        <h3 className="font-bold text-purple-700 text-lg drop-shadow-sm">{category}</h3>
      </div>
      <p className="text-xl text-purple-700 font-semibold drop-shadow">S/. {total.toFixed(2)}</p>
      <span className="absolute bottom-2 right-4 text-xs text-purple-300 group-hover:text-purple-500 transition-colors">Ver detalles &rarr;</span>
    </button>
  );
}

// Animación personalizada para bounce lento (agregar en tailwind.config si se desea):
// 'bounce-slow': 'bounce 2.5s infinite'
