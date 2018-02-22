import { SharedAddDataHandler } from './../../shared/services/shared-adddatahandler.service';
import { Location } from '@angular/common';
import { Country } from './../../shared/classes/country';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from './../company.service';
import { Company } from './../../shared/classes/company';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../shared/services/base/base-edit.component';

const TEL_REGEX = /^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX = "\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]";
const FACEBOOK_REGEX = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
const SETTLEMENT_REGEX = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
const TAX_REGEX = /^[a-zA-Z0-9_/-]*$/;
const NUMBER_REGEX = /^[0-9]*$/;

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
	companyForm: FormGroup;
	company: Company;
	edit = false;
	billing = true;
	mail = true;
	countries: Country[];
	

	constructor(
		private route: ActivatedRoute,
		private companyService: CompanyService,
		private fb: FormBuilder,
		protected location: Location,
		private sharedAddDataHandler: SharedAddDataHandler,
		private changeDetector: ChangeDetectorRef
		) {
		super(location);
	}

	ngOnInit() {
		this.initform();
		if(this.companyService.getItems() && !this.company){
			this.setEditCompany();
		}
	}

	ngAfterViewChecked(){
		if(!this.company){
			this.setEditCompany();
		}
		this.changeDetector.detectChanges();
	}

	//Form validitás beállítása
	initform(): void{
		this.companyForm = this.fb.group({
		  'companyName': [null, Validators.required],
		  'companyPhone': [null, Validators.pattern(TEL_REGEX)],
		  'companyEmail': [null, Validators.pattern(EMAIL_REGEX)],
		  'companyWebsite': [null, Validators.pattern(URL_REGEX)],
		  'companyFacebook': [null, Validators.pattern(FACEBOOK_REGEX)],
		  'companyHqCountry': [],
		  'companyBiCountry': [],
		  'companyMailCountry': [],
		  'companyHqZipcode':[],
		  'companyBiZipcode':[],
		  'companyMailZipcode':[],
		  'companyHqSettlement': [null, Validators.pattern(SETTLEMENT_REGEX)],
		  'companyBiSettlement': [null, Validators.pattern(SETTLEMENT_REGEX)],
		  'companyMailSettlement': [null, Validators.pattern(SETTLEMENT_REGEX)],
		  'companyHqAddress': [],
		  'companyBiAddress': [],
		  'companyMailAddress': [],
		  'companyBiname': [],
		  'companyTaxnumber': [null, Validators.pattern(TAX_REGEX)],
		  'companyMailname': [],
		  'companyIndustry': [],
		  'companyEmployeesnum': [],
		  'companyYearlyincome': [],
		  'companyFounded': [null, Validators.compose(
			[Validators.min(578), Validators.max(Number(new Date().getFullYear())),
			Validators.pattern(NUMBER_REGEX)]
		  )],
		});
	}

	setEditCompany(): void{
		if(this.route.snapshot.routeConfig.path == "company/new")
		{
			//Ha az url "company/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "company/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
		}
		this.countries = this.companyService.getCountries();
	}

	setNew(): void{
		this.company = new Company();
		switch (Number(this.route.snapshot.params['num'])) {
			case 1:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.company.project.push(Number(x)));
				break;
			case 2:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.company.contact.push(Number(x)));
				break;
			default:
				break;
		}
	}
	
	setEdit(): void{
		this.company = this.companyService.getItem(+this.route.snapshot.params['id'])
		this.edit = true;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
		this.billing = false;
		this.mail = false;
	}

	//TODO: átszervezni az összes országokkal kapcsolatos mezőket.
	onChangeHqcountry(newValue){
		const actualCountry: Country = this.countries.find((country: Country)=>country.code==newValue);
		if(actualCountry)
		  this.company.hq_country = actualCountry.country;
		return newValue;
	}
	
	onChange(newValue){
		return newValue;
	}
	
	save(): void {
		this.companyService.update(this.company)
		this.navigateBack();
	}
	
	/*Ha a company project mezőjében letároltunk 1 vagy több projekt id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	projekt company mezőjében ennek a cégnek az id-ját.*/
	add(company: Company): void{
		this.companyService.add(company)
		if(company.project.length > 0)
		  this.sharedAddDataHandler.addCompanyToProject(company);
		if(company.contact.length > 0)
		  this.sharedAddDataHandler.addCompanyToContact(company);
		this.navigateBack();
	}
	
	/*Ha be van pipálva, hogy a számlázási adatok azonosak,
	akkor hajtódik végre és lemásolja a székhely adatokat*/
	billing_datas(company: Company): void{
		this.company.bi_address = company.hq_address;
		this.company.bi_country = company.hq_country;
		this.company.bi_name = company.name;
		this.company.bi_settlement = company.hq_settlement;
		this.company.bi_zipcode = company.hq_zipcode;
	}
	
	/*Ha be van pipálva, hogy a levelezési adatok azonosak,
	akkor hajtódik végre és lemásolja a székhely adatokat*/
	mail_datas(company: Company): void{
		this.company.mail_address = company.hq_address;
		this.company.mail_country = company.hq_country;
		this.company.mail_name = company.name;
		this.company.mail_settlement = company.hq_settlement;
		this.company.mail_zipcode = company.hq_zipcode;
	}
	
	
	//Submit lenyomásakor hívódik meg
	onSubmit(company: Company){
		if(this.companyForm.valid)  //Ha a validitás megfelelő
		  this.edit? this.save() : this.add(company);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
		  $(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
		  this.validateAllFormFields(this.companyForm);
		}
	}
}
