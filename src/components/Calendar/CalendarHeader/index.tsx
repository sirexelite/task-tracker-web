import './index.scss';
import {MouseEventHandler, useCallback, useMemo} from "react";
import {ChangeMonthDirection} from "@components/Calendar/types";

type CalendarHeaderType = {
    focusedDate: number,
    onResetMonth: () => void,
    onChangeMonth: (direction: ChangeMonthDirection, timestamp: number) => void
}
const CalendarHeader = (props: CalendarHeaderType) => {
    const { onChangeMonth, focusedDate, onResetMonth } = props;

    const dateInstance = useMemo(() => {
        return new Date(props?.focusedDate);
    }, [props?.focusedDate]);
    const monthLabel = useMemo(() => {
        return dateInstance.toLocaleDateString('default', {
            month: "long",
            year: "numeric"
        });
    }, [dateInstance]);
    const iCanReset = useMemo(() => {
        const now = new Date(Date.now());
        return dateInstance.getMonth() !== now.getMonth() || now.getFullYear() !== dateInstance.getFullYear();
    }, [dateInstance]);

    const handleCallback = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
        e.preventDefault();
        const { dataset } = e.currentTarget;
        if (dataset.direction) {
            onChangeMonth(dataset.direction as ChangeMonthDirection, focusedDate);
        }
    }, [onChangeMonth, focusedDate]);

    return <div className={'component-calendar-header'}>
        <span data-tooltip={iCanReset ? "Reset month" : undefined} onClick={onResetMonth}>{monthLabel}</span>
        <div className={'actions'}>
            <button onClick={handleCallback} data-direction={ChangeMonthDirection.backward}>{'<'}</button>
            <button onClick={handleCallback} data-direction={ChangeMonthDirection.forward}>{'>'}</button>
        </div>
    </div>;
}

export default CalendarHeader;