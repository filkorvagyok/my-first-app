export abstract class BaseCommonComponent{
	constructor(){}

	protected edit = false;

	protected abstract setEdit(): void;

	protected abstract setNew(): void;
}