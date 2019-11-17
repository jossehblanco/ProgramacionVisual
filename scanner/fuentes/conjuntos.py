import parametros as params
import lexico as Lexico
import scanner as Scanner

#tokens iniciales de declaracion de variables y procedimientos
tokinidecl = [0 for i in range (params.NOTOKENS)]
#tokens iniciales de instruccion
tokiniinst = [0 for i in range (params.NOTOKENS)]


tokinifact = [0 for i in range (params.NOTOKENS)]

set_arranque = [0 for i in range (params.NOTOKENS)]

#init set no se copia pues ya lo hago arriba

def copia_set(conjunto, conjunto2):
	#copiando lo del conjunto2 a conjunto
	conjunto = conjunto2.copy()

def union_set(conjunto1,conjunto2, conjunto3):
	copia_set(conjunto1,conjunto2)
	for i in range (0,params.NOTOKENS):
		if(conjunto3[i] == 1):
			conjunto1[i] = 1

def test (conjunto1, conjunto2, n):
	conj_union = []

	if(conjunto1[Lexico.token] == 0):
		#el token no está en el conjunto1
		error(n) #por que no esta el token se marca el error

		#se arma el conjunto de estabilizacion 
		union_set(conj_union,conjunto1,conjunto2)
		#se salta texto hasta llegar al token estabilizador que esta en el conjunto
		#es de ver si el arreglo se modifica por referencia o nel
		while(conj_union[Lexico.token] == 0):
			Scanner.obtoken()

def inicializar_conjuntos():
	#creación de conjuntos de TOKENS INICIALES

	#tokens iniciales declaracion variables
	tokinidecl[Lexico.simbolo.numtok]=tokinideclvar[Lexico.simbolo.dectok]=tokinideclvar[Lexico.simbolo.textok]=tokinideclvar[Lexico.simbolo.cartok]=tokinideclvar[Lexico.simbolo.voftok]=tokinideclvar[Lexico.simbolo.numarra]=tokinideclvar[Lexico.simbolo.decarra]=tokinideclvar[Lexico.simbolo.textoarra]=tokinideclvar[Lexico.simbolo.cararra]=tokinideclvar[Lexico.simbolo.vofarra]=1
	#tokens iniciales declaracion funciones
	tokinidecl[Lexico.simbolo.funtok] = 1

	#tokens iniciales de instrucciones
	tokiniinst[Lexico.simbolo.sitok]=tokiniinst[Lexico.simbolo.paratok]=tokiniinst[Lexico.simbolo.mientrastok]=tokiniinst[Lexico.simbolo.hastok]=1
