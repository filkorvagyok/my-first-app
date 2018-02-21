import { CompanyService } from './../../company.service';
import { Router } from '@angular/router';
import { Company } from '../../../shared/classes/company';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../shared/services/base/base-item.component'

@Component({
  selector: '[app-company-item]',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent extends BaseItemComponent implements OnInit {
  @Input() company: Company;

  constructor(
    protected companyService: CompanyService,
    private router: Router
  ) {
    super(companyService);
  }

  navigateToDetail(id: number): void{
    this.router.navigate(['/company/shown', id]);
  }

  ngOnInit() {
  }

}
