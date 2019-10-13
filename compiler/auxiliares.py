from parametros import *
import lexico as Lexico
from mensajes_de_error import mensaje_de_error
import sys

def error(no):
    from cpiton import fp
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
        Lexico.espec.append(Lexico.simbolo.nulo)
    
    Lexico.espec[34]=Lexico.simbolo.comilladoble
    Lexico.espec[39]=Lexico.simbolo.comillasimple
    Lexico.espec[43]=Lexico.simbolo.mas
    Lexico.espec[45]=Lexico.simbolo.menos
    Lexico.espec[42]=Lexico.simbolo.por
    Lexico.espec[47]=Lexico.simbolo.barra
    Lexico.espec[40]=Lexico.simbolo.parena
    Lexico.espec[41]=Lexico.simbolo.parenc
    Lexico.espec[61]=Lexico.simbolo.igl
    Lexico.espec[46]=Lexico.simbolo.punto
    Lexico.espec[44]=Lexico.simbolo.coma
    Lexico.espec[59]=Lexico.simbolo.puntoycoma
    Lexico.espec[91]=Lexico.simbolo.corchab
    Lexico.espec[93]=Lexico.simbolo.corchcr
    Lexico.espec[123]=Lexico.simbolo.llaveatok
    Lexico.espec[125]=Lexico.simbolo.llavectok

