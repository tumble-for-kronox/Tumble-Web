import { SchoolEnum } from "../enums/schools";

export default class MultiSchoolSchedules {
    schoolId: SchoolEnum
    scheduleIds: string[]

    constructor(schoolId: SchoolEnum, scheduleIds: string[]) {
        this.schoolId = schoolId;
        this.scheduleIds = scheduleIds;
    }
}