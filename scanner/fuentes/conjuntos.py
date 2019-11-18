import parametros as params
import lexico as Lexico
import scanner as Scanner

#tokens iniciales de declaracion de variables y procedimientos
tokini = [0 for i in range (params.NOTOKENS)]
#tokens iniciales de instruccion
#tokiniinst = [0 for i in range (params.NOTOKENS)]

set_arranque = [0 for i in range (params.NOTOKENS)]

#init set no se copia pues ya lo hago arriba

def copia_set(conjunto, conjunto2):
	#copiando lo del conjunto2 a conjunto
    for i in range (0,params.NOTOKENS):
        conjunto[i] = conjunto2[i]

def union_set(conjunto1,conjunto2, conjunto3):
	copia_set(conjunto1,conjunto2)
	for i in range (0,params.NOTOKENS):
		if(conjunto3[i] == 1):
			conjunto1[i] = 1

def test (conjunto1, conjunto2, n):
	conj_union = []

	if(conjunto1[Lexico.token] == 0):
		#el token no esta en el conjunto1
		error(n) #por que no esta el token se marca el error

		#se arma el conjunto de estabilizacion 
		union_set(conj_union,conjunto1,conjunto2)
		#se salta texto hasta llegar al token estabilizador que esta en el conjunto
		#es de ver si el arreglo se modifica por referencia o nel
		while(conj_union[Lexico.token] == 0):
			Scanner.obtoken()

def search_ini_Token():
    while(tokini[Lexico.token] == 0):
        Scanner.obtoken()

def inicializar_conjuntos():
    #creacion de conjuntos de TOKENS INICIALES

	#tokens iniciales declaracion variables
    tokini[Lexico.simbolo.numtok]=tokinideclvar[Lexico.simbolo.dectok]=tokinideclvar[Lexico.simbolo.textok]=tokinideclvar[Lexico.simbolo.cartok]=tokinideclvar[Lexico.simbolo.voftok]=tokinideclvar[Lexico.simbolo.numarra]=tokinideclvar[Lexico.simbolo.decarra]=tokinideclvar[Lexico.simbolo.textoarra]=tokinideclvar[Lexico.simbolo.cararra]=tokinideclvar[Lexico.simbolo.vofarra]=1

    #tokens iniciales declaracion funciones
    tokini[Lexico.simbolo.funtok] = 1

    #tokens iniciales de instrucciones
    tokini[Lexico.simbolo.sitok]=tokiniinst[Lexico.simbolo.paratok]=tokiniinst[Lexico.simbolo.mientrastok]=tokiniinst[Lexico.simbolo.hastok]=1

    #asignaciones
    tokini[Lexico.simbolo.ident] = 1

    #llamadas de funciones
    for i in range(300,316):
        tokini[i] = 1

    copia_set(set_arranque,tokini)
    set_arranque[Lexico.simbolo.dputok] = 1

    
