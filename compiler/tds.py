import scanner as Scanner
from parametros import *
from enum import Enum

tabla=[]
it=0

class objeto(Enum):
    NUM = 0
    DEC = 1
    TEXTO = 2
    CAR = 3
    VOF = 4
    NUMARRA = 5
    DECARRA = 6
    TEXTOARRA = 7
    CARARRA = 8
    VOFARRA = 9
    FUNCION = 10

class registro(object):
	nombre=" "
	tipo=" "

	def __init__(self,nombre,tipo):
		self.nombre = nombre
		self.tipo = tipo

def poner(k):
    from auxiliares import error
    global it
    it+=1
    if(it > MAXIT):
        error(31)
    else:
        nuevo = registro(Scanner.lex,k)
        tabla.insert(it,nuevo)

def posicion(item):
    #implementando binary search
    #Scanner.lex tiene el ultimo lexema leido
    #print(str(Scanner.lex))

    i = it-1
    while(tabla[i].nombre != item and i>=0):
        i-=1
    return i   		