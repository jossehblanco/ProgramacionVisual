import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;
@Component({
  selector: 'app-palette-bucles',
  templateUrl: './palette-bucles.component.html',
  styleUrls: ['./palette-bucles.component.css']
})
export class PaletteBuclesComponent implements OnInit {

  private paletteBucles: go.Palette = null;

  private paletteTemplateBucles : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateBucles = templates.paletteTemplateBuclesMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.paletteBucles = $(go.Palette, "paletteBucles");

    this.paletteBucles.nodeTemplateMap = this.paletteTemplateBucles;

    this.paletteBucles.model.nodeDataArray = [
      { key: "ifnode", representa: "condicion", color: "white", category : "if"},
      { key: "fornode", representa: "para a rango", variable: "variable", desde:"x", hasta: "y", incremento: "z", color: "white", category : "for"},
      { key: "mientrasnode", representa: "mientras", color: "white", category : "mientras"},
      { key: "hasmnode", representa: "has mientras", color: "white", category : "hasm"}
    ];
}
}
