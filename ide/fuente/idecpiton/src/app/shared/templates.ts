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
        new go.Binding("text", "representa").makeTwoWay())
    );

    //fin
    var finTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Circle",
        { width: 60, height: 60, fill: "white", stroke: "black", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : false},
        new go.Binding("text", "representa").makeTwoWay())
    );


    /*---------------------------Control de Flujo--------------------------------------------*/ 
    var ifTemplate =
    $(go.Node, "Auto", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white", stroke: "black", strokeWidth: 3 }, //tags de estilo y propiedades, esto lo rellena de blanco
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5, editable: true}, //esto le dice que tengamos un textbox dentro del nodo, con margen de 5 y editable (esto permite escribir cuando lo arrastramos)
        new go.Binding("text", "representa").makeTwoWay()) //Hacemos un bind de la propiedad text (por defecto de un textblock) con la propiedad representa de cada nodo. Esto se ve  mas adelante cuando se inicializa el nodearray
        //basicamente este binding va a hacer que el text del textblock tenga cualquier cosa que esté en el tag "representa"
      );

      var fifTemplate =
    $(go.Node, "Auto", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white", stroke: "red", strokeWidth: 3 }, //tags de estilo y propiedades, esto lo rellena de blanco
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5, editable: false}, //esto le dice que tengamos un textbox dentro del nodo, con margen de 5 y editable (esto permite escribir cuando lo arrastramos)
        new go.Binding("text", "representa").makeTwoWay()) //Hacemos un bind de la propiedad text (por defecto de un textblock) con la propiedad representa de cada nodo. Esto se ve  mas adelante cuando se inicializa el nodearray
        //basicamente este binding va a hacer que el text del textblock tenga cualquier cosa que esté en el tag "representa"
      );
      


    /*----------------------------bluces-----------------------------------------------*/
    //for
    var forTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Pentagon",
        { fill: "white", stroke: "green", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
        $(go.Panel, "Vertical",
        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "para:", margin: 5 }),
        $(go.TextBlock, {  margin: 10,editable: true, stroke : "blue"}, new go.Binding("text", "variable").makeTwoWay())
        ),
        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "rango(", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "desde").makeTwoWay()),
        $(go.TextBlock, { text: ",", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "hasta").makeTwoWay()),
        $(go.TextBlock, { text: ",", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "incremento").makeTwoWay()),
        $(go.TextBlock, { text: ")", margin: 0 })
        ),
        $(go.TextBlock, { text: "", margin: 0 })

        )

    );

    //endfor
    var endforTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Pentagon",
        { fill: "white", stroke: "red", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa").makeTwoWay()),
        
    );

    //mientras
    var mientrasTemplate =
    $(go.Node,"Auto",
      $(go.Shape, "Hexagon",
        {fill: "white", stroke: "green", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //end mientras
    var endmientrasTemplate =
    $(go.Node,"Auto",
      $(go.Shape, "Hexagon",
        {fill: "white", stroke: "red", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //has mientras
    var hmientrasTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Heptagon",
        {fill: "white", stroke: "green", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //end has mientras
    var endhmientrasTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Heptagon",
        {fill: "white", stroke: "red", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );


    /*---------------------------I/O---------------------------------------*/
    //leerstd
    var leerTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "ManualInput",
        {fill: "white", stroke: "black", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
        $(go.Panel, "Vertical",
        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "Tipo:", margin: 5 }),
        $(go.TextBlock, { margin: 10,editable: true, stroke : "blue"}, new go.Binding("text", "tipo").makeTwoWay())
        ),

        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "Guardar en:", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "guardar").makeTwoWay())
        )
        )
    );

    //imp
    var impTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Display",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true, stroke : "blue"},
        new go.Binding("text", "representa").makeTwoWay())
    );

    /*----------------------manejo archivos---------------------------------- */
    //abArch
    var abrirATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "File",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
        $(go.Panel, "Vertical",
        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "URL:", margin: 5 }),
        $(go.TextBlock, { margin: 10,editable: true, stroke : "blue"}, new go.Binding("text", "url").makeTwoWay())
        ),

        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "Modo:", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "modo").makeTwoWay())
        ),
        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "Guardar en:", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "guardar").makeTwoWay())
        )
        )
    );

    //cArch
    var cerrarATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "Junction",    
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true, stroke: "blue"},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //leerArch
    var leerATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "TransmittalTape",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
        $(go.Panel, "Vertical",
        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "Tipo:", margin: 5 }),
        $(go.TextBlock, { margin: 10,editable: true, stroke : "blue"}, new go.Binding("text", "tipo").makeTwoWay())
        ),

        $(go.Panel, "Horizontal",
        $(go.TextBlock, { text: "Guardar en:", margin: 0 }),
        $(go.TextBlock, { margin: 2,editable: true, stroke : "blue"}, new go.Binding("text", "guardar").makeTwoWay())
        )
        )
    );

    //escArch
    var escATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "Buffer",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //lo mismo para procedimiento
    var procTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Rectangle",
        { fill: "white", stroke: "black", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa").makeTwoWay())
    );




    /*

    DEFINIENDO TEMPLATES PARA LA PALETA
    */

    /*---------------------------inicio-fin-------------------------------------------------*/
    //inicio
    var inicioTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Circle",
        { fill: "white", stroke: "grey", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : false},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //fin
    var finTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Circle",
        {  fill: "white", stroke: "black", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : false},
        new go.Binding("text", "representa").makeTwoWay())
    );


    /*---------------------------Control de Flujo--------------------------------------------*/ 
    var ifTemplate2 =
    $(go.Node, "Vertical", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white", stroke: "black", strokeWidth: 3 }, //tags de estilo y propiedades, esto lo rellena de blanco
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5, editable: true}, //esto le dice que tengamos un textbox dentro del nodo, con margen de 5 y editable (esto permite escribir cuando lo arrastramos)
        new go.Binding("text", "representa").makeTwoWay()) //Hacemos un bind de la propiedad text (por defecto de un textblock) con la propiedad representa de cada nodo. Esto se ve  mas adelante cuando se inicializa el nodearray
        //basicamente este binding va a hacer que el text del textblock tenga cualquier cosa que esté en el tag "representa"
      );

      var fifTemplate2 =
    $(go.Node, "Vertical", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white", stroke: "red", strokeWidth: 3 }, //tags de estilo y propiedades, esto lo rellena de blanco
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5, editable: false}, //esto le dice que tengamos un textbox dentro del nodo, con margen de 5 y editable (esto permite escribir cuando lo arrastramos)
        new go.Binding("text", "representa").makeTwoWay()) //Hacemos un bind de la propiedad text (por defecto de un textblock) con la propiedad representa de cada nodo. Esto se ve  mas adelante cuando se inicializa el nodearray
        //basicamente este binding va a hacer que el text del textblock tenga cualquier cosa que esté en el tag "representa"
      );



    /*----------------------------bluces-----------------------------------------------*/
    //for
    var forTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Pentagon",
        { fill: "white", stroke: "green", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //endfor
    var endforTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Pentagon",
        { fill: "white", stroke: "red", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //mientras
    var mientrasTemplate2 =
    $(go.Node,"Vertical",
      $(go.Shape, "Hexagon",
        {fill: "white", stroke: "green", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //end mientras
    var endmientrasTemplate2 =
    $(go.Node,"Vertical",
      $(go.Shape, "Hexagon",
        {fill: "white", stroke: "red", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //has mientras
    var hmientrasTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Heptagon",
        {fill: "white", stroke: "green", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //end has mientras
    var endhmientrasTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Heptagon",
        {fill: "white", stroke: "red", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );


    /*---------------------------I/O---------------------------------------*/
    //leerstd
    var leerTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "ManualInput",
        {fill: "white", stroke: "black", strokeWidth: 3 },
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //imp
    var impTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Display",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    /*----------------------manejo archivos---------------------------------- */
    //abArch
    var abrirATemplate2 = 
    $(go.Node, "Vertical",
      $(go.Shape, "File",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //cArch
    var cerrarATemplate2 = 
    $(go.Node, "Vertical",
      $(go.Shape, "Junction",    
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //leerArch
    var leerATemplate2 = 
    $(go.Node, "Vertical",
      $(go.Shape, "TransmittalTape",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, 
        {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //escArch
    var escATemplate2 = 
    $(go.Node, "Vertical",
      $(go.Shape, "Buffer",
        {fill: "white", stroke: "black", strokeWidth: 3},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa").makeTwoWay())
    );

    //lo mismo para procedimiento
    var procTemplate2 =
    $(go.Node, "Vertical",
      $(go.Shape, "Rectangle",
        { fill: "white", stroke: "black", strokeWidth: 3 },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa").makeTwoWay())
    );


        this.diagramTemplateMap.add("inicio", inicioTemplate);
        this.diagramTemplateMap.add("fin", finTemplate);
        this.diagramTemplateMap.add("if", ifTemplate);
        this.diagramTemplateMap.add("fif", fifTemplate);
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

        this.paletteTemplateMap.add("inicio", inicioTemplate2);
        this.paletteTemplateMap.add("fin", finTemplate2);
        this.paletteTemplateMap.add("if", ifTemplate2);
        this.paletteTemplateMap.add("fif", fifTemplate2);
        this.paletteTemplateMap.add("for", forTemplate2);
        this.paletteTemplateMap.add("efor", endforTemplate2);
        this.paletteTemplateMap.add("proc", procTemplate2);
        this.paletteTemplateMap.add("mientras", mientrasTemplate2);
        this.paletteTemplateMap.add("emientras", endmientrasTemplate2);
        this.paletteTemplateMap.add("hasm", hmientrasTemplate2);
        this.paletteTemplateMap.add("ehasm", endhmientrasTemplate2);
        this.paletteTemplateMap.add("leer", leerTemplate2);
        this.paletteTemplateMap.add("imp", impTemplate2);
        this.paletteTemplateMap.add("abrira", abrirATemplate2);
        this.paletteTemplateMap.add("cerrara", cerrarATemplate2);
        this.paletteTemplateMap.add("leera", leerATemplate2);
        this.paletteTemplateMap.add("esca", escATemplate2);

        this.linkTemplate = $(go.Link,
            $(go.Shape),                           // this is the link shape (the line)
            $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
            {routing: go.Link.Orthogonal}, //Esto hace las lineas mas chivas y menos tontas
            $(go.TextBlock, { text :""}, new go.Binding("text", "texto")) //Le agrego un textblock para tener un label. Hago un bind de la propiedad text con texto.
          );
    }
    
    
    


}