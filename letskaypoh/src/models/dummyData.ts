import { SeniorInterface, UserInterface, VisitInterface } from "./interfaces";

export const data: SeniorInterface[] = [
    {   
        id: 1,
        name: 'Mr Lim',
        gender: 'M',
        age: 78,
        languages: ['Hokkien', 'Mandarin'],
        lastVisitedDate: '10 Sep 2024',
        postalCode: '510773',
        address: '10 Hougang Avenue',
        lat: 1.37625,
        lon: 103.93609
    },
    {   
        id: 2,
        name: 'Ms Soh',
        gender: 'F',
        age: 85,
        languages: ['English', 'Cantonese'],
        lastVisitedDate: '13 Sep 2024',
        postalCode: '520123',
        address: 'Blk 15 Tampines Ave 3',
        lat: 1.3731146061720458,
        lon: 103.94956609530045
    }, 
]


export const userData: UserInterface[] = [
    {
        id: 1,
        nric: "T123123A",
        name: 'Josephine',
        age: 24,
        gender: 'F',
        languages: ['English', 'Indonesian'],
        address: 'Pasir Ris',
        totalVisits: 2,
        postalCode: '510773',
        lat: 1.37625,
        lon: 103.93609,
        email: 'josephine.hemingway@gmail.com',
        mobile: '+65 8611 9550'
    }
]

export const visitsData: VisitInterface[] = [
    {   
        id: 1,
        seniorId: 1,
        visitors: [1, 2],
        visitDate: '10 Sep 2024',
        status: 'Upcoming'
    },
    {   
        id: 2,
        seniorId: 1,
        visitors: [3, 2],
        visitDate: '12 Sep 2024',
        status: 'Upcoming'
    },
]
