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
    
        else if(nodo.category == "proc"){
        
          this.textogenerado += (tab + nodo.representa + ";\n")
          
          //Preparando para recursión
          var nuevoNodo : go.Node
          var newNodeIt = currentNode.findLinksOutOf()
          while(newNodeIt.next()){
            var link  = newNodeIt.value;
            nuevoNodo = link.toNode
          }
          this.convert(nuevoNodo, endPoint, tab)
          //Fin Recursion
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
          this.textogenerado += (tab+"}")
          
          
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