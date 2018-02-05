import { Location } from '@angular/common';
import { DeleteDialog } from '../../../modules/delete-dialog/components/delete-dialog'
import { MatDialog, MatDialogRef } from '@angular/material';

export abstract class BaseDetailComponent{
	constructor(protected location: Location, protected dialog: MatDialog){}

	goBack(): void {
		this.location.back();
	}

	//protected abstract gotoEdit(): void;

	/*Megjelenik a DeleteDialog és ha ott megerősítettük a törlést,
  	akkor meghívjuk a törlés funkciót*/
	clickOnDeleteProductButton(item: any): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result === true)
			{
				this.delete(item);
			}
		});
	}

	protected abstract delete(item: any): void;
}