import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as go from 'gojs';

//Se declara la constante $ ya que go.GraphObject.make se utiliza bastante
const $ = go.GraphObject.make;


@Component({
  selector: 'app-diagrama',
  templateUrl: './diagrama.component.html',
  styleUrls: ['./diagrama.component.css']
})
export class DiagramaComponent implements OnInit {
  //Declaracion de diagramas y paleta, empiezan como nulo y se inicializan luego
  public diagram : go.Diagram = null;
  public palette : go.Palette = null;
  
  //Se define un objeto de tipo go.Model que se recibe mediante input (databinding) desde app-component.ts
  @Input()
  public model : go.Model
  
  //Constructor del componente, si se requiriera inyectar alguna dependencia se hace aqui.
  constructor() { }

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
        isOngoing : false,
        treeStyle : go.TreeLayout.StyleAlternating,
        arrangement: go.TreeLayout.ArrangementFixedRoots, //Esto nos permite arrastrar de la paleta sin que lo ordene automatico
        //Propiedades para el arbol
        angle: 90,
        layerSpacing : 50
      })
    }
    );
    

    //funciones necesarias para que ciertos poligonos funcionen
    var _CachedArrays = [];
    var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
    function tempArray() {
      var temp = _CachedArrays.pop();
      if (temp === undefined)
          return [];
      return temp;
    }
    function freeArray(a) {
      a.length = 0; // clear any references to objects
      _CachedArrays.push(a);
  }
    function createPolygon(sides) {
      // Point[] points = new Point[sides + 1];
      var points = tempArray();
      var radius = .5;
      var center = .5;
      var offsetAngle = Math.PI * 1.5;
      var angle = 0;
      // Loop through each side of the polygon
      for (var i = 0; i < sides; i++) {
          angle = 2 * Math.PI / sides * i + offsetAngle;
          points[i] = new go.Point((center + radius * Math.cos(angle)), (center + radius * Math.sin(angle)));
      }
      // Add the last line
      // points[points.length - 1] = points[0];
      points.push(points[0]);
      return points;
  }

    //aca se definen todas las custom shapes que se desean usar, se puede traer todo el archivo figures.js pero seria muy pesado
    go.Shape.defineFigureGenerator('Parallelogram1', function (shape, w, h) {
        var param1 = shape ? shape.parameter1 : NaN; // indent's percent distance
        if (isNaN(param1))
            param1 = 0.1;
        else if (param1 < -1)
            param1 = -1;
        else if (param1 > 1)
            param1 = 1;
        var indent = Math.abs(param1) * w;
        if (param1 === 0) {
            var geo = new go.Geometry(go.Geometry.Rectangle);
            geo.startX = 0;
            geo.startY = 0;
            geo.endX = w;
            geo.endY = h;
            return geo;
        }
        else {
            var geo = new go.Geometry();
            if (param1 > 0) {
                geo.add(new go.PathFigure(indent, 0)
                    .add(new go.PathSegment(go.PathSegment.Line, w, 0))
                    .add(new go.PathSegment(go.PathSegment.Line, w - indent, h))
                    .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
            }
            else { // param1 < 0
                geo.add(new go.PathFigure(0, 0)
                    .add(new go.PathSegment(go.PathSegment.Line, w - indent, 0))
                    .add(new go.PathSegment(go.PathSegment.Line, w, h))
                    .add(new go.PathSegment(go.PathSegment.Line, indent, h).close()));
            }
            if (indent < w / 2) {
                geo.setSpots(indent / w, 0, (w - indent) / w, 1);
            }
            return geo;
        }
    });

    go.Shape.defineFigureGenerator('Hexagon', function (shape, w, h) {
      var points = createPolygon(6);
      var geo = new go.Geometry();
      var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
      geo.add(fig);
      for (var i = 1; i < 6; i++) {
          fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
      }
      fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
      freeArray(points);
      geo.spot1 = new go.Spot(.07, .25);
      geo.spot2 = new go.Spot(.93, .75);
      return geo;
    });

    go.Shape.defineFigureGenerator('Heptagon', function (shape, w, h) {
      var points = createPolygon(7);
      var geo = new go.Geometry();
      var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
      geo.add(fig);
      for (var i = 1; i < 7; i++) {
          fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
      }
      fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
      freeArray(points);
      geo.spot1 = new go.Spot(.2, .15);
      geo.spot2 = new go.Spot(.8, .85);
      return geo;
    });

    go.Shape.defineFigureGenerator('Pentagon', function (shape, w, h) {
      var points = createPolygon(5);
      var geo = new go.Geometry();
      var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
      geo.add(fig);
      for (var i = 1; i < 5; i++) {
          fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
      }
      fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
      freeArray(points);
      geo.spot1 = new go.Spot(.2, .22);
      geo.spot2 = new go.Spot(.8, .9);
      return geo;
    });

    go.Shape.defineFigureGenerator('ManualInput', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(w, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, .25 * h).close());
      geo.spot1 = new go.Spot(0, .25);
      geo.spot2 = go.Spot.BottomRight;
      return geo;
    });

    go.Shape.defineFigureGenerator('Display', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(.25 * w, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, .75 * w, h, w, 0, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, .25 * w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, .5 * h).close());
      geo.spot1 = new go.Spot(.25, 0);
      geo.spot2 = new go.Spot(.75, 1);
      return geo;
    });

    go.Shape.defineFigureGenerator('File', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(0, 0, true); // starting point
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
      var fig2 = new go.PathFigure(.75 * w, 0, false);
      geo.add(fig2);
      // The Fold
      fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
      geo.spot1 = new go.Spot(0, .25);
      geo.spot2 = go.Spot.BottomRight;
      return geo;
    });

    go.Shape.defineFigureGenerator('Junction', function (shape, w, h) {
      var geo = new go.Geometry();
      var dist = (1 / Math.SQRT2);
      var small = ((1 - 1 / Math.SQRT2) / 2);
      var cpOffset = KAPPA * .5;
      var radius = .5;
      var fig = new go.PathFigure(w, radius * h, true);
      geo.add(fig);
      // Circle
      fig.add(new go.PathSegment(go.PathSegment.Bezier, radius * w, h, w, (radius + cpOffset) * h, (radius + cpOffset) * w, h));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, radius * h, (radius - cpOffset) * w, h, 0, (radius + cpOffset) * h));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, radius * w, 0, 0, (radius - cpOffset) * h, (radius - cpOffset) * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, w, radius * h, (radius + cpOffset) * w, 0, w, (radius - cpOffset) * h));
      var fig2 = new go.PathFigure((small + dist) * w, (small + dist) * h, false);
      geo.add(fig2);
      // X
      fig2.add(new go.PathSegment(go.PathSegment.Line, small * w, small * h));
      fig2.add(new go.PathSegment(go.PathSegment.Move, small * w, (small + dist) * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, (small + dist) * w, small * h));
      return geo;
    });

    go.Shape.defineFigureGenerator('TransmittalTape', function (shape, w, h) {
      var geo = new go.Geometry();
      var param1 = shape ? shape.parameter1 : NaN;
      if (isNaN(param1))
          param1 = .1; // Bottom line's distance from the point on the triangle
      var fig = new go.PathFigure(0, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, (1 - param1) * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, (1 - param1) * h).close());
      geo.spot1 = go.Spot.TopLeft;
      // ??? geo.spot2 = new go.Spot(1, 1 - param1);
      return geo;
    });

    go.Shape.defineFigureGenerator('Buffer', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(0, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, w, .5 * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
      geo.spot1 = new go.Spot(0, .25);
      geo.spot2 = new go.Spot(.5, .75);
      return geo;
    });


    /*Un template define como se va a comportar un nodo
    LO que se está haciendo aqui es definir varias variables con templates.
    Ahorita hay creadas para If, para For y para procedimiento.
    */

    /*---------------------------seleccion--------------------------------------------*/ 
    var ifTemplate =
    $(go.Node, "Auto", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white" }, //tags de estilo y propiedades, esto lo rellena de blanco
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
        { fill: "white" },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa"))
    );

    //mientras
    var mientrasTemplate =
    $(go.Node,"Auto",
      $(go.Shape, "Hexagon",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //has mientras
    var hmientrasTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Heptagon",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );


    /*---------------------------I/O---------------------------------------*/
    //leerstd
    var leerTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "ManualInput",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //imp
    var impTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Display",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    /*----------------------manejo archivos---------------------------------- */
    //abArch
    var abrirATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "File",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //cArch
    var cerrarATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "Junction",    
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //leerArch
    var leerATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "TransmittalTape",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    //escArch
    var escATemplate = 
    $(go.Node, "Auto",
      $(go.Shape, "Buffer",
        {fill: "white"},
        {portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"}),
      $(go.TextBlock, {margin: 5, editable: true},
        new go.Binding("text", "representa"))
    );

    

    //lo mismo para procedimiento
    var procTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Rectangle",
        { fill: "white" },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
        new go.Binding("text", "representa"))
    );


    

    //Se inicializa un Map de key string y value go.Node
    var diagramTemplateMap = new go.Map<string, go.Node>();
    //Añadimos los templates que ya creamos al map que hicimos.
    //BAsicamente si añadimos una propiedad category a un nodo
    //se vendrá a buscar al templateMap para ver si category tiene algun template asignado
        diagramTemplateMap.add("if", ifTemplate);
        diagramTemplateMap.add("for", forTemplate);
        diagramTemplateMap.add("proc", procTemplate);
        diagramTemplateMap.add("mientras", mientrasTemplate);
        diagramTemplateMap.add("hasm", hmientrasTemplate);
        diagramTemplateMap.add("leer", leerTemplate);
        diagramTemplateMap.add("imp", impTemplate);
        diagramTemplateMap.add("abrira", abrirATemplate);
        diagramTemplateMap.add("cerrara", cerrarATemplate);
        diagramTemplateMap.add("leera", leerATemplate);
        diagramTemplateMap.add("esca", escATemplate);


        //Igualo el template map del diagrama con el map que acabo de crear
        this.diagram.nodeTemplateMap = diagramTemplateMap;

        //Template para las flechitas
        this.diagram.linkTemplate =
        $(go.Link,
          $(go.Shape),                           // this is the link shape (the line)
          $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
          {routing: go.Link.Orthogonal}, //Esto hace las lineas mas chivas y menos tontas
          $(go.TextBlock, { text :""}, new go.Binding("text", "texto")) //Le agrego un textblock para tener un label. Hago un bind de la propiedad text con texto.
        );


        //Inicializo mi objeto this.pallete como un tipo go.Palette que sera contenido en un div con id paletteCanvas 
      this.palette = $(go.Palette, "paletteCanvas");

      var paletteTemplateMap = new go.Map<string, go.Node>();

          paletteTemplateMap.add("if", ifTemplate);
          paletteTemplateMap.add("for", forTemplate);
          paletteTemplateMap.add("proc", procTemplate);
          paletteTemplateMap.add("mientras", mientrasTemplate);
          paletteTemplateMap.add("hasm", hmientrasTemplate);
          paletteTemplateMap.add("leer", leerTemplate);
          paletteTemplateMap.add("imp", impTemplate);
          paletteTemplateMap.add("abrira", abrirATemplate);
          paletteTemplateMap.add("cerrara", cerrarATemplate);
          paletteTemplateMap.add("leera", leerATemplate);
          paletteTemplateMap.add("esca", escATemplate);

          this.palette.nodeTemplateMap = paletteTemplateMap;
          

      //defino el template para los nodos que estarán en la paleta.
      //POr ahora solo muestran colores, esto se tiene que cambiar para que se vea como debe de ser.
      this.palette.nodeTemplate =
      $(go.Node, "Vertical",
        $(go.Shape,
          { width: 14, height: 14, fill: "white" },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          new go.Binding("fill", "color"),
          new go.Binding("text", "comando"))
      );

      /*Un nodeDataArray contiene todos los nodos que actualmente existen en un diagrama
       o una paleta (que tambien es un diagrama especial que permite drag n drop)
       por defecto tienen keys, pero se pueden definir mas tags, por ejemplo yo defini el tag
       representa, que va a tener la instruccion que el usuario decida que estará en ese nodo.
       Category le dice qué estilo del templateMap será usado.

       Una paleta y un diagrama pueden tener estilos diferentes, pero si hay una categoría que se 
       llama igual en ambos, esta cambiará si está definida con otro estilo cuando se arrastre.       
       */
      this.palette.model.nodeDataArray = [
        { key: "ifnode", representa: "condicion", color: "white", category : "if"},
        { key: "fornode", representa: "para a rango", color: "white", category : "for"},
        { key: "procnode", representa: "proceso", color: "white" , category : "proc"},
        { key: "mientrasnode", representa: "mientras", color: "white", category : "mientras"},
        { key: "hasmnode", representa: "has mientras", color: "white", category : "hasm"},
        { key: "leernode", representa: "leerstd", color: "white", category : "leer"},
        { key: "impnode", representa: "imp", color: "white", category : "imp"},
        { key: "abriranode", representa: "abrir archivo", color: "white", category : "abrira"},
        { key: "cerraranode", representa: "cerrar archivo", color: "white", category : "cerrara"},
        { key: "leeranode", representa: "leer archivo", color: "white", category : "leera"},
        { key: "escanode", representa: "escribir archivo", color: "white", category : "esca"}
      ];

      //igualo el modelo de mi diagrama (que está definido en este archivo) con this.model
      //Esto causa que tenga una referencia al modelo en app-component.ts (por data binding)
      this.diagram.model = this.model;
      this.diagram.grid.visible = true;


      //Un listener para ver si doy doble click sobre un nodo. 
      //SI se da doble click, signifca que se debe editar el texto en e edittextblock
      //lo que causara que se modifica la propiedad representa que está bound a la propiedad texto
      this.diagram.addDiagramListener("ObjectDoubleClicked", (e) => {
        console.log("se hizo!!!")
        this.diagram.commandHandler.editTextBlock();
      });

      //Un listener para ver si doy doble click sobre un nodo. 
      //SI se da doble click, signifca que se debe editar el texto en e edittextblock
      //lo que causara que se modifica la propiedad representa que está bound a la propiedad texto
      this.diagram.addDiagramListener("ExternalObjectsDropped", (e) => {
        console.log("se hizo!!!")
        this.diagram.commandHandler.editTextBlock();
      });

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
              }
            }
          }
          );
  }
}