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
        mergeSort(tabla)
        #for i in tabla:
         #   print(i.nombre)
        #print("\n-------------\n")
def posicion(item):
    #implementando binary search
    #Scanner.lex tiene el ultimo lexema leido
    #print(str(Scanner.lex))

    i = it-1
    while(tabla[i].nombre != item and i>=0):
        i-=1
    return i

def mergeSort(arr): 
    if len(arr) >1: 
        mid = len(arr)//2 
        L = arr[:mid]  
        R = arr[mid:] 
  
        mergeSort(L) 
        mergeSort(R) 
  
        i = j = k = 0
          
        while i < len(L) and j < len(R): 
            if L[i].nombre < R[j].nombre: 
                arr[k] = L[i] 
                i+=1
            else: 
                arr[k] = R[j]
                j+=1
            k+=1
          
        while i < len(L): 
            arr[k] = L[i]
            i+=1
            k+=1
          
        while j < len(R): 
            arr[k] = R[j]
            j+=1
            k+=1
  
