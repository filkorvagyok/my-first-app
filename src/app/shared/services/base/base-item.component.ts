import { TaskService } from './../../../tasks/task.service';
import { ContactService } from './../../../contacts/contact.service';
import { ProjectService } from './../../../projects/project.service';
import { CompanyService } from './../../../companies/company.service';

export abstract class BaseItemComponent{
    constructor(protected service: CompanyService | ProjectService | ContactService | TaskService){}

    /*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor megjelenítjük a fabbutton-t, különben nem.*/
	protected showChbox(): void{
		this.service.checkedArray.next($('input[type=checkbox]:checked').map(function(_, el) {
			return $(el).val();
		}).get().map(Number));
	}
}