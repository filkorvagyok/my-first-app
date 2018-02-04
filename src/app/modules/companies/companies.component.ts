import { CompanyService } from './company.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompaniesComponent{
    constructor(private companyService: CompanyService,
    private router: Router){
    }

    createNewItem(): void{
        this.router.navigate(["/company/new"]);
    }
}