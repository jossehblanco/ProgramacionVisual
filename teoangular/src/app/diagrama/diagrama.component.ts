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
        isOngoing : true,
        treeStyle : go.TreeLayout.StyleAlternating,
        arrangement: go.TreeLayout.ArrangementFixedRoots, //Esto nos permite arrastrar de la paleta sin que lo ordene automatico
        //Propiedades para el arbol
        angle: 90,
        layerSpacing : 35,
        alternateAngle : 90,
        alternateLayerSpacing : 35,
        alternateAlignment : go.TreeLayout.AlignmentBus,
        alternateNodeSpacing : 20
      })
    }
    );


    /*Un template define como se va a comportar un nodo
    LO que se está haciendo aqui es definir varias variables con templates.
    Ahorita hay creadas para If, para For y para procedimiento.
    */

    var ifTemplate =
    $(go.Node, "Auto", //Primero se tiene que especificar que es un nodo (hay otros tipos, como grupo, link, etc)
      $(go.Shape, "Diamond", //Shape es el dibujito que va a mostrar, este puede ser custom o predefinido. DIamond ya está predefinido
        { fill: "white" }, //tags de estilo y propiedades, esto lo rellena de blanco
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5, editable: true}, //esto le dice que tengamos un textbox dentro del nodo, con margen de 5 y editable (esto permite escribir cuando lo arrastramos)
        new go.Binding("text", "representa")) //Hacemos un bind de la propiedad text (por defecto de un textblock) con la propiedad representa de cada nodo. Esto se ve  mas adelante cuando se inicializa el nodearray
        //basicamente este binding va a hacer que el text del textblock tenga cualquier cosa que esté en el tag "representa"
      );

    //lo mismo para for
    var forTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Diamond",
        { fill: "gray" },
        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
      $(go.TextBlock, { margin: 5 , editable : true},
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

      //defino el template para los nodos que estarán en la paleta.
      //POr ahora solo muestran colores, esto se tiene que cambiar para que se vea como debe de ser.
      this.palette.nodeTemplate =
      $(go.Node, "Vertical",
        $(go.Shape,
          { width: 14, height: 14, fill: "white" },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
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
        { key: "ifnode", representa: "condicion", color: "red", category : "if"},
        { key: "fornode", representa: "bucle", color: "purple", category : "for"},
        { key: "procnode", representa: "proceso", color: "green" , category : "proc"}

      ];

      //igualo el modelo de mi diagrama (que está definido en este archivo) con this.model
      //Esto causa que tenga una referencia al modelo en app-component.ts (por data binding)
      this.diagram.model = this.model;



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