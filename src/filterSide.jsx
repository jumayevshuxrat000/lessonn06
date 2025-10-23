import React, { useState } from "react";

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([9900, 25000000]);
  const [selectedColors, setSelectedColors] = useState([]);

  const categories = [
    "Aksessuarlar",
    "Poyabzallar",
    "Kiyim",
    "Sport va hordiq",
  ];
  const colors = [
    { name: "Jigarrang", code: "#7B3F00" },
    { name: "Qizil", code: "#FF0000" },
    { name: "Yashil", code: "#5CB85C" },
    { name: "Xaki", code: "#C3B091" },
    { name: "Binafsharang", code: "#8A2BE2" },
    { name: "Pushti", code: "#FFB6C1" },
  ];
  const sizes = ["39-40", "40-41", "41-42", "42-43", "43-44"];

  const toggleColor = (name) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  return (
    <div className="w-64 p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">
      <div className="text-sm text-gray-500">
        <a href="#" className="text-gray-700 hover:underline">
          Bosh sahifa
        </a>{" "}
        / <span className="text-purple-600">Barcha toifalar</span>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Turkumlar</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat} className="cursor-pointer hover:text-purple-600">
              {cat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Narx, baho, so'm</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-1/2 border rounded-md px-2 py-1 text-sm"
            placeholder="dan"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-1/2 border rounded-md px-2 py-1 text-sm"
            placeholder="oldin"
          />
        </div>
        <input
          type="range"
          min="9900"
          max="25000000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full mt-3 accent-purple-600"
        />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Rang</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleColor(color.name)}
            >
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color.code }}
              ></div>
              <span
                className={
                  selectedColors.includes(color.name)
                    ? "text-purple-600 font-medium"
                    : ""
                }
              >
                {color.name}
              </span>
            </div>
          ))}
          <p className="text-gray-400 text-sm cursor-pointer hover:text-purple-600">
            Yana 16
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">RUS O'lchami</h3>
        <div className="space-y-1">
          {sizes.map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-600" />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
