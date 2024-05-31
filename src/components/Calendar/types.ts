export type CalendarItem = {
    isToday: boolean,
    isDisabled: boolean,
    isSelected: boolean,
    timestamp: number,
    label: string,
    localDate?: string
}

export enum ChangeMonthDirection {
    backward = 'backward',
    forward = 'forward'
}