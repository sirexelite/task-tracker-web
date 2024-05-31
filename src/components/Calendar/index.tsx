import './index.scss';
import CalendarHeader from "@components/Calendar/CalendarHeader";
import CalendarDays from "@components/Calendar/CalendarDays";
import {useCallback, useState} from "react";
import {ChangeMonthDirection} from "@components/Calendar/types";
import classNames from "classnames";
import getBackwardMonth from "@utils/dates/getBackwardMonth";
import getForwardMonth from "@utils/dates/getForwardMonth";

type CalendarType = {
    date?: number
}
const Calendar = (props: CalendarType) => {
    const {
        date
    } = props;

    const [focusedDate, setFocusedDate] = useState<{
        to: number,
        from: number
    }>(() => {
        return {
            to: date ?? Date.now(),
            from: 0
        };
    });

    const handleChangeMonth = useCallback((direction: ChangeMonthDirection, timestamp: number) => {
        setFocusedDate(prev => {
            if (direction === ChangeMonthDirection.backward) {
                return {
                    to: getBackwardMonth(timestamp).getTime(),
                    from: prev.to
                }
            }

            return {
                to: getForwardMonth(timestamp).getTime(),
                from: prev.to
            }
        });
    }, []);
    const handleAnimationEnd = useCallback(() => {
        setFocusedDate(prev => ({
            ...prev,
            from: 0
        }));
    }, []);
    const handleResetMonth = useCallback(() => {
        setFocusedDate({
            to: Date.now(),
            from: 0
        });
    }, []);

    const isAnimated = Boolean(focusedDate.from !== 0);

    return <div className={classNames('component-calendar', {
        'animation-change': isAnimated,
        'forward-direction': isAnimated && focusedDate.from < focusedDate.to,
        'backward-direction': isAnimated && focusedDate.from > focusedDate.to,
    })}>
        <CalendarHeader
            onResetMonth={handleResetMonth}
            focusedDate={focusedDate.to}
            onChangeMonth={handleChangeMonth}
        />
        <CalendarDays
            animationEnd={handleAnimationEnd}
            focusedDate={focusedDate.to}
            fromChangingDate={focusedDate.from || undefined}
        />
    </div>;
}

export default Calendar;