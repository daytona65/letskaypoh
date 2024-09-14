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
	id: string
	name: string
	age: number
	gender: string
	languages: string[]
	area: string
	postalCode: string
	lat: number
	lon: number
	totalVisits: number
	email: string
	mobile: string
}

export interface Visits {
	userId: string
	seniorId: string
	visitDate: string
}