import { CompanyService } from './../../../companies/company.service';

export abstract class BaseItemComponent{
    constructor(protected companyService: CompanyService){}

    /*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor megjelenítjük a fabbutton-t, különben nem.*/
	protected showChbox(): void{
		this.companyService.checkedArray.next($('input[type=checkbox]:checked').map(function(_, el) {
			return $(el).val();
		}).get().map(Number));
	}
}