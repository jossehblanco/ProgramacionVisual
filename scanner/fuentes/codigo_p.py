import parametros as params
from auxiliares import error
from auxiliares import estadisticas
import cpiton as cp
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

global codigo[MAXIC]
global ic=0;

def gen(fcn,y,z):
    if(ic>MAXIC-1):
        error(33)
        estadisticas()
        error(1)
    codigo[ic]=codigo_intermedio(x,y,z)
    ic++
    return

def listar_p():
    i=0
    global mnemonico=["LIT","OPR","CAR","ALM","LLA","INS","SAL","SAC"]
    global comentario=[";cargar una constante",";operacion aritmetica,                                                            relacional o retornar",";cargar una variable",
                     ";almacenamiento/instruccion de asignacion",";llamada a procedimiento",";asignacion de espacio de memoria",
                     ";salto incondicional",";salto condicional"]
    
    print("\n\n --Listado de codigo-p simplificado generado por el compilador--\n\n")
    
    for i in range(0,ic):
        print("\n "+i+mnemonico[codigo[i].f]+" "+codigo[i].ni+" "+codigo[i].di+" "+comentario[codigo[i].f])
      

def escribe_codigo(fuente):
    extension=cp.nombreArch.split(".")
    ext=extension[0]+".p"
    try:
        fil=open(ext,"w")
        for i in range(0,ic):
            fil.write(""+codigo[i])
        
    except Exception as ex:
        print("Error al crear el archivo")
    
    
