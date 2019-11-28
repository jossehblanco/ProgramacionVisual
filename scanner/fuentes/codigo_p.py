import parametros as params
from auxiliares import error
from auxiliares import estadisticas
import cpiton as cp
from enum import Enum
class fcn(Enum):
    LIT=0
    OPR=1
    CAR=2
    ALM=3
    LLA=4
    INS=5
    SAL=6
    SAC=7
    
class codigo_intermedio(object):
    def __init__(self, f,ni,di):
        self.f = f
        self.ni=ni
        self.di=di

global codigo
global ic
global comentario
global mnemonico

codigo=[]
ic=0

def gen(x,y,z):
    global ic
    if(ic>params.MAXIC-1):
        error(33)
        estadisticas()
        error(1)
    #print("esto es ic:" ,ic)
    codigo.append(codigo_intermedio(x,y,z))
    ic+=1
    return

def listar_p():
    i=0
    global comentario
    global mnemonico
    mnemonico=["LIT","OPR","CAR","ALM","LLA","INS","SAL","SAC"]
    comentario=[";cargar una constante",";operacion aritmetica, relacional o retornar",";cargar una variable",
                     ";almacenamiento/instruccion de asignacion",";llamada a procedimiento",";asignacion de espacio de memoria",
                     ";salto incondicional",";salto condicional"]
    
    print("\n\n --Listado de codigo-p simplificado generado por el compilador--\n\n")
    #print("Esto es ic ",str(ic),str(params.MAXIC))
    for i in range(0,ic):
        aux=codigo[i].f
        print(i," ",mnemonico[aux.value]," ",codigo[i].ni," ",codigo[i].di," ",comentario[aux.value])
      

def escribe_codigo(fuente):
    extension=cp.nombreArch.split(".")
    ext=extension[0]+".p"
    print(ext," ",ic)
    try:
        fil=open(ext,"w")
        for i in range(0,ic):
            aux=codigo[i].f
            print(i," ",mnemonico[aux.value]," ",codigo[i].ni," ",codigo[i].di," ",comentario[aux.value])
            fil.write(str(i)+" "+str(mnemonico[aux.value])+" "+str(codigo[i].ni)+" "+str(codigo[i].di)+"\n")
    except Exception as ex:
        print("Error al crear el archivo")
    
    
