import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-palette-funciones',
  templateUrl: './palette-funciones.component.html',
  styleUrls: ['./palette-funciones.component.css']
})
export class PaletteFuncionesComponent implements OnInit {

  private paletteFunciones: go.Palette = null;

  private paletteTemplateFunciones : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateFunciones = templates.paletteTemplateFuncionesMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.paletteFunciones = $(go.Palette, "paletteFunciones");

    this.paletteFunciones.nodeTemplateMap = this.paletteTemplateFunciones;

    this.paletteFunciones.model.nodeDataArray =[
      { key: "crearfunc", representa: "Crear Funcion", nombre_funcion: "nombre funcion", color: "white", category: "cfunc"},
      { key: "llamarfunc", representa: "Llamar Funcion", nombre_funcion: "nombre funcion", color: "white", category: "lfunc"}
    ];

  }

}
