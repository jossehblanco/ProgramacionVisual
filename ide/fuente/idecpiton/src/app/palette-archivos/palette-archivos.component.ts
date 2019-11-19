import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Templates } from '../shared/templates';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from '../shared/apiservice';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-palette-archivos',
  templateUrl: './palette-archivos.component.html',
  styleUrls: ['./palette-archivos.component.css']
})
export class PaletteArchivosComponent implements OnInit {

  private paletteArchivo: go.Palette = null;

  private paletteTemplateArchivo : go.Map<string, go.Node>;


  @Input()
  public model : go.Model


  constructor(templates : Templates, public dialog : MatDialog, public servicio : ApiService) { 

    this.paletteTemplateArchivo = templates.paletteTemplateArchivosMap;
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.paletteArchivo = $(go.Palette, "paletteArchivos");

    this.paletteArchivo.nodeTemplateMap = this.paletteTemplateArchivo;

    this.paletteArchivo.model.nodeDataArray = [
      { key: "leernode", representa: "leerstd", color: "white", category : "leer", tipo : "tipo", guardar : "variable"},
      { key: "impnode", representa: "imp", color: "white", category : "imp"},
      { key: "abriranode", representa: "abrir archivo", color: "white", category : "abrira", url : "url", modo : "truncar/añadir", guardar : "variable"},
      { key: "cerraranode", representa: "cerrar archivo", color: "white", category : "cerrara"},
      { key: "leeranode", representa: "leer archivo", color: "white", category : "leera", tipo : "tipo", guardar :"variable"},
      { key: "escanode", representa: "escribir archivo", color: "white", category : "esca"}
    ];

}
}
