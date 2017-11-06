import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Company }        from './company';
import { CompaniesService } from './companies.service';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: [ './company-edit.component.css' ]
})
export class CompanyEditComponent implements OnInit {
  company: Company;

  constructor(
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.companiesService.getCompany(+params.get('id')))
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

  }
}