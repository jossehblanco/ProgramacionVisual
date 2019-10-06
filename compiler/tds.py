from scanner import *

from enum import Enum

tabla=[]
it=0

class objeto(Enum):
    CONSTANTE = 0
    VARIABLE = 1
    PROCEDIMIENTO = 2

class registro(object):
	nombre=" "
	tipo=" "

	def __init__(self,nombre,tipo):
		self.nombre = nombre
		self.tipo = tipo

def poner(k):
    from auxiliares import error
    it+=1
    if(it > MAXIT):
        error(31)
    else:
        nuevo = registro(lex,k)
        tabla.insert(it,nuevo)

def posicion():
	lex = tabla[0].nombre[:]
	i = it
	while(tabla[i].nombre != lex):
		i-=1
	return i;		
