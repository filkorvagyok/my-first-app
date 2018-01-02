import { Component, OnInit, Input }        from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';
import { Location }                 from '@angular/common';
import { Company }        from '../../../../shared/classes/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';

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
  companyForm: FormGroup;

  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedAddDataHandler: SharedAddDataHandler,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.companyForm = fb.group({
      'companyName': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDatasForCompanyEdit();
    this.sharedGetDataHandler.getProjects();
    this.sharedGetDataHandler.getContacts();
  }

  /*Kilistázzuk mind az országokat, iparokat, munkások számát és
  az éves bevételeket a szerkesztéshez vagy új cég hozzáadásához*/
  getDatasForCompanyEdit(): void{
    this.companiesDataHandler.getCountries();
    this.companiesDataHandler.getIndustries();
    this.companiesDataHandler.getEmployeesnums();
    this.companiesDataHandler.getYearlyincomes();
  }

  //TODO: átszervezni az összes országokkal kapcsolatos mezőket.
  onChangeHqcountry(newValue){
    this.company.hq_country = this.companiesDataHandler.countries.filter(x=>x.code==newValue)[0].country;
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
      this.validateAllFormFields(this.companyForm);
  }
}