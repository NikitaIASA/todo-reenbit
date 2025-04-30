import { useAppSelector } from "./useAppSelector";
import { selectCompletedCount, selectFilter } from "@/redux/selectors/todoSelectors";
import { FILTER_OPTIONS } from "@/consts/filterOptions";
import { useAppDispatch } from "./useAppDispatch";
import { setFilter } from "@/redux/reducers/tasks.reducer";

export const useSwitchCompletedFilter = () => {
    const dispatch = useAppDispatch();
    const completedTasksCount = useAppSelector(selectCompletedCount);
    const currentFilter = useAppSelector(selectFilter);

    const switchCompletedFilter = () => {
        if (currentFilter === FILTER_OPTIONS.COMPLETED && !completedTasksCount) {
            dispatch(setFilter(FILTER_OPTIONS.ALL));
        }
    };

    return { switchCompletedFilter };
};
