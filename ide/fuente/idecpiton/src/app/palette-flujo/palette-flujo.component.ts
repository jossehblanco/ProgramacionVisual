import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-palette-flujo',
  templateUrl: './palette-flujo.component.html',
  styleUrls: ['./palette-flujo.component.css']
})
export class PaletteFlujoComponent implements OnInit {

  private paletteFlujo: go.Palette = null;

  private paletteTemplateFlujo : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateFlujo = templates.paletteTemplateFlujoMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.paletteFlujo = $(go.Palette, "paletteFlujo");

    this.paletteFlujo.nodeTemplateMap = this.paletteTemplateFlujo;

    this.paletteFlujo.model.nodeDataArray = [
      { key: "ifnode", representa: "condicion", color: "white", category : "if"},
      { key: "eifnode", representa: "fin condicion", color: "white", category : "fif"}
    ];

  }

}
