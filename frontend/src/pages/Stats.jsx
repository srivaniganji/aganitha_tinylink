import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStats } from "../api/links";

export default function Stats() {
  const { shortcode } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getStats(shortcode).then(res => setData(res.data)).catch(() => setData(null));
  }, [shortcode]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Stats for: {shortcode}</h2>

      <div className="bg-gray-100 p-4 rounded">
        <p><b>Target:</b> {data.target_link}</p>
        <p><b>Total clicks:</b> {data.total_clicks}</p>
        <p><b>Last clicked:</b> {data.last_clicked_time || "—"}</p>
      </div>
    </div>
  );
}
