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
	task: number[];

	constructor(){
		this.accountable = [];
		this.checklist = false;
		this.company = [];
		this.currency = "";
		this.deadline = new Date();
		this.description = "";
		this.expenditure = null;
		this.file = "";
		this.income = null;
		this.name = "";
		this.observer = [];
		this.owner = [];
		this.participant = [];
		this.priority = "";
		this.selected = false;
		this.status = "";
		this.stickers = "";
		this.task = [];
	}
}