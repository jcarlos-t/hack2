
interface Props {
  category: string;
  total: number;
  onClick?: () => void;
}

export default function SummaryTile({ category, total, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left rounded-xl border
        border-purple-200 p-6 shadow-md
        bg-white hover:bg-purple-50
        transition-transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-purple-500
      "
    >
      <h3 className="font-semibold text-purple-800 mb-1">{category}</h3>
      <p className="text-sm text-purple-600">S/. {total.toFixed(2)}</p>
    </button>
  );
}
