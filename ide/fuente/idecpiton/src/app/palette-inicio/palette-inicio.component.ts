import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-palette-inicio',
  templateUrl: './palette-inicio.component.html',
  styleUrls: ['./palette-inicio.component.css']
})
export class PaletteInicioComponent implements OnInit {

  private paletteInicio: go.Palette = null;

  private paletteTemplateInicio : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateInicio = templates.paletteTemplateInicioMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){

    this.paletteInicio = $(go.Palette, "paletteInicio");

    this.paletteInicio.nodeTemplateMap = this.paletteTemplateInicio;

    this.paletteInicio.model.nodeDataArray = [
      { key: "inicionode", representa: "Inicio", color: "white", category : "inicio"},
      { key: "finnode", representa: "Fin", color: "white", category : "fin"}
    ];

  }

}
