import { SchoolEnum } from "../enums/schools";
import Programme from "../programme";

export class Bookmark {
    programme: Programme;
    visible: boolean;
    schoolId: SchoolEnum;

    constructor(programme: Programme, visible: boolean, schoolId: SchoolEnum) {
        this.programme = programme;
        this.visible = visible;
        this.schoolId = schoolId;
    }

    public static fromJson(json: any): Bookmark {
        return new Bookmark(Programme.fromJson(json['programme']), json['visible'], json['schoolId']);
    }

    public toggleVisible() {
        this.visible = !this.visible;
    }
}