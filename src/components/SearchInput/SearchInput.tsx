import { FC, useRef, useCallback, useState } from "react";
import { debounce } from "lodash";

import clearIcon from "@/assets/images/clearIcon.svg";
import "./SearchInput.scss";

interface SearchInputProps {
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internalvalue, setInternalValue] = useState("");

  const updateSearchValue = useCallback(
    debounce((str) => {
      onChange(str);
    }, 250),
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
        value={internalvalue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {internalvalue && (
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
