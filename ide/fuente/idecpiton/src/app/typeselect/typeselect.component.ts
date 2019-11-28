import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-typeselect',
  templateUrl: './typeselect.component.html',
  styleUrls: ['./typeselect.component.css']
})
export class TypeselectComponent implements OnInit {


  ngOnInit(){
    
  }
  tipos : string[]; 
  selected = "num";

  constructor(public dialogRef : MatDialogRef<TypeselectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {     
    this.tipos = data.tipos;
    console.log(data);
    
  }

  onNoClick() : void {
    this.dialogRef.close(false);
  }

}
