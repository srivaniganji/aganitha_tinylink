import { useEffect, useState } from "react";
import { getAllLinks, deleteLink } from "../api/links";
import LinkTable from "../components/LinkTable";
import LinkForm from "../components/LinkForm";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await getAllLinks();
    setLinks(res.data);
    setFiltered(res.data);
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    setFiltered(
      links.filter(l =>
        l.shortcode.toLowerCase().includes(search.toLowerCase()) ||
        l.target_link.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, links]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Search by code or URL"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <LinkForm onSuccess={load} />

      <LinkTable
        links={filtered}
        onDelete={async (code) => {
          await deleteLink(code);
          load();
        }}
      />
    </div>
  );
}
