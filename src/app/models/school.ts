import { SchoolEnum } from "./enums/schools";

export class School {
    id: SchoolEnum;
    url: string;
    name: string;
    shortName: string;
    logo: string;
    loginRequired: boolean;

    constructor(id: SchoolEnum, url: string, name: string, shortName: string, logo: string, loginRequired: boolean) {
        this.id = id
        this.url = url
        this.name = name
        this.shortName = shortName
        this.logo = logo
        this.loginRequired = loginRequired
    }
}

export const schoolList = [
    new School(
        SchoolEnum.HKR,
        "schema.hkr.se",
        'Kristianstad University',
        'HKR',
        'hkr_logo.png',
        false,
    ),
    new School(
        SchoolEnum.MAU,
        "schema.mau.se",
        'Malmö University',
        'MAU',
        'mau_logo.png',
        false,
    ),
    new School(
        SchoolEnum.ORU,
        "schema.oru.se",
        'Örebro University',
        'ORU',
        'oru_logo.png',
        false,
    ),
    new School(
        SchoolEnum.LTU,
        "schema.ltu.se",
        'Luleå University of Technology',
        'LTU',
        'ltu_logo.png',
        false,
    ),
    new School(
        SchoolEnum.HIG,
        "schema.hig.se",
        'Högskolan i Gävle',
        'HIG',
        'hig_logo.png',
        false,
    ),
    new School(
        SchoolEnum.SH,
        "kronox.sh.se",
        'Södertörns Högskola',
        'SH',
        'sh_logo.png',
        true,
    ),
    new School(
        SchoolEnum.HV,
        "schema.hv.se",
        'Högskolan Väst',
        'HV',
        'hv_logo.png',
        false,
    ),
    new School(
        SchoolEnum.HB,
        "schema.hb.se",
        'Högskolan i Borås',
        'HB',
        'hb_logo.png',
        false,
    ),
    new School(
        SchoolEnum.MDH,
        "schema.mdh.se",
        'Mälardalen Högskola',
        'MDH',
        'mdh_logo.png',
        true,
    ),
]