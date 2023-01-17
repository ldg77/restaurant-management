import { useEffect, useState } from "react";

export default function SearchForm({ what, setData, on }) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("/" + what)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = json)));
  }, [search.length === 0]);
  return (
    <div>
      <form className="border flex rounded-lg">
        <input
          type="text"
          name="name"
          placeholder={`Search ${what}`}
          className="p-3 rounded-l-lg outline-none"
          onChange={(e) => {
            setData(
              (prev) =>
                (prev = prev.filter((el) =>
                  el[on].toUpperCase().includes(e.target.value.toUpperCase())
                ))
            );
            setSearch((prev) => (prev = e.target.value));
          }}
          value={search}
        />
      </form>
    </div>
  );
}
