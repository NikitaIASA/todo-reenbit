import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { selectFilter } from "@/redux/selectors/filterSelectors";
import { selectCompletedTodos } from "@/redux/selectors/todoSelectors";
import { setFilter } from "@/redux/actions/filterActions";
import { FILTER_OPTIONS } from "@/consts/filterOptions";

export const useSwitchCompletedFilter = () => {
    const dispatch = useAppDispatch();
    const currentFilter = useAppSelector(selectFilter);
    const completedTasks = useAppSelector(selectCompletedTodos);

    const switchCompletedFilter = () => {
        if (currentFilter === FILTER_OPTIONS.COMPLETED && !completedTasks.length) {
            dispatch(setFilter(FILTER_OPTIONS.ALL));
        }
    };

    return { switchCompletedFilter };
};