import { useAppSelector } from "./useAppSelector";
import { FILTERS_MAP } from "@/helpers/filters";
import { ITodoItem } from "@/types/todoItemDto";

export const useFilteredItems = (items: ITodoItem[], searchQuery: string): ITodoItem[] => {
  const filter = useAppSelector((state) => state.filter);
  let filteredItems = FILTERS_MAP[filter](items);

  if (searchQuery) {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredItems;
};
