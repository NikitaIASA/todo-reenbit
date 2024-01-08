import { FC, useState, useEffect, useRef, useCallback, ChangeEvent} from "react";

import { debounce } from "@/helpers/debounce";
import { SEARCH_DELAY } from "@/consts/debounceDelays";
import { VALID_INPUT_REGEX } from "@/consts/searchRegex";
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(VALID_INPUT_REGEX, "");

    setInternalValue(filteredValue);
    updateSearchValue(filteredValue);
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
