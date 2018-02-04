export class Company{
	id: number;
	logo: string;
	name: string;
	phone: string;
	email: string;
	website: string;
	facebook: string;
	country_code: string;
	hq_country: string;
	hq_zipcode: number;
	hq_settlement: string;
	hq_address: string;
	bi_name: string;
	bi_country: string;
	bi_zipcode: number;
	bi_settlement: string;
	bi_address: string;
	taxnumber: number;
	mail_name: string;
	mail_country: string;
	mail_zipcode: number;
	mail_settlement: string;
	mail_address: string;
	industry_id: number;
	employeesnum_id: number;
	yearlyincome_id: number;
	founded: number;
	selected: boolean;
	project: number[];
	contact: number[];

	constructor(){
		this.bi_address = "";
		this.bi_country = "";
		this.bi_name = "";
		this.bi_settlement = "";
		this.bi_zipcode = null;
		this.contact = [];
		this.country_code = "";
		this.email = "";
		this.employeesnum_id = null;
		this.facebook = "";
		this.founded = null;
		this.hq_address = "";
		this.hq_country = "";
		this.hq_settlement = "";
		this.hq_zipcode = null;
		this.industry_id = null;
		this.logo = "";
		this.mail_address = "";
		this.mail_country = "";
		this.mail_name = "";
		this.mail_settlement = "";
		this.mail_zipcode = null;
		this.name = "";
		this.phone = "";
		this.project = [];
		this.selected = false;
		this.taxnumber = null;
		this.website = "";
		this.yearlyincome_id = null;
	}
}