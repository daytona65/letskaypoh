export interface SeniorInterface {
    id: string,
    title: string,
	name: string,
	gender: string,
    age: number,
	languages: string[],
	lastVisitedDate: string,
	postalCode: string,
	imageUrl: string,
	lat: number,
	lon: number
}

export interface UserInterface {
	id?: string
	name: string
	nric: string
	email: string
	mobile: string
	age: number
	gender: string
	languages: string[]
	postalCode: string
	address: string
	area?: string
	lat?: number
	lon?: number
	totalVisits?: number
}

export interface VisitInterface {
	userId: string
	seniorId: string
	visitDate: string
}