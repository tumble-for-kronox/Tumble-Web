import { SchoolEnum } from "../enums/schools";

export default class Bookmark {
    scheduleId: string;
    visible: boolean;
    schoolId: SchoolEnum;

    constructor(scheduleId: string, visible: boolean, schoolId: SchoolEnum) {
        this.scheduleId = scheduleId;
        this.visible = visible;
        this.schoolId = schoolId;
    }

    public static fromJson(json: any): Bookmark {
        return new Bookmark(json['scheduleId'], json['visible'], json['schoolId']);
    }

    public toggleVisible() {
        this.visible = !this.visible;
    }
}