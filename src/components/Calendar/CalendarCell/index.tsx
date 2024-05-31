import './index.scss';
import {CalendarItem} from "@components/Calendar/types";
import classNames from "classnames";
import {MouseEventHandler, useCallback} from "react";

type CalendarCellType = {
    onClick?: (timestamp: number) => void
} & Omit<CalendarItem, 'localDate'>;
const CalendarCell = (props: CalendarCellType) => {
    const {
        isToday,
        timestamp,
        isDisabled,
        isSelected,
        label,
        onClick
    } = props;

    const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
        e.preventDefault();
        onClick && onClick(timestamp);
    }, [timestamp]);

    return <div data-timestamp={timestamp} onClick={handleClick} className={classNames('component-calendar-cell', {
        'today': isToday,
        'disabled': isDisabled,
        'selected': isSelected
    })}>
        {label}
    </div>;
}

export default CalendarCell;