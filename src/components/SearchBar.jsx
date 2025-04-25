import React from 'react';
import './../styles/SearchBar.css'; 
function SearchBar({ search, onSearchChange, suggestions, onSuggestionClick }) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search doctor names"
        value={search}
        onChange={onSearchChange}
        data-testid="autocomplete-input"
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul
          className="suggestions-list"
          style={{ zIndex: 1000 }}
        >
          {suggestions.map((doc) => (
            <li
              key={doc.id}
              className="suggestion-item"
              onClick={() => onSuggestionClick(doc.name)}
              data-testid="suggestion-item"
              style={{ cursor: 'pointer' }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;