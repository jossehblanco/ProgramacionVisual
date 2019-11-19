import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-paramsdialog',
  templateUrl: './paramsdialog.component.html',
  styleUrls: ['./paramsdialog.component.css']
})
export class ParamsdialogComponent implements OnInit {

  MAXLINEA : number; 
  MAXDIGIT : number; 
  MAXID : number;
  constructor(public dialogRef : MatDialogRef<ParamsdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {     
    this.MAXLINEA = data.MAXLINEA;
    this.MAXDIGIT = data.MAXDIGIT;
    this.MAXID = data.MAXID;
    
  }

  onNoClick() : void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}
