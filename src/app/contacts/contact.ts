export class Contact{
	id: number;
	company: number[];
	full_name: string;
	surname: string;
	middle_name: string;
	forename: string;
	nickname: string;
	phone: string;
	email: string;
	primary_communication_chanel: string;
	rank: string;
	greeting: string;
	selected: boolean;
	project: number[];
	task: number[];

	constructor(){
		this.company = [];
		this.email = "";
		this.forename = "";
		this.full_name = "";
		this.greeting = "";
		this.middle_name = "";
		this.nickname = "";
		this.project = [];
		this.phone = "";
		this.primary_communication_chanel = "";
		this.rank = "";
		this.selected = false;
		this.surname = "";
		this.task = [];
	}
}