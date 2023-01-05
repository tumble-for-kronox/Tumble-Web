import { SchoolEnum } from "./enums/schools";

class School {
    id: SchoolEnum;
    url: string;
    name: string;
    logo: string;
    loginRequired: boolean;

    constructor(id: SchoolEnum, url: string, name: string, logo: string, loginRequired: boolean) {
        this.id = id
        this.url = url
        this.name = name
        this.logo = logo
        this.loginRequired = loginRequired
    }
}

export default [
    new School(
        SchoolEnum.HKR,
        "schema.hkr.se",
        'Kristianstad University',
        'assets/school_logos/hkr_logo.png',
        false,
    ),
    new School(
        SchoolEnum.MAU,
        "schema.mau.se",
        'Malmö University',
        'assets/school_logos/mau_logo.png',
        false,
    ),
    new School(
        SchoolEnum.ORU,
        "schema.oru.se",
        'Örebro University',
        'assets/school_logos/oru_logo.png',
        false,
    ),
    new School(
        SchoolEnum.LTU,
        "schema.ltu.se",
        'Luleå University of Technology',
        'assets/school_logos/ltu_logo.png',
        false,
    ),
    new School(
        SchoolEnum.HIG,
        "schema.hig.se",
        'Högskolan i Gävle',
        'assets/school_logos/hig_logo.png',
        false,
    ),
    new School(
        SchoolEnum.SH,
        "kronox.sh.se",
        'Södertörns Högskola',
        'assets/school_logos/sh_logo.png',
        true,
    ),
    new School(
        SchoolEnum.HV,
        "schema.hv.se",
        'Högskolan Väst',
        'assets/school_logos/hv_logo.png',
        false,
    ),
    new School(
        SchoolEnum.HB,
        "schema.hb.se",
        'Högskolan i Borås',
        'assets/school_logos/hb_logo.png',
        false,
    ),
    new School(
        SchoolEnum.MDH,
        "schema.mdh.se",
        'Mälardalen Högskola',
        'assets/school_logos/mdh_logo.png',
        true,
    ),
]