import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "./useAppSelector";
import { selectCompletedTodos } from "@/redux/selectors/todoSelectors";
import { FILTER_OPTIONS } from "@/consts/filterOptions";
import { SEARCH_PARAM_KEYS } from "@/consts/searchParams";

export const useSwitchCompletedFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(SEARCH_PARAM_KEYS.FILTER) || FILTER_OPTIONS.ALL;
    const completedTasks = useAppSelector(selectCompletedTodos);

    const switchCompletedFilter = () => {
        if (currentFilter === FILTER_OPTIONS.COMPLETED && !completedTasks.length) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete(SEARCH_PARAM_KEYS.FILTER);
            setSearchParams(newSearchParams);
        }
    };

    return { switchCompletedFilter };
};
