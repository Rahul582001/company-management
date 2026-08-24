import { useState } from "react";

interface SearchBarProps {
  onSearch: (name: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(name.trim());
  };

  const handleClear = () => {
    setName("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Search company by name..."
      />

      <button type="submit">Search</button>

      {name && (
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;
