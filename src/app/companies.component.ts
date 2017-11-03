import { Component, OnInit, Inject } from '@angular/core';
import { CompaniesService } from './companies.service';
import { Company } from './company';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(private companiesService: CompaniesService, public dialog: MatDialog){
	}
	public checked: boolean = false;
	companies: Company[] = [];
	disabled = false;


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
	    });
	}

	ngOnInit(): void{
		this.companiesService.getCompanies()
			.then(companies => this.companies = companies);
	}

}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog implements OnInit{

  constructor(private companiesService: CompaniesService,
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  companies: Company[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCompany(id: number): void{
  	
  }

  ngOnInit(): void{
		this.companiesService.getCompanies()
			.then(companies => this.companies = companies);
	}

}