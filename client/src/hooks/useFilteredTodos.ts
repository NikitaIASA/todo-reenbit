import { useAppSelector } from "./useAppSelector";
import { FILTERS_MAP } from "@/helpers/filters";
import { ITodoItem } from "@/types/todoItemDto";

export const useFilteredItems = (items: ITodoItem[]): ITodoItem[] => {
  const filter = useAppSelector((state) => state.filter);
  const filteredItems = FILTERS_MAP[filter](items);

  return filteredItems;
};
