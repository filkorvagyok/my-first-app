import { Component, OnInit, Input }        from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';
import { Location }                 from '@angular/common';
import { Company }        from '../../../../shared/classes/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';

const TEL_REGEXP = /^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/;
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEXP = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
const FACEBOOK_REGEXP = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
const SETTLEMENT_REGEXP = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
const TAX_REGEXP = /^[a-zA-Z0-9_/-]*$/;
const NUMBER_REGEXP = /^[0-9]*$/;

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})

export class CompanyEditComponent implements OnInit {
  @Input() company: Company;
  @Input() billing: boolean;
  @Input() mail: boolean;
  @Input() edit: boolean;
  @Input() countries;
  @Input() industries;
  @Input() employeesnums;
  @Input() yearlyincomes;
  companyForm: FormGroup;

  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedAddDataHandler: SharedAddDataHandler,
    private location: Location,
    private fb: FormBuilder
  ) {}

  initform(): void{
    this.companyForm = this.fb.group({
      'companyName': [null, Validators.required],
      'companyPhone': [null, Validators.pattern(TEL_REGEXP)],
      'companyEmail': [null, Validators.pattern(EMAIL_REGEXP)],
      'companyWebsite': [null, Validators.pattern(URL_REGEXP)],
      'companyFacebook': [null, Validators.pattern(FACEBOOK_REGEXP)],
      'companyCountry': [],
      'companyZipcode':[],
      'companyHqSettlement': [null, Validators.pattern(SETTLEMENT_REGEXP)],
      'companyBiSettlement': [null, Validators.pattern(SETTLEMENT_REGEXP)],
      'companyMailSettlement': [null, Validators.pattern(SETTLEMENT_REGEXP)],
      'companyAddress': [],
      'companyBiname': [],
      'companyTaxnumber': [null, Validators.pattern(TAX_REGEXP)],
      'companyMailname': [],
      'companyIndustry': [],
      'companyEmployeesnum': [],
      'companyYearlyincome': [],
      'companyFounded': [null, Validators.compose(
        [Validators.min(578), Validators.max(Number(new Date().getFullYear())),
        Validators.pattern(NUMBER_REGEXP)]
      )],
    });
  }

  ngOnInit(): void {
    //this.getDatasForCompanyEdit();
    this.sharedGetDataHandler.getProjects();
    this.sharedGetDataHandler.getContacts();
    this.initform();
    console.log();
  }

  /*Kilistázzuk mind az országokat, iparokat, munkások számát és
  az éves bevételeket a szerkesztéshez vagy új cég hozzáadásához*/
  /*getDatasForCompanyEdit(): void{
    this.companiesDataHandler.getCountries();
    this.companiesDataHandler.getIndustries();
    this.companiesDataHandler.getEmployeesnums();
    this.companiesDataHandler.getYearlyincomes();
  }*/

  //TODO: átszervezni az összes országokkal kapcsolatos mezőket.
  onChangeHqcountry(newValue){
    let actualCountry = this.companiesDataHandler.countries.filter(x=>x.code==newValue)[0]
    if(actualCountry)
      this.company.hq_country = actualCountry.country;
    return newValue;
  }

  onChange(newValue){
    return newValue;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
      this.companiesApiService.updateCompany(this.company)
        .subscribe(() => this.goBack());
  }

  add(company: Company): void{
    this.companiesApiService.addCompany(company)
      .subscribe(() => {
        this.addCompanyTo(company);
        this.goBack();
      });
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

  /*Ha a company project mezőjében letároltunk 1 vagy több projekt id-ját,
  akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
  projekt company mezőjében ennek a cégnek az id-ját.*/
  addCompanyTo(company: Company)
  {
    if(company.project.length > 0)
      this.sharedAddDataHandler.addCompanyToProject(company);
    if(company.contact.length > 0)
      this.sharedAddDataHandler.addCompanyToContact(company);
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  onSubmit(company: Company){
    if(this.companyForm.valid)
      this.edit? this.save() : this.add(company);
    else
      $(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000);
      this.validateAllFormFields(this.companyForm);
  }
}