import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog{

  constructor(
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