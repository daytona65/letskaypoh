import { SeniorInterface, UserInterface, VisitInterface } from "./interfaces";

export const data: SeniorInterface[] = [
    {   
        senior_id: 1,
        name: 'Mr Lim',
        gender: 'M',
        age: 78,
        languages: ['Hokkien', 'Mandarin'],
        last_visited_date: '10 Sep 2024',
        postal_code: 510733,
        address: '10 Hougang Avenue',
        lat: 1.37625,
        lon: 103.93609
    },
    {   
        senior_id: 2,
        name: 'Ms Soh',
        gender: 'F',
        age: 85,
        languages: ['English', 'Cantonese'],
        last_visited_date: '13 Sep 2024',
        postal_code: 520123,
        address: 'Blk 15 Tampines Ave 3',
        lat: 1.3731146061720458,
        lon: 103.94956609530045
    }, 
]


export const userData: UserInterface[] = [
    {
        user_id: 1,
        nric: "T123123A",
        name: 'Josephine',
        age: 24,
        gender: 'F',
        languages: ['English', 'Indonesian'],
        address: 'Pasir Ris',
        totalVisits: 2,
        postal_code: 510733,
        lat: 1.37625,
        lon: 103.93609,
        email: 'josephine.hemingway@gmail.com',
        mobile: '+65 8611 9550'
    }
]

export const visitsData: VisitInterface[] = [
    {   
        visit_id: 1,
        senior_id: 1,
        visitor_ids: [1, 2],
        datetime: '10 Sep 2024',
        status: 'Upcoming'
    },
    {   
        visit_id: 2,
        senior_id: 2,
        visitor_ids: [3, 2],
        datetime: '10 Sep 2024',
        status: 'Upcoming'
    }
]
