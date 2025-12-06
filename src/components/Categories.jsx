import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants"; // :contentReference[oaicite:20]{index=20}

const Categories = () => {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");

  const fetchCats = async () => {
    try {
      const res = await axios.get(BASE_URL + "/fetchCategory", { withCredentials: true });
      setCats(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCats(); }, []);

  const createCat = async () => {
    if (!name.trim()) return;
    try {
      const res = await axios.post(BASE_URL + "/createCategory", { name }, { withCredentials: true });
      setCats(prev => [res.data.data, ...prev]);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCat = async (id) => {
    if (!confirm("Delete category?")) return;
    try {
      await axios.delete(BASE_URL + `/fetchCategory/${id}`, { withCredentials: true });
      setCats(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Categories</h1>
      <div className="card p-4 mb-4">
        <div className="flex gap-2">
          <input className="input" placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn btn-primary" onClick={createCat}>Create</button>
        </div>
      </div>

      <div className="grid gap-2">
        {cats.map(c => (
          <div key={c._id} className="card p-3 flex justify-between">
            <div>{c.name}</div>
            <button className="btn btn-sm btn-error" onClick={() => deleteCat(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
