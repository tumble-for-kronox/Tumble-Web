export class Teacher {
    id: string
    firstName: string
    lastName: string

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }

    static fromJson(json: any): Teacher {
        return new Teacher(
            json['id'],
            json['firstName'],
            json['lastName']
        )
    }
}

export class Location {
    id: string
    name: string
    building: string
    floor: string
    maxSeats: string

    constructor(
        id: string,
        name: string,
        building: string,
        floor: string,
        maxSeats: string
    ) {
        this.id = id
        this.name = name
        this.building = building
        this.floor = floor
        this.maxSeats = maxSeats
    }

    static fromJson(json: any): Location {
        return new Location(
            json['id'],
            json['name'],
            json['building'],
            json['floor'],
            json['maxSeats']
        )
    }
}

export class Course {
    id: string
    swedishName: string
    englishName: string

    constructor(id: string, swedishName: string, englishName: string) {
        this.id = id
        this.swedishName = swedishName
        this.englishName = englishName
    }

    static fromJson(json: any): Course {
        return new Course(
            json['id'],
            json['swedishName'],
            json['englishName']
        )
    }
}