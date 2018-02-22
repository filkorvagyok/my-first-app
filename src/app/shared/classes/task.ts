export class Task{
	id: number;
	name: string;
	selected: boolean;

	constructor(){
		this.name = "";
    	this.selected = false;
	}
}