import MultiSchoolSchedules from "src/app/models/web/schoolSchedules"

const searchQueryParams = (multiSchoolSchedules: MultiSchoolSchedules[]): string[] => {
    return multiSchoolSchedules.map(value => `${value.schoolId},${value.scheduleIds.join(',')}`);
}


export { searchQueryParams }