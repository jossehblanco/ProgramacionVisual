import scanner as Scanner
from parametros import *
from enum import Enum
from mensajes_de_error import *
import cpiton as cp

class nivelydireccion(object):
    nivel=0
    direc=0
    def __init__(self, nivel, direc):
        self.nivel = nivel
        self.direc = direc

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

	def __init__(self,nombre,tipo,nivel=nivelydireccion(0,0)):
		self.nombre = nombre
		self.tipo = tipo
		self.nivel = nivel

global it
global tabla
tabla=[]
it=0
tabla.append(registro("",""))

def poner(k,idat):
    from auxiliares import error
    global it
    #print("esto es k",k)
    it+=1
    if(it > MAXIT):
        error(31)
    else:
        nuevo = registro(Scanner.lex,k)
        #print("esto es it",it)
        tabla.insert(it,nuevo)
        mergeSort(tabla)
        if k == objeto.NUM:
            if Scanner.valor > MAXD:
                error(35)
                Scanner.valor=0
            tabla[it].nivel.nivel=cp.niv
            tabla[it].nivel.direc=idat

        #for i in tabla:
         #   print(i.nombre)
        #print("\n-------------\n")

def posicion(item):
    #implementando binary search
    #Scanner.lex tiene el ultimo lexema leido
    #print(str(Scanner.lex))
    #i = it-1
    #while(tabla[i].nombre != item and i>=0):
        #i-=1
    return binarySearch(tabla, 0, len(tabla)-1, item)

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
            
def binarySearch (arr, l, r, x): 
    #print("r=  "+ str(r))
    if r >= l: 
        mid = int (l + (r - l)/2)
        
        if arr[mid].nombre == x: 
            return mid 
          
        elif arr[mid].nombre > x: 
            return binarySearch(arr, l, mid-1, x) 

        else: 
            return binarySearch(arr, mid + 1, r, x) 
  
    else: 
        return -1
  
