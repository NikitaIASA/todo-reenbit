import { FC } from "react";

import "./SearchInput.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      className="search-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
};
