import Day from "../scheduling/day"

export class Week {
    weeknumber: number
    days: Day[]

    constructor(weeknumber: number, days: Day[]) {
        this.weeknumber = weeknumber
        this.days = days
    }
}