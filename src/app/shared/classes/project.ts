export class Project{
	id: number;
	name: string;
	description: string;
	checklist: boolean;
	company: number[];
	file: string;
	accountable: number[];
	owner: number[];
	observer: number[];
	participant: number[];
	deadline: Date;
	status: string;
	priority: string;
	stickers: string;
	currency: string;
	income: number;
	expenditure: number;
	selected: boolean;
}