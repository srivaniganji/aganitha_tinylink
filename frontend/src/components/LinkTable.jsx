import { API } from "../config.js";

export default function LinkTable({ links, onDelete }) {
  if (!links.length) return <p>No links yet.</p>;

  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">Code</th>
          <th className="p-2 text-left">Target</th>
          <th className="p-2 text-left">Clicks</th>
          <th className="p-2 text-left">Last Click</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((l) => (
          <tr key={l.shortcode} className="border-t">
            <td className="p-2">
              <a
                href={`${API}/${l.shortcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {l.shortcode}
              </a>
            </td>

            <td className="p-2 max-w-xs truncate">{l.target_link}</td>

            <td className="p-2">{l.total_clicks}</td>

            <td className="p-2">{l.last_clicked_time || "—"}</td>

            <td className="p-2">
              <button
                onClick={() => onDelete(l.shortcode)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
