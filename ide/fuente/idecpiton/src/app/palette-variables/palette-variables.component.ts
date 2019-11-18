import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-palette-variables',
  templateUrl: './palette-variables.component.html',
  styleUrls: ['./palette-variables.component.css']
})
export class PaletteVariablesComponent implements OnInit {

  private paletteVariables: go.Palette = null;

  private paletteTemplateVariables : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateVariables = templates.paletteTemplateVariablesMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.paletteVariables = $(go.Palette, "myDiagramDiv");

    this.paletteVariables.nodeTemplateMap = this.paletteTemplateVariables;

    this.paletteVariables.model.nodeDataArray = [
      { key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"},
      { key: "crearvarnode", representa: "Crear Variable", nombre_variable: "variable", tipo_variable: "tipo variable", color: "white", category: "cvar"},
      { key: "asigvarnode", representa: "Asignar Variable", nombre_variable: "variable", valor_variable: "valor", color: "white", category: "avar"}
    ];
    

  }


}
