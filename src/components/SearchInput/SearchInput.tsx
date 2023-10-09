import { FC, useRef } from "react";

import clearIcon from "@/assets/images/clearIcon.svg";

import "./SearchInput.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        className="search__input"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {value && (
        <img
          onClick={onClear}
          className="search__clear-icon"
          src={clearIcon}
          alt="clear icon"
        />
      )}
    </div>
  );
};
