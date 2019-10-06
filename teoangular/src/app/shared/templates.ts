import * as go from 'gojs';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Figuras } from './figuras';
const $ = go.GraphObject.make;
//Definiendo clase como inyectable para poder hacer uso de las instancias de templates y tempate maps
//Que declare aqui
@Injectable({providedIn: 'root'})

//Esta clase contiene ahora la creación de los templates
//Se puede añadir o quitar, y el codigo del componente Diagrama no tiene por que cambiar.
export class Templates{    
    
    //Esto va a ser lo que yo pueda accesar cuando inyecte la dependencia
    //Se tiene que igualar a otra variable si se usa en otra clase (como lo hice en diagrama.componente.ts)
    public paletteTemplateMap :go.Map<string, go.Node>;
    public diagramTemplateMap : go.Map<string, go.Node>;
    public linkTemplate;


    //Inyecto la dependencia de figuras.ts para poder hacer uso de la funcion
    //que define las figuras antes de declarar las templates      
    constructor(figuras: Figuras){
        //Ejecuto el metodo definir figuras
        figuras.definirFiguras();

        //inicializo los maps para que no estén undefined
        this.diagramTemplateMap = new go.Map<string, go.Node>();
        this.paletteTemplateMap = new go.Map<string, go.Node>();



    /*Un template define como se va a comportar un nodo
    Lo que se está haciendo aqui es definir varias variables con templates.
    */

    /*---------------------------inicio-fin-------------------------------------------------*/
    //inicio
    var inicioTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Circle",
        { width: 60, height: 60, fill: "white", stroke: "grey", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : false},
        new go.Binding("text", "representa"))
    );

    //fin
    var finTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Circle",
        { width: 60, height: 60, fill: "white", stroke: "black", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : false},
        new go.Binding("text", "representa"))
    );


    /*---------------------------Control de Flujo--------------------------------------------*/ 
    var ifTemplate =
    $(go.Node, "Auto", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white", stroke: "black", strokeWidth: 3 }, //tags de estilo y propiedades, esto lo rellena de blanco
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5, editable: true}, //esto le dice que tengamos un textbox dentro del nodo, con margen de 5 y editable (esto permite escribir cuando lo arrastramos)
        new go.Binding("text", "representa")) //Hacemos un bind de la propiedad text (por defecto de un textblock) con la propiedad representa de cada nodo. Esto se ve  mas adelante cuando se inicializa el nodearray
        //basicamente este binding va a hacer que el text del textblock tenga cualquier cosa que esté en el tag "representa"
      );



    /*----------------------------bluces-----------------------------------------------*/
    //for
    var forTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Pentagon",
        { fill: "white", stroke: "green", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa"))
    );

    //endfor
    var endforTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Pentagon",
        { fill: "white", stroke: "red", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa"))
    );

    //mientras
    var mientrasTemplate =
    $(go.Node,"Auto",
      $(go.Shape, "Hexagon",
        {fill: "white", stroke: "green", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //end mientras
    var endmientrasTemplate =
    $(go.Node,"Auto",
      $(go.Shape, "Hexagon",
        {fill: "white", stroke: "red", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //has mientras
    var hmientrasTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Heptagon",
        {fill: "white", stroke: "green", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //end has mientras
    var endhmientrasTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Heptagon",
        {fill: "white", stroke: "red", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );


    /*---------------------------I/O---------------------------------------*/
    //leerstd
    var leerTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "ManualInput",
        {fill: "white", stroke: "black", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //imp
    var impTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Display",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    /*----------------------manejo archivos---------------------------------- */
    //abArch
    var abrirATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "File",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //cArch
    var cerrarATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "Junction",    
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //leerArch
    var leerATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "TransmittalTape",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //escArch
    var escATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "Buffer",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //lo mismo para procedimiento
    var procTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Rectangle",
        { fill: "white", stroke: "black", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa"))
    );



        this.diagramTemplateMap.add("inicio", inicioTemplate);
        this.diagramTemplateMap.add("fin", finTemplate);
        this.diagramTemplateMap.add("if", ifTemplate);
        this.diagramTemplateMap.add("for", forTemplate);
        this.diagramTemplateMap.add("efor", endforTemplate);
        this.diagramTemplateMap.add("proc", procTemplate);
        this.diagramTemplateMap.add("mientras", mientrasTemplate);
        this.diagramTemplateMap.add("emientras", endmientrasTemplate);
        this.diagramTemplateMap.add("hasm", hmientrasTemplate);
        this.diagramTemplateMap.add("ehasm", endhmientrasTemplate);
        this.diagramTemplateMap.add("leer", leerTemplate);
        this.diagramTemplateMap.add("imp", impTemplate);
        this.diagramTemplateMap.add("abrira", abrirATemplate);
        this.diagramTemplateMap.add("cerrara", cerrarATemplate);
        this.diagramTemplateMap.add("leera", leerATemplate);
        this.diagramTemplateMap.add("esca", escATemplate);

        this.paletteTemplateMap.add("inicio", inicioTemplate);
        this.paletteTemplateMap.add("fin", finTemplate);
        this.paletteTemplateMap.add("if", ifTemplate);
        this.paletteTemplateMap.add("for", forTemplate);
        this.paletteTemplateMap.add("efor", endforTemplate);
        this.paletteTemplateMap.add("proc", procTemplate);
        this.paletteTemplateMap.add("mientras", mientrasTemplate);
        this.paletteTemplateMap.add("emientras", endmientrasTemplate);
        this.paletteTemplateMap.add("hasm", hmientrasTemplate);
        this.paletteTemplateMap.add("ehasm", endhmientrasTemplate);
        this.paletteTemplateMap.add("leer", leerTemplate);
        this.paletteTemplateMap.add("imp", impTemplate);
        this.paletteTemplateMap.add("abrira", abrirATemplate);
        this.paletteTemplateMap.add("cerrara", cerrarATemplate);
        this.paletteTemplateMap.add("leera", leerATemplate);
        this.paletteTemplateMap.add("esca", escATemplate);

        this.linkTemplate = $(go.Link,
            $(go.Shape),                           // this is the link shape (the line)
            $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
            {routing: go.Link.Orthogonal}, //Esto hace las lineas mas chivas y menos tontas
            $(go.TextBlock, { text :""}, new go.Binding("text", "texto")) //Le agrego un textblock para tener un label. Hago un bind de la propiedad text con texto.
          );
    }
    
    
    


}