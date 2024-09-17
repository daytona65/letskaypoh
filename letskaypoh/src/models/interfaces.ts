export interface SeniorInterface {
    senior_id: number,
	name: string,
	gender: string,
    age: number,
	languages: string[],
	postal_code: number,
	address: string,
	last_visited_date: string,
	lat: number,
	lon: number
}

export interface UserInterface {
	user_id?: number
	nric: string
	name: string
	email: string
	mobile: string
	gender: string
	age: number
	languages: string[]
	postal_code: number
	address: string
	area?: string
	lat?: number
	lon?: number
	totalVisits?: number
}

export interface VisitInterface {
	visit_id?: number
	senior_id: number
	visitor_ids: number[]
	datetime: string
	status: string
}