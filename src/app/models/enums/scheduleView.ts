export enum ScheduleView {
    SCHEDULE = "schedule",
    WEEK = "week",
    MONTH = "month"
}

export const scheduleViewValues: Record<string, ScheduleView> = {
    "schedule": ScheduleView.SCHEDULE,
    "week": ScheduleView.WEEK,
    "month": ScheduleView.MONTH
}