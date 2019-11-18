import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-palette-io',
  templateUrl: './palette-io.component.html',
  styleUrls: ['./palette-io.component.css']
})
export class PaletteIOComponent implements OnInit {

  private paletteIO: go.Palette = null;

  private paletteTemplateIO : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateIO = templates.paletteTemplateIOMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.paletteIO = $(go.Palette, "paletteIO");

    this.paletteIO.nodeTemplateMap = this.paletteTemplateIO;

    this.paletteIO.model.nodeDataArray = [
      { key: "leernode", representa: "leerstd", color: "white", category : "leer", tipo : "tipo", guardar : "variable"},
      { key: "impnode", representa: "imp", color: "white", category : "imp"}
    ];

  }

}
