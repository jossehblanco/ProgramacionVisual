import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Codigo{

    textogenerado: string
    lastInstanceOfEndIf: go.Node
    lastInstanceOfEndFor: go.Node
    lastInstanceOfEndMientras: go.Node
    lastInstanceOfEndHasm: go.Node

    constructor(){
      this.textogenerado= "";

    }
    convertircodigo(currentNode :go.Node, endPoint : string = "fin", tab : string = ""){
      this.textogenerado = "";
      return this.convert(currentNode, endPoint, tab)
    }


    /*
    Convert
    go.Node es la clase que denota un nodo en GoJS. Tiene varios métodos de utilidad para esta funcion:
    la función findLnksOutOf() devuelve un iterador con todos los links que salen de un nodo.
    Para el caso del diagrama solo existe un nodo que va a tener MAS de un link (El nodo IF).
    Para el resto de los casos solo habrá un link, pero de igual manera se tiene que recorrer el iterador.

    
    findLinksOutOf() devuelve un iterador de tipo go.Link.
    go.Link tiene la provpiedad "toNode" que devuelve un go.Node al que está conectado un link (ejemplo: N1(fromNode) -----> N2(toNode) )


    La logica es que se maneja el nodo actual (currentNode)
    Un punto final para saber cuando terminar la recursión (endpoint)
    UN manejador de niveles de código (ifs anidados, fors) que se llama tab
    Una string para ir generando el código.


    La recursión empieza con el nodo Begin (QUe ahora está presente por defecto) y termina al llegar al
    Nodo FIN.


    Se calcula el equivalente del nodo en codigo y se suma al string de codigo generado:

    por ejemplo:
    Begin equivale a :v
    IF equivale a si(condicion){
    
    Cada nodo de cada categoría tiene propiedades que pueden ser accesadas por medio de:
    currentNode.data (en la funcion se encuentra siplificado gracias  la linea: const nodo = currentNode.data)
     a partir de este punto se puede acceder a la categoría, key, representa, nombre de variable, etc.

     Al haber sumado el string generado para el nodo actual, se accede al nodo al que esta conectado y se vuelve a llamar la función.

     Para Ifs:
     Se traduce la primera parte si(condicion){
      luego hay dos recursiones que hay que hacer:
          R1: para la condicion verdadera (con el parametro tab + \t para incrementar el nivel de tab)
          sumar el texto generado por la recursion pasada a string.
          sumar }sino{ al texto generado
          R2: para la condicion falsa (con el parametro tab + \t para incrementar el nivel de tab)
          sumar } al texto generado

          R1 Y R2 se mandan a llamar con el endpoint "endif" para que la recursion pare al legar al final del if y no al final del programa.

          El texto se debería haber generado de la siguiente forma:
          si(condicion){
            R1
          }sino{
            R2
          }
          
    */
    convert (currentNode :go.Node, endPoint : string = "fin", tab : string = "") : string{
      
      const nodo = currentNode.data
        if(nodo.category == "inicio"){
          this.textogenerado += ":v\n"
        //Preparando para recursión
        var nuevoNodo : go.Node
        var newNodeIt = currentNode.findLinksOutOf()
        while(newNodeIt.next()){
          var link  = newNodeIt.value;
          nuevoNodo = link.toNode
        }
        this.convert(nuevoNodo, endPoint, tab)
        //Fin Recursion
        }
    
        else if(nodo.category == "dvar"){
        //nombre_variable
        //valor_variable
        //tipo_variable

          this.textogenerado += (tab + nodo.tipo_variable + " " + nodo.nombre_variable + " = " + nodo.valor_variable + ";\n")
          
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          //Se avanza al siguiente nodo
          this.convert(nuevoNodo, endPoint, tab)
          
        }else if(nodo.category == "cvar"){
        //nombre_variable
        //tipo_variable

        this.textogenerado += (tab + nodo.tipo_variable + " " + nodo.nombre_variable + ";\n")
          
        //Preparando para recursión
        var nuevoNodo : go.Node
        var newNodeIt = currentNode.findLinksOutOf()
        while(newNodeIt.next()){
          var link  = newNodeIt.value;
          nuevoNodo = link.toNode
        }
        //Se avanza al siguiente nodo
        this.convert(nuevoNodo, endPoint, tab)

        }else if(nodo.category == "avar"){
        //nombre_variable
        //valor_variable

        this.textogenerado += (tab + nodo.nombre_variable + " = " + nodo.valor_variable + ";\n")
          
        //Preparando para recursión
        var nuevoNodo : go.Node
        var newNodeIt = currentNode.findLinksOutOf()
        while(newNodeIt.next()){
          var link  = newNodeIt.value;
          nuevoNodo = link.toNode
        }
        //Se avanza al siguiente nodo
        this.convert(nuevoNodo, endPoint, tab)
          
        }else if(nodo.category == "if"){
          
          this.textogenerado += (tab + "si(" +nodo.representa+"){\n")
          var nodoif : go.Node
          var nodoelse : go.Node
          var count  = 0
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            if(count == 0){
               nodoif = link.toNode
               count++;
            }else if(count == 1){
              nodoelse = link.toNode
            }
          }
          this.convert(nodoif, "fif", (tab+"\t"))
          this.textogenerado += (tab+"}\n")
          this.textogenerado += (tab+"sino{\n")
          this.convert(nodoelse, "fif",(tab+ "\t"))
          this.textogenerado += (tab+"}\n")
          
          
          var newNodeIt = this.lastInstanceOfEndIf.findLinksOutOf()
          var nuevoNodo : go.Node
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
    
          //mando a llamar para seguir el programa
          //Fin Recursion
        }
        else if(nodo.category == "for"){
          
          this.textogenerado += (tab + "para " +nodo.variable + " rango(" +nodo.desde + "," + nodo.hasta + ","+ nodo.incremento + "){\n")
          var nodofor : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nodofor = link.toNode
          }
          this.convert(nodofor, "efor", (tab+"\t"))
          
          this.textogenerado += (tab + "}\n")
          var newNodeIt = this.lastInstanceOfEndFor.findLinksOutOf()
          var nuevoNodo : go.Node
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //mando a llamar para seguir el programa
          //Fin Recursion
        }
        else if(nodo.category == "mientras"){
          
          this.textogenerado += (tab +"mientras" + "(" + nodo.representa + "){\n")
          var nodomientras : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nodomientras = link.toNode
          }
          this.convert(nodomientras, "emientras", (tab+"\t"))
          
          this.textogenerado +=(tab + "}\n")
          var newNodeIt = this.lastInstanceOfEndMientras.findLinksOutOf()
          var nuevoNodo : go.Node
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //mando a llamar para seguir el programa
          //Fin Recursion
        }
        else if(nodo.category == "hasm"){
          
          this.textogenerado += (tab +"has"+ "{\n")
          var nodohasm : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nodohasm = link.toNode
          }
          this.convert(nodohasm, "ehasm", (tab+"\t"))
          this.textogenerado += (tab+"}mientras("+ nodo.representa +");\n")
          var newNodeIt = this.lastInstanceOfEndHasm.findLinksOutOf()
          var nuevoNodo : go.Node
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //mando a llamar para seguir el programa
          //Fin Recursion
        }
        else if(nodo.category == "leer"){
          
          this.textogenerado += (tab+"leerstd(" + nodo.tipo + "," + nodo.guardar + ");\n")
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
        }
    
        else if(nodo.category == "imp"){
          
          this.textogenerado += (tab+"imp(" + nodo.representa + ");\n")
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
        }
    
        else if(nodo.category == "abrira"){
          
          this.textogenerado += (tab+nodo.guardar + "=abArch(" + nodo.url +","+nodo.modo +");\n")
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
        }
    
        else if(nodo.category == "leera"){
          
          this.textogenerado += (tab+"leerArch(" + nodo.tipo +","+nodo.guardar +");\n")
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
        }
    
        else if(nodo.category == "esca"){
          
          this.textogenerado += (tab+"escArch(" + nodo.representa + ");\n")
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
        }
    
        else if(nodo.category == "cerrara"){
          
          this.textogenerado += (tab+"cArch(" + nodo.representa + ");\n")
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
        }
    
        else if(nodo.category == endPoint){
          if(endPoint=="fin"){
            this.textogenerado += ">:v\n"
          }
          else if(endPoint == "fif"){
            this.lastInstanceOfEndIf = currentNode
            //codigo para if :v
          }else if(endPoint == "efor"){
            this.lastInstanceOfEndFor = currentNode;
          }else if(endPoint == "emientras"){
            this.lastInstanceOfEndMientras = currentNode;
          }else if(endPoint == "ehasm"){
            this.lastInstanceOfEndHasm = currentNode;
          }
        }
        return this.textogenerado
      }

}