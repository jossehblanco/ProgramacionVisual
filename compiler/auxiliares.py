from parametros import *
from lexico import *
#from pl0 import *


def error(no):
    fp.closed
    print("\n^ error"+ mensaje_de_error[no]+"\n")
    sys.exit()
    return
    

def estadisticas():
    print("\n\n***  Estadisticas Globales  ***\n")
    print("***   No se detectaron errores  ***")
    return

def inicializar_espec():
    i = 0
    for i in range (0,255):
        espec[i]= simbolo.nulo
    
    espec[43]=simbolo.mas
    espec[45]=simbolo.menos
    espec[42]=simbolo.por
    espec[47]=simbolo.barra
    espec[40]=simbolo.parena
    espec[41]=simbolo.parenc
    espec[61]=simbolo.igl
    espec[46]=simbolo.punto
    espec[44]=simbolo.coma
    espec[59]=simbolo.puntoycoma

