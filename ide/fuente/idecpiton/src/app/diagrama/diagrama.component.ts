import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as go from 'gojs';
import { Figuras } from '../shared/figuras';
import { fromEvent } from 'rxjs';
import { Templates } from '../shared/templates';
import {saveAs} from 'file-saver'
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatDialogCComponent } from '../mat-dialog-c/mat-dialog-c.component';
import { Codigo } from './codigo';
import { FormControl, Validators } from '@angular/forms';
import { Params } from '../shared/params';
import { ApiService } from '../shared/apiservice';
import { ParamsdialogComponent } from '../paramsdialog/paramsdialog.component';

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
  //private paletteInicio : go.Palette = null;
  //private paletteVariables : go.Palette = null;
  /*private paletteFlujo : go.Palette = null;
  private paletteBucles : go.Palette = null;
  private paletteFunciones : go.Palette = null;
  private paletteIO : go.Palette = null;
  private paletteArchivos : go.Palette = null;
  */private beginNode : go.Node = null;

  //Declarando variables para alojar los templates
  private diagramTemplate :go.Map<string, go.Node>;
  //private paletteTemplateInicio : go.Map<string, go.Node>;
  //private paletteTemplateVariables : go.Map<string, go.Node>;
  /*private paletteTemplateFlujo : go.Map<string, go.Node>;
  private paletteTemplateBucles : go.Map<string, go.Node>;
  private paletteTemplateFunciones : go.Map<string, go.Node>;
  private paletteTemplateIO: go.Map<string, go.Node>;
  private paletteTemplateArchivos : go.Map<string, go.Node>;
  */
  private arrayNodes : string[] = [];
  private countNodes : number = 0;
  private linkTemplate ;
  private textogenerado : string
  private nombrearchivo : string = "";
  private conversordecodigo: Codigo;
  private MAXLINEA :number= 1000;
  private MAXDIGIT :number = 5;
  private MAXID :number = 10;
  private isAdendro: number = 1;

  //Se define un objeto de tipo go.Model que se recibe mediante input (databinding) desde app-component.ts
  @Input()
  public model : go.Model
  
  /*
  Obtengo la instancia de la clase que hize de Templates.ts en shared/templates.ts
  por medio de inyecciónd e dependencias.
  */
 @ViewChild('fileinput', {static: false}) finput : ElementRef;
  constructor(templates : Templates, private snackBar : MatSnackBar, public dialog : MatDialog, private cc : Codigo, public servicio : ApiService) { 

    //Asignando a las variables que hice mas arriba el valor de los templates que están en
    //la instancia de Templates para despues poderlas ocupar en este contexto.
    this.diagramTemplate = templates.diagramTemplateMap;
    this.linkTemplate = 
    $(go.Link,
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpGap,
        corner: 5,
        adjusting: go.Link.Scale,
        toShortLength: 4,
        selectable: false,
        layoutConditions: go.Part.LayoutAdded | go.Part.LayoutRemoved,
        // links cannot be selected, so they cannot be deleted
        // If a node from the Palette is dragged over this node, its outline will turn green
        mouseDragEnter: (e, link : go.Link) => { link.isHighlighted = true; this.isAdendro++; console.log(this.isAdendro);},
        mouseDragLeave: (e, link : go.Link) => { link.isHighlighted = false; this.isAdendro--; console.log(this.isAdendro);},
        mouseDrop : (e, obj : go.Link) =>{
          var diagram = e.diagram;
          var model = diagram.model as go.GraphLinksModel;
          var newnode = diagram.selection.first();
          if(!(newnode instanceof go.Node)) return; //hay que revisar si es un if, for while, y toda esa vaina alv


          var fromnode = obj.fromNode;
          var tonode = obj.toNode;
          
          if(newnode.data.category == "if"){
            var truenode : go.Node;
            var falsenode : go.Node;
            var endif : go.Node;
            obj.toNode = newnode;
            (diagram.model as go.GraphLinksModel).addNodeData({ key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"});
            let nit = diagram.nodes.iterator;
            while(nit.hasNext()){
              truenode = nit.value;
            }
            (diagram.model as go.GraphLinksModel).addNodeData({ key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"});
            nit = diagram.nodes.iterator;
            while(nit.hasNext()){
              falsenode = nit.value;
            }
            (diagram.model as go.GraphLinksModel).addNodeData({ key: "eifnode", representa: "fin condicion", color: "white", category : "fif"});
            nit = diagram.nodes.iterator;
            while(nit.hasNext()){          
              endif = nit.value;
            }
            (diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key, fromPort : "Left", to : truenode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key,fromPort : "Right", to : falsenode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: truenode.data.key, to : endif.data.key, toPort : "Left"});
            (diagram.model as go.GraphLinksModel).addLinkData({from: falsenode.data.key, to : endif.data.key, toPort : "Right"});
            (diagram.model as go.GraphLinksModel).addLinkData({from: endif.data.key, to : tonode.data.key});
          }else if(newnode.data.category == "for"){
            var endfornode : go.Node;
            var procesonode : go.Node;
            
            obj.toNode = newnode;
            (diagram.model as go.GraphLinksModel).addNodeData({ key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"});
            let nit = diagram.nodes.iterator;
            while(nit.hasNext()){
               procesonode = nit.value;
            }

            (diagram.model as go.GraphLinksModel).addNodeData({ key: "endfornode", representa: "fin para a rango", color: "white", category: "efor"});
            nit = diagram.nodes.iterator;
            while(nit.hasNext()){
              endfornode = nit.value;
            }

            (diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key,  to : procesonode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: procesonode.data.key,  to : endfornode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: endfornode.data.key,  to : tonode.data.key});
          }else if(newnode.data.category == "mientras"){
            var endmientrasnode : go.Node;
            var procesonode : go.Node;
            
            obj.toNode = newnode;
            (diagram.model as go.GraphLinksModel).addNodeData({ key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"});
            let nit = diagram.nodes.iterator;
            while(nit.hasNext()){
               procesonode = nit.value;
            }

            (diagram.model as go.GraphLinksModel).addNodeData({ key: "endmientrasnode", representa: "fin mientras", color: "white", category: "emientras"});
            nit = diagram.nodes.iterator;
            while(nit.hasNext()){
              endmientrasnode = nit.value;
            }

            (diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key,  to : procesonode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: procesonode.data.key,  to : endmientrasnode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: endmientrasnode.data.key,  to : tonode.data.key});            
          }else if(newnode.data.category == "hasm"){
            var endhasmnode : go.Node;
            var procesonode : go.Node;
            
            obj.toNode = newnode;
            (diagram.model as go.GraphLinksModel).addNodeData({ key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"});
            let nit = diagram.nodes.iterator;
            while(nit.hasNext()){
               procesonode = nit.value;
            }

            (diagram.model as go.GraphLinksModel).addNodeData({ key: "endhasnode", representa: "fin has mientras", color: "white", category: "ehasm"});
            nit = diagram.nodes.iterator;
            while(nit.hasNext()){
              endhasmnode = nit.value;
            }

            (diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key,  to : procesonode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: procesonode.data.key,  to : endhasmnode.data.key});
            (diagram.model as go.GraphLinksModel).addLinkData({from: endhasmnode.data.key,  to : tonode.data.key});
            
          }else {
            obj.toNode = newnode;
            (diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key,  to : tonode.data.key});      
              
          }
         
          /*
          { key: "ifnode", representa: "condicion", color: "white", category : "if"},
          { key: "fornode", representa: "para a rango", variable: "variable", desde:"x", hasta: "y", incremento: "z", color: "white", category : "for"},
          { key: "mientrasnode", representa: "mientras", color: "white", category : "mientras"},
          { key: "hasmnode", representa: "has mientras", color: "white", category : "hasm"}
          */
          

        }
      },
      $(go.Shape, { stroke: "rgb(63,63,63)", strokeWidth: 2 },
      new go.Binding("stroke", "isHighlighted", function(h) { return h ? "chartreuse" : "rgb(63,63,63)"; }).ofObject(),
      new go.Binding("strokeWidth", "isHighlighted", function(h) { return h ? 4 : 2; }).ofObject()),
      $(go.Shape,
        { toArrow: "standard", stroke: null, fill: "black" }),
      $(go.Panel,  // link label for conditionals, normally not visible
        { visible: false, name: "LABEL", segmentIndex: 1, segmentFraction: 0.5 },
        new go.Binding("visible", "", function(link) { return link.fromNode.category === "Condition" && !!link.data.text; }).ofObject(),
        new go.Binding("segmentOffset", "side", function(s) { return s === "Left" ? new go.Point(0, 14) : new go.Point(0, -14); }),
      ),
      $(go.TextBlock, { text :""}, new go.Binding("text", "texto")) //Le agrego un textblock para tener un label. Hago un bind de la propiedad text con texto.
    );

    this.textogenerado = ""
    this.conversordecodigo = cc;
  }
  


  //variables para el form
  private MAXL : string;
  private MAXD : string;
  private MAXI : string;


  paramsConfig() : void {
    const dialogRef  =this.dialog.open(ParamsdialogComponent, {
      width: '336px',
      disableClose : true,
      data: {MAXLINEA : this.MAXLINEA, MAXID : this.MAXID, MAXDIGIT : this.MAXDIGIT}
    });

    var checkfalse : boolean 
    dialogRef.afterClosed().subscribe(result => {
      this.MAXLINEA = (result[0] as number);
      this.MAXDIGIT = (result[1] as number);
      this.MAXID = (result[2] as number);
      console.log(result);
    })
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

  generarDiagrama() : void {
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
    
    this.snackBar.open('¡Se ha generado un nuevo archivo de diagrama!', "¡Entendido!", {duration : 6000}); 
    this.guardarDiagrama()
      }else{
        this.snackBar.open('¡No se guardo el archivo :C!', "¡Entendido!", {duration : 6000}); 
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

  guardarConf(){
    var blob = new Blob([this.textogenerado], {type : "text/plain;charset=utf-8"});
    saveAs(blob, "param.txt");
  }

  guardarDiagrama(){
    var jsonData = this.diagram.model.toJson();
    console.log(jsonData);
    var blob = new Blob([jsonData], {type : "application/json;charset=utf-8"});
    saveAs(blob, this.nombrearchivo+".vcpit");
  }

  


fileData: File = null;
jsonstring : string = "";
fileUploadProgress: string = null;
uploadedFilePath: string = null;

  fileProgress(fileInput: any) {
    console.log("Se produjo un cambio!")
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

generar(event: Event) {
  this.openDialog();
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
    this.onSubmit();
  }
}

generarImagen(){
  var base64string : string | ImageData | HTMLElement=  this.diagram.makeImageData(
    {
      scale: 1,
      background: "white",
      returnType : "string"
  });

   var b64 = (base64string as string).replace('data:image/png;base64,', '');
   console.log(b64);
  var bytechars = atob(b64);
  const byteNumbers = new Array(bytechars.length);
  for (let i = 0; i < bytechars.length; i++) {
    byteNumbers[i] = bytechars.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: 'image/png'});
    saveAs(blob, "param.png");
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
        alignment : go.TreeLayout.AlignmentCenterSubtrees,
        arrangement: go.TreeLayout.ArrangementFixedRoots, //Esto nos permite arrastrar de la paleta sin que lo ordene automatico
        //Propiedades para el arbol
        angle: 90,
        layerSpacing : 50
      })
    }
    );

      //Inicializo mi objeto this.pallete como un tipo go.Palette que sera contenido en un div con id paletteCanvas 
      //this.paletteInicio = $(go.Palette, "paletteInicio");      
      //this.paletteVariables = $(go.Palette, "paletteVariables");   
     /* this.paletteFlujo = $(go.Palette, "paletteFlujo");   
      this.paletteBucles = $(go.Palette, "paletteBucles");   
      this.paletteFunciones = $(go.Palette, "paletteFunciones");   
      this.paletteIO = $(go.Palette, "paletteIO");   
      this.paletteArchivos = $(go.Palette, "paletteArchivos");   
      *///Asignando Templates
      this.diagram.nodeTemplateMap = this.diagramTemplate;
      //this.paletteInicio.nodeTemplateMap = this.paletteTemplateInicio;
      //this.paletteVariables.nodeTemplateMap = this.paletteTemplateVariables;
      /*this.paletteFlujo.nodeTemplateMap = this.paletteTemplateFlujo;
      this.paletteBucles.nodeTemplateMap = this.paletteTemplateBucles;
      this.paletteFunciones.nodeTemplateMap = this.paletteTemplateFunciones;
      this.paletteIO.nodeTemplateMap = this.paletteTemplateIO;
      this.paletteArchivos.nodeTemplateMap = this.paletteTemplateArchivos;
      */

      /*this.palette.groupTemplate =
     $(go.Group, "Vertical",
        {
          layout:
            $(go.GridLayout,
              {
                wrappingWidth: Infinity, wrappingColumn:2,
                cellSize: new go.Size(1, 1), spacing: new go.Size(3, 3)
              })
        },
        $(go.TextBlock, //group title
          { alignment: go.Spot.MiddleTop, font: "Bold 12pt Sans-Serif" },
          new go.Binding("text", "key")),
        $(go.Panel, "Auto",
          $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
            { parameter1: 14,
              fill: "rgba(128,128,128,0.33)"}),
          $(go.Placeholder,    // represents the area of all member parts,
            { padding: 5})  // with some extra padding around them
        )
     );*/
        

      this.diagram.linkTemplate = this.linkTemplate;


      /*Un nodeDataArray contiene todos los nodos que actualmente existen en un diagrama
       o una paleta (que tambien es un diagrama especial que permite drag n drop)
       por defecto tienen keys, pero se pueden definir mas tags, por ejemplo yo defini el tag
       representa, que va a tener la instruccion que el usuario decida que estará en ese nodo.
       Category le dice qué estilo del templateMap será usado.

       Una paleta y un diagrama pueden tener estilos diferentes, pero si hay una categoría que se 
       llama igual en ambos, esta cambiará si está definida con otro estilo cuando se arrastre.       
       */
    
    

      /*this.paletteInicio.model.nodeDataArray = [
        { key: "inicionode", representa: "Inicio", color: "white", category : "inicio"},
        { key: "finnode", representa: "Fin", color: "white", category : "fin"}
      ];

      this.paletteVariables.model.nodeDataArray = [
        { key: "defvarnode", representa: "Definir Variable", nombre_variable: "variable", valor_variable: "valor", tipo_variable: "tipo variable", color: "white", category: "dvar"},
        { key: "crearvarnode", representa: "Crear Variable", nombre_variable: "variable", tipo_variable: "tipo variable", color: "white", category: "cvar"},
        { key: "asigvarnode", representa: "Asignar Variable", nombre_variable: "variable", valor_variable: "valor", color: "white", category: "avar"}
      ];
      /*
      this.paletteFlujo.model.nodeDataArray = [
        { key: "ifnode", representa: "condicion", color: "white", category : "if"},
        { key: "eifnode", representa: "fin condicion", color: "white", category : "fif"}
      ];

      this.paletteBucles.model.nodeDataArray = [
        { key: "fornode", representa: "para a rango", variable: "variable", desde:"x", hasta: "y", incremento: "z", color: "white", category : "for"},
        { key: "endfornode", representa: "fin para a rango", color: "white", category: "efor"},
        { key: "mientrasnode", representa: "mientras", color: "white", category : "mientras"},
        { key: "endmientrasnode", representa: "fin mientras", color: "white", category: "emientras"},
        { key: "hasmnode", representa: "has mientras", color: "white", category : "hasm"},
        { key: "endhasnode", representa: "fin has mientras", color: "white", category: "ehasm"}
      ];

      this.paletteFunciones.model.nodeDataArray =[
        { key: "crearfunc", representa: "Crear Funcion", nombre_funcion: "nombre funcion", color: "white", category: "cfunc"},
        { key: "endcrearfunc", representa: "Fin Crear Funcion", color: "white", category: "ecfunc"},
        { key: "llamarfunc", representa: "Llamar Funcion", nombre_funcion: "nombre funcion", color: "white", category: "lfunc"},
        { key: "endllamarfunc", representa: "  Fin Llamar Funcion", color: "white", category: "elfunc"}
      ];

      this.paletteIO.model.nodeDataArray = [
        { key: "leernode", representa: "leerstd", color: "white", category : "leer", tipo : "tipo", guardar : "variable"},
        { key: "impnode", representa: "imp", color: "white", category : "imp"}
      ];

      this.paletteArchivos.model.nodeDataArray = [
        { key: "abriranode", representa: "abrir archivo", color: "white", category : "abrira", url : "url", modo : "truncar/añadir", guardar : "variable"},
        { key: "cerraranode", representa: "cerrar archivo", color: "white", category : "cerrara"},
        { key: "leeranode", representa: "leer archivo", color: "white", category : "leera", tipo : "tipo", guardar :"variable"},
        { key: "escanode", representa: "escribir archivo", color: "white", category : "esca"}
      ];
      */
      //igualo el modelo de mi diagrama (que está definido en este archivo) con this.model
      //Esto causa que tenga una referencia al modelo en app-component.ts (por data binding)
      this.diagram.model = $(go.GraphLinksModel, { linkFromPortIdProperty: "fromPort",  // required information:
      linkToPortIdProperty: "toPort",      // identifies data property names
      nodeDataArray: [
        { key: "inicionode", representa: "Inicio", color: "white", category : "inicio"},
        { key: "finnode", representa: "Fin", color: "white", category : "fin"}
      ],
      linkDataArray: [
        {from: "inicionode" , to: "finnode"}
      ] })


      /*
new go.GraphLinksModel([
    { key: "inicionode", representa: "Inicio", color: "white", category : "inicio"},
  { key: "finnode", representa: "Fin", color: "white", category : "fin"}], [{from: "inicionode" , to: "finnode"}
]);
      */
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

      notación typescript

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

      this.diagram.addDiagramListener("ExternalObjectsDropped", (e) => {
        
          e.subject.each((node) => {
            var model = e.diagram.model;
            //console.log(this.isAdendro);
            if (model.getCategoryForNodeData(node.data) == "cfunc"){
              this.arrayNodes[this.countNodes] = (model.getKeyForNodeData(node)) as string;
              this.countNodes++; 
              var endfuncnode : go.Node;
              var newnode = this.diagram.selection.first();

              node = newnode;
              (this.diagram.model as go.GraphLinksModel).addNodeData({key: "fcrearfunc", representa: "Fin Crear Funcion", color: "white", category: "ecfunc"});
              let nit = this.diagram.nodes.iterator;
              while(nit.hasNext()){
                endfuncnode = nit.value;
              }
              (this.diagram.model as go.GraphLinksModel).addLinkData({from: newnode.data.key, to : endfuncnode.data.key});            
            }
            for(let i = 0; i < this.arrayNodes.length; i++){
              console.log(this.diagram.findNodeForKey(this.arrayNodes[i]));               
            }  
        }); 
        }
        
      );
      
           
  }
  
}