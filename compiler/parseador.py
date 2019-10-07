from tds import *
from auxiliares import *
import lexico as Lexico
from scanner import *

def inicio():
    if(Lexico.token == Lexico.simbolo.dputok):
        obtoken()
        bloque()
    else:
        error(29)

def bloque():
    temp = None
#-------------Declaracion de variable----------------------------------    
    
    declaracionvariable();
#-----------------------------------------------------------------------
#------------Asignacion------------------------------------------------
    asignacion(True)
#-----------------------------------------------------------------------
#-------------Declaracion de funciones----------------------------------
    if(Lexico.token == Lexico.simbolo.funtok):
        obtoken()
        delaracionfuncion()
        obtoken()
#-----------------------------------------------------------------------
#-------------Instruccion-----------------------------------------------
    #instruccion()
    

#-----------------------------------------------------------------------
    #if(Lexico.token == Lexico.simbolo)
    #if(Lexico.token == Lexico.simbolo.consttok):
        #obtoken()
        #declaracionconst()

        #while (Lexico.token == Lexico.simbolo.coma):
         #   obtoken()
          #  declaracionconst()
        
        #if(Lexico.token == Lexico.simbolo.puntoycoma):
         #   obtoken()
        #else:
         #   error(5)

    #while(Lexico.token == Lexico.simbolo.proctok):
     #   obtoken()
      #  if(Lexico.token == Lexico.simbolo.ident):
       #     poner(objeto.PROCEDIMIENTO)
        #    obtoken()
        #else:
         #   error(4)
        #if(Lexico.token == Lexico.simbolo.puntoycoma):
         #   obtoken()
        #else:
         #   error(5)
        #temp = it
        #bloque()
        #it = temp

        #if(Lexico.token == Lexico.simbolo.puntoycoma):
         #   obtoken()
        #else:
         #   error(5)
    return

def valor():
    global lex
    if(Lexico.token == Lexico.simbolo.comilladoble):
        obtoken()
        #Este token se castea a texto y deberia de ingresarse asi al hash
        obtoken()
        if(Lexico.token != Lexico.simbolo.comilladoble):
            error(30)
    elif(Lexico.token == Lexico.simbolo.comillasimple):
        obtoken()
        try:
            ord(lex)
        except TypeError:
            error(31)
        #Este token se castea a texto y deberia de ingresarse asi al hash
        obtoken()
        if(Lexico.token != Lexico.simbolo.comillasimple):
            error(8)
    elif(Lexico.token == Lexico.simbolo.parena):
        obtoken()
        expresion()
        if(Lexico.token != Lexico.simbolo.parenc):
            error(21)
    elif(Lexico.token == Lexico.simbolo.llaveatok):
        obtoken()
        valor()
        while(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            valor()
        if(Lexico.token != Lexico.simbolo.llavectok):
            error(27)
    else:
        if(Lexico.token != Lexico.simbolo.numtok and Lexico.token != Lexico.simbolo.voftok and Lexico.token != Lexico.simbolo.ident):
            expresion()
    obtoken()
    return


def tipo():
    if(Lexico.token == Lexico.simbolo.numtok):
        return objeto.NUM
    elif(Lexico.token == Lexico.simbolo.dectok):
        return objecto.DEC
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
        error(0)

def agregarTipoAIdents(tipao):
    if(Lexico.token == Lexico.simbolo.ident):
        poner(tipao)
        obtoken()
    else:
        error(4)

#--------------------------------------------------------------------------------
#Declaracion de variables--------------------------------------------------------
def declaracionvariable():
    tipao = tipo()
    obtoken()
    agregarTipoAIdents(tipao)
    while(Lexico.token == Lexico.simbolo.coma):
        obtoken()
        agregarTipoAIdents(tipao)
    if(Lexico.token == Lexico.simbolo.puntoycoma):
        obtoken()
    else:
        asignacion(False)    
    return

def VerificarIdentExist():
    if(Lexico.token != Lexico.simbolo.ident):
            error(14)
    else:
        i = posicion()
        if(i == -1):
            error(10)
        else:
            obtoken()
            return True

def asignacion(checkIdent):
    seguir = False
    if(checkIdent):
        seguir = VerificarIdentExist()
    else:
        seguir = True
    #Se va por el camino de una asignacion a variable
    if(seguir and Lexico.token == Lexico.simbolo.asignacion):
        obtoken()
        valor()
        while(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            asignacion(True)
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(4)
    #Se va por el camino del arreglo
    elif (seguir and Lexico.token == Lexico.simbolo.corchab):
        obtoken()
        if(Lexico.token == Lexico.simbolo.numtok):
            obtoken()
            if(Lexico.token == Lexico.simbolo.corchcr):
                obtoken()
                if(Lexico.token == Lexico.simbolo.igl):
                    obtoken()
                    valor()
                    while(Lexico.token == Lexico.simbolo.coma):
                        obtoken()
                        asignacion(True)
                    if(Lexico.token == Lexico.simbolo.puntoycoma):
                        obtoken()
        else:
            error(1)
    else:
        return

def delaracionfuncion():
    if(lexico.token == lexico.simbolo.funtok):
        obtoken()
        if(lexico.token == lexico.simbolo.parena):
            obtoken()
            if(lexico.token == lexico.simbolo.parametok):
                obtoken()
                if(lexico.token == lexico.simbolo.parenc):
                    obtoken()
                    if(lexico.token == lexico.simbolo.retortok):
                        obtoken()
                        if(lexico.token == lexico.simbolo.vartok):
                            obtoken()
                            if(lexico.token == lexico.simbolo.llaveatok):
                                bloque()
                                obtoken()
                                if(lexico.token == lexico.simbolo.rettok):
                                    obtoken()
                                    if(lexico.token == lexico.simbolo.ident):
                                        obtoken()
                                        if(lexico.token == lexico.simbolo.puntoycoma):
                                            obtoken()
                                            if(lexico.token == lexico.simbolo.llavectok):
                                                obtoken
                                                return
                                            else:
                                                error(1)
                                        else:
                                            error(1)
        else:
            error(23)
    return

def declaracionconst():
    if(Lexico.token == Lexico.simbolo.ident):
        obtoken()
        if(Lexico.token == Lexico.simbolo.igl):
            obtoken()
            if(Lexico.token == Lexico.simbolo.numero):
                poner(objeto.CONSTANTE)
                obtoken()
            else:
                error(2) #error 2: debe ir seguido de un número

        else:
            error(3) #error 3: el identificador debe ir seguido de "=" 
    else:
        error(4) #error 4: Const, Var y Procedure deben ir seguidos de un identificador

def declaracionvar():
    if(Lexico.token == Lexico.simbolo.ident):
        poner(objeto.VARIABLE)
        obtoken()
    else:
        error(4)#error 4: Const, Var y Procedure deben ir seguidos de un identificador


def cuerpoLlavesInstruccion():
    if(Lexico.token == Lexico.simbolo.llaveatok):
        obtoken()
        instruccion()
        if(Lexico.token == Lexico.simbolo.llavectok):
            obtoken()
            return True
        else:
            error(27)
    else:
        error(26)

def cuerposiosi():
    if(Lexico.token == Lexico.simbolo.parena):
        obtoken()
        condicion()
        if(Lexico.token == Lexico.simbolo.parenc):
            obtoken()
            val = cuerpoLlavesInstruccion()
            return val
        else:
            error(21)
    else:
        error(22)

def VerificarIdentsExistAndTypes(tipao):
    if(Lexico.token != Lexico.simbolo.ident):
            error(14)
    else:
        i = posicion()
        if(i == -1):
            error(10)
        else:
            if(tabla[i].tipo == tipao):
                obtoken()
                return True
            else:
                error(6)

def InstruccionMientras():
    if(Lexico.token == Lexico.simbolo.parena):
        obtoken()
        condicion()
        if(Lexico.token == Lexico.simbolo.parenc):
            obtoken()
            cuerpoLlavesInstruccion()
        else:
            error(21)
    else:
        error(22)

def instruccion():    
    #VERIFICANDO SI ES SITOK
    if(Lexico.token == Lexico.simbolo.sitok):
        obtoken()
        cuerpoestabien = cuerposiosi()
        while(cuerpoestabien):
            if(Lexico.token == Lexico.simbolo.ositok):
                cuerpoestabien = cuerposiosi()
            else:
                break
        if(Lexico.token == Lexico.simbolo.sinotok):
            obtoken()
            cuerpoLlavesInstruccion()
    else:#Verificando si es PARATOK
        if(Lexico.token == Lexico.simbolo.paratok):
            obtoken()
            #verificar ident y que sea tipo num
            seguir = VerificarIdentsExistAndTypes(objeto.NUM)
            if(seguir and Lexico.token == Lexico.simbolo.rangotok):        
                obtoken()
                if(Lexico.token == Lexico.simbolo.parena):
                    obtoken()
                    seguir = VerificarIdentsExistAndTypes(objeto.NUM)
                    if(seguir and Lexico.token == Lexico.simbolo.coma):
                        obtoken()
                        seguir = VerificarIdentsExistAndTypes(objeto.NUM)
                        if(seguir and Lexico.token == Lexico.simbolo.coma):
                            obtoken()
                            asignacion(True)
                            if(Lexico.token == Lexico.simbolo.parenc):
                                obtoken()
                                cuerpoLlavesInstruccion()
                            else:
                                error(21)
                        else:
                            error(4)
                    else:
                        error(4)
                else:
                    error(22)
            else:
                error(5)
        else:#Verificando si es MIENSTRASTOK
            if(Lexico.token == Lexico.simbolo.mientrastok):
                obtoken()
                InstruccionMientras()
            else:#Verificando si es HASTOK
                if(Lexico.token == Lexico.simbolo.hastok):
                    obtoken()
                    seguir = cuerpoLcuerpoLlavesInstruccion()
                    if(seguir and Lexico.token == Lexico.simbolo.mientrastok):
                        obtoken()
                        InstruccionMientras()
                    else:
                        error(3)
                else:
                    asignacion(True)
                    declaracionvariable()

def expresion():
    if(Lexico.token == Lexico.simbolo.mas or Lexico.token == Lexico.simbolo.menos):
        obtoken()
        termino()
    else:
        termino()
    while(Lexico.token == Lexico.simbolo.mas or Lexico.token == Lexico.simbolo.menos):
        obtoken()
        termino()

def termino():
    factor()
    while(Lexico.token == Lexico.simbolo.por or Lexico.token == Lexico.simbolo.barra):
        obtoken()
        factor()

def factor():
    if(Lexico.token == Lexico.simbolo.ident):
        i = posicion()
        if(i == -1):
            error(11) #error 11: Identificador no declarado
        else:
            if(tabla[i].tipo == objeto.PROCEDIMIENTO):
                error(21) #error 21: Una expresión no debe contener un identificador de procedimiento
        obtoken()
    else:
        if(Lexico.token == Lexico.simbolo.numero):
            obtoken()
        else:
            if(Lexico.token == Lexico.simbolo.parena):
                obtoken()
                expresion()
                if(Lexico.token == Lexico.simbolo.parenc):
                    obtoken()
                else:
                    error(22) #error 22: Falta un paréntesis de cierre  
            else:
                error(23) #error 23: El factor anterior no puede ir seguido de este símbolo 

def condicion():
    if(Lexico.token == Lexico.simbolo.oddtok):
        obtoken()
        expresion()
    else:
        expresion()
        if((Lexico.token != Lexico.simbolo.igl) and (Lexico.token != Lexico.simbolo.nig) and (Lexico.token != Lexico.simbolo.mei) and (Lexico.token != Lexico.simbolo.myr) and (Lexico.token != Lexico.simbolo.mai)):
            error(20) #error 20: Se esperaba un operador relacional
        else:
            obtoken()
            expresion()

