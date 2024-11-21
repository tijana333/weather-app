import React from "react";

interface SearchBarProps {
  query: string;
  suggestions: string[];
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSuggestion: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  suggestions,
  onQueryChange,
  onSelectSuggestion,
}) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Enter city name"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => onSelectSuggestion(city)}
              style={{ cursor: "pointer" }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
