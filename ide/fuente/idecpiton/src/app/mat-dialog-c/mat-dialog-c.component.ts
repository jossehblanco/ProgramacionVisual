import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-mat-dialog-c',
  templateUrl: './mat-dialog-c.component.html',
  styleUrls: ['./mat-dialog-c.component.css']
})

export class MatDialogCComponent implements OnInit {
  nombrearchivo : string
  constructor(public dialogRef : MatDialogRef<MatDialogCComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {     
    this.nombrearchivo = data.nombrearchivo

  }

  onNoClick() : void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}
