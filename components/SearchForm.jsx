import React from "react";

export default function SearchForm({ what }) {
  return (
    <div>
      <form className="border flex rounded-lg">
        <input
          type="text"
          name="name"
          placeholder={`Search ${what}`}
          className="px-3 rounded-l-lg outline-none"
        />
        <button className="bg-blue-800 p-3 text-white rounded-r-lg">
          Search
        </button>
      </form>
    </div>
  );
}
