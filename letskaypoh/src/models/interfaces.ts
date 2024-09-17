export interface SeniorInterface {
    id: string,
	name: string,
	gender: string,
    age: number,
	languages: string[],
	postalCode: string,
	address: string,
	lastVisitedDate: string,
	lat: number,
	lon: number
}

export interface UserInterface {
	id?: string
	nric: string
	name: string
	email: string
	mobile: string
	gender: string
	age: number
	languages: string[]
	postalCode: string
	address: string
	area?: string
	lat?: number
	lon?: number
	totalVisits?: number
}

export interface VisitInterface {
	id: string
	seniorId: string
	visitors: string[]
	visitDate: string
	status: string
}