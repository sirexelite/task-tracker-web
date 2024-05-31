import './index.scss';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {CalendarItem} from "@components/Calendar/types";
import CalendarCell from "@components/Calendar/CalendarCell";

type CalendarDaysType = {
    focusedDate: number,
    fromChangingDate?: number,
    animationEnd?: () => void
}
type CalendarDaysState = {
    focusedDate: CalendarDaysType['focusedDate'],
    days: Array<CalendarItem>
}

const CalendarDays = (props: CalendarDaysType) => {
    const { animationEnd } = props;

    const ref = useRef<HTMLDivElement>(null)
    const handleUpdateDate = useCallback((dateMs: number, animatedDate?: number): CalendarDaysState => {
        const response = {
            focusedDate: dateMs,
            days: []
        } as CalendarDaysState;
        const date = new Date(dateMs);
        const startMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        );
        const weekOffset = startMonth.getDay();
        const today = new Date();
        const propsDateAsString = date.toLocaleDateString();
        const todayAsString = today.toLocaleDateString();

        response.days = Array(42)
            .fill(0)
            .reduce<CalendarDaysState['days']>((prev, _, index) => {
                const targetDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    index - weekOffset + 1
                );
                const targetDateAsString = targetDate.toLocaleDateString();
                const isDisabled = targetDate.getMonth() !== startMonth.getMonth();
                const isToday = targetDateAsString === todayAsString;
                const isSelected = targetDateAsString === propsDateAsString;

                return [
                    ...prev,
                    {
                        isToday: isToday,
                        isSelected: isSelected,
                        isDisabled: isDisabled,
                        timestamp: targetDate.getTime(),
                        localDate: targetDateAsString,
                        label: targetDate.getDate().toString()
                    }
                ];
            }, []);

        if (animatedDate) {
            const isForward = dateMs > animatedDate;
            const newFocusDate = new Date(animatedDate);
            const startMonth = new Date(
                newFocusDate.getFullYear(),
                newFocusDate.getMonth(),
                1
            );
            const weekOffset = startMonth.getDay();
            const days = Array(42)
                .fill(0)
                .reduce<CalendarDaysState['days']>((prev, _, index) => {
                    const targetDate = new Date(
                        newFocusDate.getFullYear(),
                        newFocusDate.getMonth(),
                        index - weekOffset + 1
                    );
                    const targetDateAsString = targetDate.toLocaleDateString();

                    return [
                        ...prev,
                        {
                            isToday: false,
                            isSelected: false,
                            isDisabled: false,
                            timestamp: targetDate.getTime(),
                            localDate: targetDateAsString,
                            label: targetDate.getDate().toString()
                        }
                    ];
                }, []);
            const keys = days.map(it => it.localDate);

            console.log(
                "UPDATE STATE",
                isForward,
                date.toLocaleDateString(),
                newFocusDate.toLocaleDateString(),
                response.days.map(it => it.localDate),
                keys
            );

            if (isForward) {
                response.days = [
                    ...days,
                    ...response.days.filter(it => !keys.includes(it.localDate)),
                ];
            }
            else {
                response.days = [
                    ...response.days.filter(it => !keys.includes(it.localDate)),
                    ...days
                ];
            }
        }

        return response;
    }, []);

    const [days, setDays] = useState<CalendarDaysState>(() => {
        return handleUpdateDate(props.focusedDate);
    });

    const handleCellClick = useCallback((timestamp: number) => {
        setDays(prev => {
            if (prev.focusedDate === timestamp) {
                return prev;
            }

            return handleUpdateDate(timestamp);
        });
    }, []);
    const handleAnimationEnd = useCallback(() => {
        animationEnd?.();
        return setDays(handleUpdateDate(props?.focusedDate));
    }, [props?.focusedDate, animationEnd]);

    const isBackward = days.days.length > 42 && props.fromChangingDate! > props.focusedDate;
    const isForward = days.days.length > 42 && props.fromChangingDate! < props.focusedDate;

    useEffect(() => {
        setDays(prev => {
            if (prev.focusedDate === props.focusedDate) {
                return prev;
            }

            return handleUpdateDate(props.focusedDate, props?.fromChangingDate);
        });

        if (props?.fromChangingDate) {
            const timer = setTimeout(() => {
                handleAnimationEnd();
            }, 300);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [
        props.focusedDate,
        props?.fromChangingDate
    ]);
    useLayoutEffect(() => {
        if (!ref.current && !isBackward && !isForward) return;
        const scopeFn = handleAnimationEnd;
        const node = ref.current!;

        if (isBackward) {
            node.scrollTo({
                top: 40 * 6,
                behavior: "auto"
            });
            node.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
        if (isForward) {
            node.scrollTo({
                top: 0,
                behavior: "auto"
            });
            node.scrollTo({
                top: 40 * 6,
                behavior: "smooth"
            });
        }

        const timer = setTimeout(() => {
            scopeFn?.();
        }, 300)
        return () => clearTimeout(timer);
    }, [isBackward, isForward]);

    return <div ref={ref} className={'component-calendar-days'}>
        {days.days.map(item => {
            return <CalendarCell
                key={item.timestamp}
                isSelected={item.isSelected}
                isToday={item.isToday}
                onClick={handleCellClick}
                isDisabled={item.isDisabled}
                timestamp={item.timestamp}
                label={item.label}
            />
        })}
    </div>;
}

export default CalendarDays;