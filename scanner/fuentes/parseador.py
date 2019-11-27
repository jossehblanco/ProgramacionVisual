from tds import *
from auxiliares import *
import lexico as Lexico
import scanner as Scanner
import parametros as params
import conjuntos as Conjuntos



def inicio():
    if(Lexico.token == Lexico.simbolo.dputok):
        Scanner.obtoken()
        bloque()
    else:
        error(29)
        return

def bloque():
    if(Lexico.token == Lexico.simbolo.mdputok):
        return
    temp = None
    #setpaso = [0 for i in range (params.NOTOKENS)] #conjunto de paso por valor
    #vacio = [0 for i in range (params.NOTOKENS)] #conjunto vacio
#-------------Declaracion de variable----------------------------------    
    
    declaracionvariable();

#-------------Llamar Funciones ----------------------------------------
    llamarFunciones()
#-----------------------------------------------------------------------
#------------Asignacion------------------------------------------------
    asignacion(True,None)
#-----------------------------------------------------------------------
#-------------Declaracion de funciones----------------------------------
    delaracionfuncion()
    
#-----------------------------------------------------------------------
#-------------Instruccion-----------------------------------------------
    instruccion()
    bloque()
    

#-----------------------------------------------------------------------
    #if(Lexico.token == Lexico.simbolo)
    #if(Lexico.token == Lexico.simbolo.consttok):
        #Scanner.Scanner.obtoken()
        #declaracionconst()

        #while (Lexico.token == Lexico.simbolo.coma):
         #   Scanner.Scanner.obtoken()
          #  declaracionconst()
        
        #if(Lexico.token == Lexico.simbolo.puntoycoma):
         #   Scanner.obtoken()
        #else:
         #   error(5)

    #while(Lexico.token == Lexico.simbolo.proctok):
     #   Scanner.obtoken()
      #  if(Lexico.token == Lexico.simbolo.ident):
       #     poner(objeto.PROCEDIMIENTO)
        #    Scanner.obtoken()
        #else:
         #   error(4)
        #if(Lexico.token == Lexico.simbolo.puntoycoma):
         #   Scanner.obtoken()
        #else:
         #   error(5)
        #temp = it
        #bloque()
        #it = temp

        #if(Lexico.token == Lexico.simbolo.puntoycoma):
         #   Scanner.obtoken()
        #else:
         #   error(5)
    return

def verificarIdent():    
    if(Lexico.token == Lexico.simbolo.ident):
        i = posicion(Scanner.lex)
        if(i == -1):
            error_iden(10,Scanner.lex)
            return 2 #error que no existe identificador
        else:
            if(tabla[i].tipo == objeto.FUNCION):
                error(20)
                return 2 #error que el identificador es una funcion
            else:
                Scanner.obtoken()
                return 1 #Success
    else:        
        return 0 #No es un identificador

def valor():
    global lextoken
    if(Lexico.token == Lexico.simbolo.parena):
        Scanner.obtoken()
        expresion()
        if(Lexico.token != Lexico.simbolo.parenc):
            error(21)
            return
    elif(Lexico.token == Lexico.simbolo.llaveatok):
        Scanner.obtoken()
        valor()
        while(Lexico.token == Lexico.simbolo.coma):
            Scanner.obtoken()
            valor()
        if(Lexico.token != Lexico.simbolo.llavectok):
            error(27)
            return
    else:
        if(Lexico.token != Lexico.simbolo.numero and Lexico.token != Lexico.simbolo.truetok and
          Lexico.token != Lexico.simbolo.ident and Lexico.token != Lexico.simbolo.falsetok and 
          Lexico.token != Lexico.simbolo.decimal and Lexico.token != Lexico.simbolo.caracter and
          Lexico.token != Lexico.simbolo.texto):
            expresion()
    Scanner.obtoken()
    return


def tipo():
    if(Lexico.token == Lexico.simbolo.numtok):
        return objeto.NUM
    elif(Lexico.token == Lexico.simbolo.dectok):
        return objeto.DEC
    elif(Lexico.token == Lexico.simbolo.textok):
        return objeto.TEXTO
    elif(Lexico.token == Lexico.simbolo.cartok):
        return objeto.CAR
    elif(Lexico.token == Lexico.simbolo.voftok):
        return objeto.VOF
    elif(Lexico.token == Lexico.simbolo.numarra):
        return objeto.NUMARRA
    elif(Lexico.token == Lexico.simbolo.decarra):
        return objeto.DECARRA
    elif(Lexico.token == Lexico.simbolo.textoarra):
        return objeto.TEXTOARRA
    elif(Lexico.token == Lexico.simbolo.cararra):
        return objeto.CARARRA
    elif(Lexico.token == Lexico.simbolo.vofarra):
        return objeto.VOFARRA
    else:
        return

def agregarTipoAIdents(tipao,numError):
    if(Lexico.token == Lexico.simbolo.ident):
        poner(tipao)
        Scanner.obtoken()
        return True
    else:
        error(numError)
        return False

#--------------------------------------------------------------------------------
#Declaracion de variables--------------------------------------------------------
def declaracionvariable():
    tipao = tipo()
    if(tipao is None):        
        return
    Scanner.obtoken()
    #si da error retorna false
    if(not agregarTipoAIdents(tipao,16)):
        return
    if (Lexico.token == Lexico.simbolo.corchab):
        Scanner.obtoken()
        if(Lexico.token == Lexico.simbolo.numero):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.corchcr):
                Scanner.obtoken()                            
            else:
                error(45)
                return
        else:
            error(1)
            return
    while(Lexico.token == Lexico.simbolo.coma):
        Scanner.obtoken()
        if(not agregarTipoAIdents(tipao,4)):
            return
    if(Lexico.token == Lexico.simbolo.puntoycoma):
        Scanner.obtoken()
    else:
        asignacion(False,tipao)  
    #bloque()  
    return

def VerificarIdentExist(checkInTDS,tipao):    
    if(Lexico.token != Lexico.simbolo.ident):
            return 2
    else:
        if(checkInTDS):
            i = posicion(Scanner.lex)
            if(i == -1):
                #Para no leer el mismo token infinitamente
                temp = Scanner.lex
                Scanner.obtoken()
                error_iden(10,temp)                
                return 1
            else:
                Scanner.obtoken()
                return 0
        else:
            return int(agregarTipoAIdents(tipao,16))           

def asignacion(checkIdent,tipao):
    fin = -1
    seguir = VerificarIdentExist(checkIdent,tipao)
    errorEnc = -1
    #Se va por el camino de una asignacion a variable
    #CheckIdent nos determina si viene de declaracion de variable por tanto 
    #Si viene falso no tenemos que revisar que el identificador exista
    #Por esto si viene falso igual debemos de entrar al if pues es una asignacion
    if((seguir == 0 or not checkIdent)and Lexico.token == Lexico.simbolo.asignacion):
        Scanner.obtoken()
        valor()
        if(Lexico.token == Lexico.simbolo.coma):
            Scanner.obtoken()
            #Si checkident es False significa que viene declaracion variable
            #Por tanto le debo de pasar el tipo de dato para instancearlo.
            fin = asignacion(checkIdent,tipao)
        #Lo valido antes pues la ultima ejecucion ya habra leido el punto y coma
        #por ende cuando la recursion regrese solo tendre que salir del bucle
        if(fin == 0):
            return 0;
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            Scanner.obtoken()
            return 0
        else:
            error(4)
            return
    #Se va por el camino del arreglo
    elif (checkIdent and Lexico.token == Lexico.simbolo.corchab):
        Scanner.obtoken()
        if(Lexico.token == Lexico.simbolo.numero or Lexico.token == Lexico.simbolo.ident):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.corchcr):
                Scanner.obtoken()
                if(Lexico.token == Lexico.simbolo.asignacion):
                    Scanner.obtoken()
                    valor()
                    if(Lexico.token == Lexico.simbolo.coma):
                        #Aqui leo el numero
                        Scanner.obtoken()
                        #Aqui leo la siguiente coma
                        Scanner.obtoken()
                        while(Lexico.token == Lexico.simbolo.coma):
                            Scanner.obtoken()
                            Scanner.obtoken()
                        #fin = asignacion(checkIdent,tipao)                    
                    if(Lexico.token == Lexico.simbolo.puntoycoma):
                        Scanner.obtoken()
                else:
                    error(15)
            else:
                error(45)
        else:
            error(1)
    elif(seguir != 2 and Lexico.token != Lexico.simbolo.asignacion and Lexico.token != Lexico.simbolo.corchab):
        error(49)
        return
    else:        
        return

def delaracionfuncion():
    if(Lexico.token == Lexico.simbolo.funtok):
        Scanner.obtoken()
        if(Lexico.token == Lexico.simbolo.ident):
            poner(objeto.FUNCION)
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.parena):
                Scanner.obtoken()
                parametros()
                if(Lexico.token == Lexico.simbolo.parenc):
                    Scanner.obtoken()
                    if(Lexico.token == Lexico.simbolo.retortok):
                        Scanner.obtoken()
                        tipao = tipo()
                        if(Lexico.token == Lexico.simbolo.llaveatok):
                            #Para no dejar que declare funciones dentro de funciones
                            instruccion()
                            #Scanner.obtoken()
                            if(Lexico.token == Lexico.simbolo.rettok):
                                Scanner.obtoken()
                                if(Lexico.token == Lexico.simbolo.ident):
                                    #Verificar que sea del tipo
                                    Scanner.obtoken()
                                    if(Lexico.token == Lexico.simbolo.puntoycoma):
                                        Scanner.obtoken()
                                        if(Lexico.token == Lexico.simbolo.llavectok):
                                            Scanner.obtoken
                                            return
                                        else:
                                            error(27)
                                    else:
                                        error(9)
                                else:
                                    error(40)
                            else:
                                error(39)
                        else:
                            error(26)
                    else:
                        error(17)
                else:
                    error(21)
            else:
                error(22)
        else:
            error(16)
    return


def cuerpoLlavesInstruccion():
    if(Lexico.token == Lexico.simbolo.llaveatok):
        Scanner.obtoken()
        instruccion()
        if(Lexico.token == Lexico.simbolo.llavectok):
            Scanner.obtoken()
            return True
        else:
            error(27)
            return False
    else:
        error(26)
        return False

def cuerposiosi():
    if(Lexico.token == Lexico.simbolo.parena):
        Scanner.obtoken()
        condicionExt()
        if(Lexico.token == Lexico.simbolo.parenc):
            Scanner.obtoken()
            val = cuerpoLlavesInstruccion()
            return val
        else:
            error(21)
            return False
    else:
        error(22)
        return False

def VerificarIdentsExistAndTypes(tipao):
    if(Lexico.token != Lexico.simbolo.ident):
            error(14)
            return False
    else:
        i = posicion(Scanner.lex)
        if(i == -1):
            #Para no leer el mismo token
            temp = Scanner.lex
            Scanner.obtoken()
            error_iden(10,temp)
            return False
        else:
            if(tabla[i].tipo == tipao):
                Scanner.obtoken()
                return True
            else:
                error(6)
                return False

def InstruccionMientras():
    if(Lexico.token == Lexico.simbolo.parena):
        Scanner.obtoken()
        condicionExt()
        if(Lexico.token == Lexico.simbolo.parenc):
            Scanner.obtoken()
            cuerpoLlavesInstruccion()
        else:
            error(21)
    else:
        error(22)

def ParentesisFor(toksig):
    seguir = False
    if(Lexico.token == Lexico.simbolo.parena):
        Scanner.obtoken()

        #Para aceptar tanto numeros como identificadores de numeros
        if(Lexico.token == Lexico.simbolo.numero):
            seguir = True
            Scanner.obtoken()
        else:
            seguir = VerificarIdentsExistAndTypes(objeto.NUM)
            
        if(seguir and Lexico.token == Lexico.simbolo.coma):
            Scanner.obtoken()
            #Para aceptar tanto numeros como identificadores de numeros
            if(Lexico.token == Lexico.simbolo.numero):
                seguir = True
                Scanner.obtoken()
            else:
                seguir = VerificarIdentsExistAndTypes(objeto.NUM)
            #---------------------------------------------------

            if(seguir and Lexico.token == Lexico.simbolo.coma):
                Scanner.obtoken()
                #Para aceptar tanto numeros como identificadores de numeros
                if(Lexico.token == Lexico.simbolo.numero):
                    Scanner.obtoken()
                else:
                    if(Lexico.token != Lexico.simbolo.ident):
                        Conjuntos.test(toksig,[],41)
                    else:
                        asignacion(True,None)
                #---------------------------------------------------
                if(Lexico.token == Lexico.simbolo.parenc):
                    Scanner.obtoken()
                    return   
                else:
                    Conjuntos.test(toksig,[],21)
                    return
            else:
                if(not seguir):
                    Conjuntos.test(toksig,[],41)
                else:
                    Conjuntos.test(toksig,[],4)               
                return
        else:           
            if(not seguir):
                Conjuntos.test(toksig,[],41)
            else:
                Conjuntos.test(toksig,[],4)
            return
    else:
        Conjuntos.test(toksig,[],22)
        return

def instruccion():    
    
    seguir = False
    #COMO ES RECURSIVA ESTOS SON SUN FINALES
    if(Lexico.token == Lexico.simbolo.llavectok or Lexico.token == Lexico.simbolo.mdputok or Lexico.token == Lexico.simbolo.rettok):
        return

    #VERIFICANDO SI ES SITOK
    if(Lexico.token == Lexico.simbolo.sitok):
        Scanner.obtoken()
        cuerpoestabien = cuerposiosi()
        while(cuerpoestabien):
            if(Lexico.token == Lexico.simbolo.ositok):
                cuerpoestabien = cuerposiosi()
            else:
                break
        if(Lexico.token == Lexico.simbolo.sinotok):
            Scanner.obtoken()
            cuerpoLlavesInstruccion()
    else:#Verificando si es PARATOK
        if(Lexico.token == Lexico.simbolo.paratok):
            setpaso = [0 for i in range (params.NOTOKENS)]
            setpaso[Lexico.simbolo.llaveatok.value]=setpaso[Lexico.simbolo.llavectok.value] = 1
            Scanner.obtoken()
            #verificar ident y que sea tipo num
            seguir = VerificarIdentsExistAndTypes(objeto.NUM)
            if(seguir and Lexico.token == Lexico.simbolo.rangotok):        
                Scanner.obtoken()
                ParentesisFor(setpaso)
                cuerpoLlavesInstruccion()
            else:
                error(5)
                return
        else:#Verificando si es MIENSTRASTOK
            if(Lexico.token == Lexico.simbolo.mientrastok):
                Scanner.obtoken()
                InstruccionMientras()
            else:#Verificando si es HASTOK
                if(Lexico.token == Lexico.simbolo.hastok):
                    Scanner.obtoken()
                    seguir = cuerpoLcuerpoLlavesInstruccion()
                    if(seguir and Lexico.token == Lexico.simbolo.mientrastok):
                        Scanner.obtoken()
                        InstruccionMientras()
                    else:
                        error(3)
                else:
                    asignacion(True,None)
                    declaracionvariable()
                    llamarFunciones()
                    instruccion()

def expresion():
    if(Lexico.token == Lexico.simbolo.mas or Lexico.token == Lexico.simbolo.menos):
        Scanner.obtoken()
        termino()
    else:
        termino()
    while(Lexico.token == Lexico.simbolo.mas or Lexico.token == Lexico.simbolo.menos):
        Scanner.obtoken()
        termino()

def termino():
    #Apesar de que el ident tambien entra en valor lo verifico aparte pues me tengo que asegurar que este
    #declarado a la hora de utilizarlo en operaciones
    verif = verificarIdent()    
    if(verif == 0):
        #Si trae 0 es que el token no es Ident        
        if(Lexico.token == Lexico.simbolo.numero or Lexico.token == Lexico.simbolo.decimal):
            #Meterlo a la pila?
            Scanner.obtoken() 
        else:
            error(47) #se esperaba un numero o un decimal
            return
        #valor() este tenia antes
    elif(verif == 2):
        return
    while(Lexico.token == Lexico.simbolo.por or Lexico.token == Lexico.simbolo.barra):
        Scanner.obtoken()
        verif = verificarIdent()
        if(verif == 0):
            #Si trae 0 es que el token no es Ident        
            if(Lexico.token == Lexico.simbolo.numero or Lexico.token == Lexico.simbolo.decimal):
                #Meterlo a la pila?
                Scanner.obtoken()
            else:
                error(47) #se esperaba un numero o un decimal
                return
        elif(verif == 2):
            #Si trae 2 es error por esto se retorna
            return

def condicion():
    expresion()
    if((Lexico.token != Lexico.simbolo.igl) and (Lexico.token != Lexico.simbolo.nig) and (Lexico.token != Lexico.simbolo.mnr) and (Lexico.token != Lexico.simbolo.mei) and (Lexico.token != Lexico.simbolo.myr) and (Lexico.token != Lexico.simbolo.mai)):
        error(20) #error 20: Se esperaba un operador relacional
    else:
        Scanner.obtoken()
        expresion()

def condicionExt():
    condicion()
    if((Lexico.token == Lexico.simbolo.andtok) or (Lexico.token == Lexico.simbolo.ortok)):
        Scanner.obtoken()
        condicionExt()
    else:
        return

def parametros():
    tipao = tipo()
    if(tipao is None):
        error(0)
    else:
        obtoken()
        #ver si lo declaramos o como manejar las variables por scope
        if(not agregarTipoAIdents(tipao,16)):
            return
        if(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            parametros()
        else:
            return

def llamarFunciones():
    if(Lexico.token.value >= 300 and Lexico.token.value <= 315):
        if(Lexico.token == Lexico.simbolo.elev or Lexico.token == Lexico.simbolo.modulo):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.parena):
                Scanner.obtoken()
                if(Lexico.token == Lexico.simbolo.numero or Lexico.token == Lexico.simbolo.ident):
                    Scanner.obtoken()
                    if(Lexico.token == Lexico.simbolo.coma):
                        Scanner.obtoken()
                        if(Lexico.token == Lexico.simbolo.numero or Lexico.token == Lexico.simbolo.ident):
                            Scanner.obtoken()
                            if(Lexico.token == Lexico.simbolo.parenc):
                                Scanner.obtoken()
                            else:
                                error(21)
                        else:
                            error(41)
                    else:
                        error(42)
                else:
                    error(41)
            else:
                error(22)
        elif(Lexico.token == Lexico.simbolo.raizc or Lexico.token == Lexico.simbolo.abs or 
             Lexico.token == Lexico.simbolo.aproxar or Lexico.token == Lexico.simbolo.log or 
             Lexico.token == Lexico.simbolo.cptexto or Lexico.token == Lexico.simbolo.tamtxt or
             Lexico.token == Lexico.simbolo.aproxab or Lexico.token == Lexico.simbolo.imp or
             Lexico.token == Lexico.simbolo.cArch or Lexico.token == Lexico.simbolo.escArch):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.parena):
                Scanner.obtoken()
                if(Lexico.token == Lexico.simbolo.ident):
                    Scanner.obtoken()
                    if(Lexico.token == Lexico.simbolo.parenc):
                        Scanner.obtoken()
                    else:
                        error(21)
                else:
                    error(16)
            else:
                error(22)
        elif(Lexico.token == Lexico.simbolo.euxp):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.parena):
                Scanner.obtoken()
                if(Lexico.token == Lexico.simbolo.ident or Lexico.token == Lexico.simbolo.numero):
                    Scanner.obtoken()
                    if(Lexico.token == Lexico.simbolo.parenc):
                        Scanner.obtoken()
                    else:
                        error(21)
                else:
                    error(41)
            else:
                error(22)
        elif(Lexico.token == Lexico.simbolo.leerstd or Lexico.token == Lexico.simbolo.leerArch):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.parena):
                Scanner.obtoken()
                if(Lexico.token == Lexico.simbolo.ident):
                    Scanner.obtoken()
                    if(Lexico.token == Lexico.simbolo.coma):
                        Scanner.obtoken()
                        if(Lexico.token == Lexico.simbolo.ident):
                            Scanner.obtoken()
                            if(Lexico.token == Lexico.simbolo.parenc):
                                Scanner.obtoken()
                            else:
                                error(21)
                        else:
                            error(16)
                    else:
                        error(42)
                else:
                    error(16)
            else:
                error(22)
        elif(Lexico.token == Lexico.simbolo.abArch):
            Scanner.obtoken()
            if(Lexico.token == Lexico.simbolo.parena):
                Scanner.obtoken()
                if(Lexico.token == Lexico.simbolo.ident or Lexico.token == Lexico.simbolo.texto):
                    Scanner.obtoken()
                    if(Lexico.token == Lexico.simbolo.coma):
                        Scanner.obtoken()
                        if(Lexico.token == Lexico.simbolo.texto):
                            Scanner.obtoken()
                            if(Lexico.token == Lexico.simbolo.parenc):
                                Scanner.obtoken()
                            else:
                                error(21)
                        else:
                            error(43)
                    else:
                        error(42)
                else:
                    error(44)
            else:
                error(22)
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            Scanner.obtoken()
        else:
            error(9)
    else:
        return
