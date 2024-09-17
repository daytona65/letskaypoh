export interface SeniorInterface {
    id: number,
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
	id?: number
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
	id: number
	seniorId: number
	visitors: number[]
	visitDate: string
	status: string
}