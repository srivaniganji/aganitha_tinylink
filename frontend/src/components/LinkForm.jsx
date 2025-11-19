import { useState } from "react";
import { createLink } from "../api/links";

export default function LinkForm({ onSuccess }) {
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!target.startsWith("http")) {
      setError("URL must start with http");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createLink({ url: target, customCode: code });
      setTarget("");
      setCode("");
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.error || "Error creating link");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="mb-6 bg-gray-100 p-4 rounded">
      <div className="flex gap-4">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Target URL"
          value={target}
          onChange={e => setTarget(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded w-40"
          placeholder="Custom code (optional)"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Link"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
