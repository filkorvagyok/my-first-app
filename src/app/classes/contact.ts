import { Company } from './company';

export class Contact{
	id: number;
	company: Company[];
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
}