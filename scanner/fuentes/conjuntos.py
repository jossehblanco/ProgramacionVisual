import parametros as params
import lexico as Lexico
import scanner as Scanner
from auxiliares import error
from auxiliares import show_error

#tokens iniciales de declaracion de variables y procedimientos
tokini = [0 for i in range (params.NOTOKENS)]
#tokens iniciales de instruccion
#tokini = [0 for i in range (params.NOTOKENS)]

set_arranque = [0 for i in range (params.NOTOKENS)]

#init set no se copia pues ya lo hago arriba

def copia_set(conjunto, conjunto2):
	#copiando lo del conjunto2 a conjunto
    for i in range (0,params.NOTOKENS):
        conjunto[i] = conjunto2[i]

def union_set(conjunto1,conjunto2,conjunto3):
    copia_set(conjunto1,conjunto2)
    if(not all(conjunto3)):
        for i in range (0,params.NOTOKENS):
            if(conjunto3[i] == 1):
                conjunto1[i] = 1

def test (conjunto1, conjunto2, n):
    if(conjunto1[Lexico.token.value] == 0):
	    #el token no esta en el conjunto1        
        show_error(n,False)
        conj_union = [0 for i in range (params.NOTOKENS)]
        #por que no esta el token se marca el error
	    #se arma el conjunto de estabilizacion
        union_set(conj_union,conjunto1,conjunto2)
	    #se salta texto hasta llegar al token estabilizador que esta en el conjunto
	    #es de ver si el arreglo se modifica por referencia o nel
        while(conj_union[Lexico.token.value] == 0):
            Scanner.obtoken()
        return 1
    else:
        return 0

def search_ini_Token():
    while(tokini[Lexico.token.value] == 0):
        Scanner.obtoken()

def inicializar_conjuntos():
    #creacion de conjuntos de TOKENS INICIALES

	#tokens iniciales declaracion variables osea los tipos de dato
    tokini[Lexico.simbolo.numtok.value]=tokini[Lexico.simbolo.dectok.value]=tokini[Lexico.simbolo.textok.value]=tokini[Lexico.simbolo.cartok.value]=tokini[Lexico.simbolo.voftok.value]= 1

    #tokens iniciales declaracion funciones
    tokini[Lexico.simbolo.funtok.value] = 1

    #tokens iniciales de instrucciones
    tokini[Lexico.simbolo.sitok.value]=tokini[Lexico.simbolo.paratok.value]=tokini[Lexico.simbolo.mientrastok.value]=tokini[Lexico.simbolo.hastok.value]=1

    #asignaciones
    tokini[Lexico.simbolo.ident.value] = 1

    #final de programa para reconocerlo y no obviarlo en dado caso no se obtenga ninguno de los tokens anteriores al dar error
    tokini[Lexico.simbolo.mdputok.value] = 1

    #llamadas de funciones
    for i in range(300,316):
        tokini[i] = 1

    copia_set(set_arranque,tokini)
    set_arranque[Lexico.simbolo.dputok.value] = 1

    
