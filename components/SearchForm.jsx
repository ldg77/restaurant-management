import React from "react";

export default function SearchForm({ what }) {
  return (
    <div>
      <form className="border flex rounded">
        <input
          type="text"
          name="name"
          placeholder={`Search ${what}`}
          className="px-3"
        />
        <button className="bg-blue-800 p-3 text-white">Search</button>
      </form>
    </div>
  );
}
