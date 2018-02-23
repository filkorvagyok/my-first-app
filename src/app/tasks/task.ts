export class Task{
	id: number;
	name: string;
	selected: boolean;
	company: number[];
	contact: number[];
	project: number[];

	constructor(){
		this.name = "";
		this.selected = false;
		this.company = [];
		this.contact = [];
		this.project = [];
	}
}