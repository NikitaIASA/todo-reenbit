import { FC, useState, useEffect, useRef, useCallback } from "react";

import { debounce } from "@/helpers/debounce";
import { SEARCH_DELAY } from "@/consts/debounceDelays";
import ClearIcon from "@/assets/images/clearIcon.svg?react";

import "./SearchInput.scss";

interface SearchInputProps {
  searchQuery: string;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ searchQuery, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internalValue, setInternalValue] = useState(searchQuery);

  useEffect(() => {
    setInternalValue(searchQuery);
  }, [searchQuery]);

  const updateSearchValue = useCallback(
    debounce((str) => {
      onChange(str);
    }, SEARCH_DELAY),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClear = () => {
    setInternalValue("");
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        className="search__input"
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {internalValue && (
        <ClearIcon className="search__clear-icon" onClick={onClear} />
      )}
    </div>
  );
};
