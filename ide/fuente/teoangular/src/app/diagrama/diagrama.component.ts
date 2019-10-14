import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';
import { Figuras } from '../shared/figuras';
import { Templates } from '../shared/templates';
import {saveAs} from 'file-saver'
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatDialogCComponent } from '../mat-dialog-c/mat-dialog-c.component';
import { Codigo } from './codigo';

//Se declara la constante $ ya que go.GraphObject.make se utiliza bastante
const $ = go.GraphObject.make;


@Component({
  selector: 'app-diagrama',
  templateUrl: './diagrama.component.html',
  styleUrls: ['./diagrama.component.css']
})
export class DiagramaComponent implements OnInit {
  opened= false;
  //Declaracion de diagramas y paleta, empiezan como nulo y se inicializan luego
  private diagram : go.Diagram = null;
  private palette : go.Palette = null;
  private beginNode : go.Node = null;

  //Declarando variables para alojar los templates
  private diagramTemplate :go.Map<string, go.Node>;
  private paletteTemplate : go.Map<string, go.Node>;
  private linkTemplate ;
  private textogenerado : string
  private nombrearchivo : string = "";
  private conversordecodigo: Codigo;
  //Se define un objeto de tipo go.Model que se recibe mediante input (databinding) desde app-component.ts
  @Input()
  public model : go.Model
  
  /*
  Obtengo la instancia de la clase que hize de Templates.ts en shared/templates.ts
  por medio de inyecciónd e dependencias.
  */
  constructor(templates : Templates, private snackBar : MatSnackBar, public dialog : MatDialog, private cc : Codigo) { 

    //Asignando a las variables que hice mas arriba el valor de los templates que están en
    //la instancia de Templates para despues poderlas ocupar en este contexto.
    this.diagramTemplate = templates.diagramTemplateMap;
    this.paletteTemplate = templates.paletteTemplateMap;
    this.linkTemplate = templates.linkTemplate;
    this.textogenerado = ""
    this.conversordecodigo = cc;
  }
  

  openDialog() : void {
    this.nombrearchivo = ""
    const dialogRef  =this.dialog.open(MatDialogCComponent, {
      width: '250px',
      disableClose : true,
      data: {nombrearchivo  : this.nombrearchivo}
    });
    var checkfalse : boolean 
    dialogRef.afterClosed().subscribe(result => {
      if(result != false){
        this.nombrearchivo = result
        console.log(result)
        this.textogenerado = ""
    this.beginNode = this.diagram.findNodeForKey("inicionode")
    if(this.beginNode != null){
      console.log("Se cargó el nodo de inicio")
      this.textogenerado = this.conversordecodigo.convertircodigo(this.beginNode,"fin", "")
     }else{
      console.log("Error: se debe especificar un inicio para el diagrama")
    }
    this.snackBar.open('¡Se ha generado un nuevo archivo Cpitón!', "¡Entendido!", {duration : 6000}); 
    this.guardarTxt()
      }else{
        return
      }
    })
  }


  verAyuda(){
    window.open('../assets/ayuda.pdf', '_blank')
  }


  //Creando archivo de texto para descargar
  guardarTxt(){
    var blob = new Blob([this.textogenerado], {type : "text/plain;charset=utf-8"});
    saveAs(blob, this.nombrearchivo +".cpit");
  }

  generar(event: Event) {
    this.openDialog();
  }


  guardarDiagrama(){
    var jsonData = this.diagram.model.toJson();
    console.log(jsonData);
    var blob = new Blob([jsonData], {type : "application/json;charset=utf-8"});
    saveAs(blob, "newDiagram.json");
  }


  fileData: File = null;
jsonstring : string = "";
fileUploadProgress: string = null;
uploadedFilePath: string = null;

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  //var mimeType = this.fileData.type;
  //if (mimeType.match(/image\/*/) == null) {
    //return;
  //}
  this.jsonstring = "";
  var reader = new FileReader();      
  reader.readAsText(this.fileData)
  reader.onload = (_event) => { 
    console.log(reader.result)
    this.jsonstring += reader.result; 
  }
}

onSubmit() {
  console.log("Se inicio la carga del diagrama");
  var parsedJson = JSON.parse(this.jsonstring);
  console.log("El JSON generado es", parsedJson);
  this.diagram.model = go.Model.fromJson(parsedJson);
}



  //Este metodo se llama al inicializar el compoennte. Por el momento no hay nada aqui.
  ngOnInit() {
  
  }

  /*Todo el codigo para el diagrama se hace en el metodo ngAfterViewInit
  Esto se hace para garantizarnos que los divs donde contendremos todo ya existen a este punto.
  */
  ngAfterViewInit(){
    
    /*
    Se inicializa el diagrama, se manda a llamar la constante $
    por lo que basicamente se esta llamando 
    go.GraphObject.make() y esta funcion recibe como parametro el tipo de objeto a hacer:
    go.Diagram, luego recibe el id del elemento html donde estará alojado "ideCanvas"
    Finalmente se especifican diferentes parametros para el diagrama mediante tags, todo dentro de { }
    es como un JSON de caracteristicas  
    */
    this.diagram = $(go.Diagram, 'ideCanvas', {
      layout: $(go.TreeLayout,{ //Este layout se encarga de ordenarlos asi bien rikolino
        isOngoing : true,
        treeStyle : go.TreeLayout.StyleAlternating,
        arrangement: go.TreeLayout.ArrangementFixedRoots, //Esto nos permite arrastrar de la paleta sin que lo ordene automatico
        //Propiedades para el arbol
        angle: 90,
        layerSpacing : 50
      })
    }
    );

      //Inicializo mi objeto this.pallete como un tipo go.Palette que sera contenido en un div con id paletteCanvas 
      this.palette = $(go.Palette, "paletteCanvas");      
      //Asignando Templates
      this.diagram.nodeTemplateMap = this.diagramTemplate;
      this.palette.nodeTemplateMap = this.paletteTemplate;
      this.diagram.linkTemplate = this.linkTemplate;


      /*Un nodeDataArray contiene todos los nodos que actualmente existen en un diagrama
       o una paleta (que tambien es un diagrama especial que permite drag n drop)
       por defecto tienen keys, pero se pueden definir mas tags, por ejemplo yo defini el tag
       representa, que va a tener la instruccion que el usuario decida que estará en ese nodo.
       Category le dice qué estilo del templateMap será usado.

       Una paleta y un diagrama pueden tener estilos diferentes, pero si hay una categoría que se 
       llama igual en ambos, esta cambiará si está definida con otro estilo cuando se arrastre.       
       */
      this.palette.model.nodeDataArray = [
        { key: "inicionode", representa: "Inicio", color: "white", category : "inicio"},
        { key: "finnode", representa: "Fin", color: "white", category : "fin"},
        { key: "ifnode", representa: "condicion", color: "white", category : "if"},
        { key: "eifnode", representa: "fin condicion", color: "white", category : "fif"},
        { key: "fornode", representa: "para a rango", variable: "variable", desde:"x", hasta: "y", incremento: "z", color: "white", category : "for"},
        { key: "endfornode", representa: "fin para a rango", color: "white", category: "efor"},
        { key: "procnode", representa: "proceso", color: "white" , category : "proc"},
        { key: "mientrasnode", representa: "mientras", color: "white", category : "mientras"},
        { key: "endmientrasnode", representa: "fin mientras", color: "white", category: "emientras"},
        { key: "hasmnode", representa: "has mientras", color: "white", category : "hasm"},
        { key: "endhasnode", representa: "fin has mientras", color: "white", category: "ehasm"},
        { key: "leernode", representa: "leerstd", color: "white", category : "leer", tipo : "tipo", guardar : "variable"},
        { key: "impnode", representa: "imp", color: "white", category : "imp"},
        { key: "abriranode", representa: "abrir archivo", color: "white", category : "abrira", url : "url", modo : "truncar/añadir", guardar : "variable"},
        { key: "cerraranode", representa: "cerrar archivo", color: "white", category : "cerrara"},
        { key: "leeranode", representa: "leer archivo", color: "white", category : "leera", tipo : "tipo", guardar :"variable"},
        { key: "escanode", representa: "escribir archivo", color: "white", category : "esca"}
      ];

      //igualo el modelo de mi diagrama (que está definido en este archivo) con this.model
      //Esto causa que tenga una referencia al modelo en app-component.ts (por data binding)
      this.diagram.model = this.model;
      //Inicializando el grid en el background del diagrama
      this.diagram.grid.visible = true;
      //Inicializando el controlador para dar deshacer
      this.diagram.undoManager.isEnabled = true;

      //Un listener para ver si doy doble click sobre un nodo. 
      //SI se da doble click, signifca que se debe editar el texto en e edittextblock
      //lo que causara que se modifica la propiedad representa que está bound a la propiedad texto
      this.diagram.addDiagramListener("ObjectDoubleClicked", (e) => {
        this.diagram.commandHandler.editTextBlock();
      });

      //Un listener para ver si doy doble click sobre un nodo. 
      //SI se da doble click, signifca que se debe editar el texto en e edittextblock
      //lo que causara que se modifica la propiedad representa que está bound a la propiedad texto
      /*this.diagram.addDiagramListener("ExternalObjectsDropped", (e) => {
        //this.diagram.commandHandler.editTextBlock();
      });*/
      /*
      Un listener que recibe un evento cada vez que se dibuja un ink entre dos nodos.
      ---Notas: esto se llama cuando el link ya está hecho.----
      el listener recibe un nombre de evento, en este caso, se trata de LinkDrawn
      y una función que se ejecutará al lanzarse el evento.
      Se utiliza notación de typescript porque si se declara una función explicitamente se
      pierde la referencia a "this" y no se puede acceder al diagrama.

      notación typescript:

      (parametros de la función) => { bloque de función }
       el nombre de la función queda implicito.

       en este caso, el parametro es el evento por lo que queda
       (e) => { lo que he escrito en la función}

      */
      this.diagram.addDiagramListener("LinkDrawn", (e) => {
        //la instancia del link se encuentra en e.subject, asi que lo guardé en una variable 
        //para acceder mas facilmente
          var link = e.subject; 
          //SI la categoria del nodo DESDE el que dibuje el link, es "if" entonces hago lo siguiente
          if(link.fromNode.data.category == "if"){
            //Si es el primer link que hago desde el if
            if(link.fromNode.findLinksOutOf(link.fromPort.portId).count == 1){
              //Escribo el label en el link como "verdadero" que indica lo que se hará si se cumple la condición
              this.diagram.model.setDataProperty(
                link.data, "texto", "verdadero"); 
              }else{
                //sino es 1, entonces será "falso" que viene siendo practicamente el else
                this.diagram.model.setDataProperty(
                  link.data, "texto", "falso");
            }}}
        );
  }
}