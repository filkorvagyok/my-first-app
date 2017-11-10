import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from './company';
import { CompaniesService } from './companies.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';



@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(private http: HttpClient, private companiesService: CompaniesService,
		private router: Router, public dialog: MatDialog){}

	checked: boolean = false;
	companies: Company[] = [];
	selectedCompany: Company;
	selectedCompanies = [];


	disabled = false;

	getCompanies(): void{
		this.companiesService
        .getCompanies()
        .subscribe(companies => this.companies = companies);
	}

	showChbox(): void{
		var show = 0;
		this.disabled = false;
		$('input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
			if (show > 1) {
				this.disabled = true;
			}
		} else {
			this.checked = false;
		}
	}

	openDeleteDialog(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
	    dialogRef.afterClosed().subscribe(result => {
	    	console.log('The dialog was closed');
	      	if(dialogRef.componentInstance.delete)
	      	{
	      		this.companies=this.delete();
	      	}
	    });
	    
	}

	delete(): Company[] {
		for (var i = 0;  i < this.companies.length; i++) {
			if(this.companies[i].selected)
			{
				this.companiesService
				.delete(this.companies[i].id);
				//this.companies = this.companies.filter(h => h !== this.companies[i]);
			}
		}
		return this.companies
	}

	/*delete(company: Company): void {
		this.companies = this.companies.filter(h => h !== company);
    	this.companiesService.delete(company).subscribe();
	}*/

	ngOnInit(): void{
		this.getCompanies();
	}

	onSelect(company: Company): void {
    	this.companies
  	}

  	gotoDetail(company: Company): void{
  		this.selectedCompany = company;
  		this.router.navigate(['/company/shown', this.selectedCompany.id]);
  	}

  	gotoEdit(): void{
  		this.router.navigate(['/company/edit', this.selectedCompany.id]);
  	}

}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog{

  constructor(private companiesService: CompaniesService,
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public delete: boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
  	this.delete = true;
    this.dialogRef.close();
  }

}