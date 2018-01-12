import { Observable } from 'rxjs/Observable';
import { DeleteDialog } from '../../../modules/delete-dialog/components/delete-dialog'
import { MatDialog, MatDialogRef } from '@angular/material';

export abstract class BaseComponent{
	constructor(protected dialog: MatDialog){}

	checked: boolean = false;
	disabled: boolean = true;

	/*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor megjelenítjük a fabbutton-t, különben nem.*/
	protected showChbox(): void{
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

	/*A kiválasztott lsitaelemeg selected mezője automatikusan
	true-ra változik. Ez alapján a törléshez kiválogatjuk azon
	listaelemeket, melyek select-je true és ha a megjelenő DeleDialog-on
	megerősítjük a törlést, akkor meghívjuk az adott cégekre a törlés
	metódust egyenként.*/
	 clickOnDeleteProductButton(arr: any[]): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result===true)
			{
				let array = arr;
				for (var i = 0; i < array.length; i++) {
					if(array[i].selected)
					{
						this.delete(array[i]);
					}
				}
				this.checked = false;
			}
		});
	}

	protected abstract delete(item: any): void;

	protected abstract gotoDetail(item: any): void;

	protected abstract gotoNew(): void;

	protected abstract gotoEdit(): void;

	protected abstract addInstant(name: string, phone?: string, email?: string): void;
}