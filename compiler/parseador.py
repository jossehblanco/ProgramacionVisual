from tds import *
from auxiliares import *
import lexico as Lexico
from scanner import *

def bloque():
    temp = None
#-------------Declaracion de variable----------------------------------    
    
    declaracionvariable();
#-----------------------------------------------------------------------
#------------Asignacion------------------------------------------------
    asignacion()
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

#--------------------------------------------------------------------------------
#Declaracion de variables--------------------------------------------------------
def agregarTipoAIdents(tipao):
    if(Lexico.token == Lexico.simbolo.ident):
        if(tipao == objeto.NUM):
            poner(objeto.NUM)
        elif(tipao == objeto.DEC):
            poner(objeto.DEC)
        elif(tipao == objeto.TEXTO):
            poner(objeto.TEXTO)
        elif(tipao == objeto.CAR):
            poner(objeto.CAR)
        elif(tipao == objeto.VOF):
            poner(objeto.VOF)
        elif(tipao == objeto.NUMARRA):
            poner(objeto.NUMARRA)
        elif(tipao == objeto.DECARRA):
            poner(objeto.DECARRA)
        elif(tipao == objeto.TEXTOARRA):
            poner(objeto.TEXTOARRA)
        elif(tipao == objeto.VOFARRA):
            poner(objeto.VOFARRA)
        else:
            error(0)            
        obtoken()
    else:
        error(4)

def declaracionvariable():
    if(Lexico.token == Lexico.simbolo.vartok):
        tipao = tipo()
        obtoken()
        agregarTipoAIdents(tipao)
        while(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            agregarTipoAIdents()
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)
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

def asignacion():
    seguir = VerificarIdentExist()
    #Se va por el camino de una asignacion a variable
    if(seguir and Lexico.token == Lexico.simbolo.igl):
        obtoken()
        if(Lexico.token == Lexico.simbolo.valortok):
            obtoken()
            valor()#hacer algo con el valor retornado por valor
            while(Lexico.token == Lexico.simbolo.coma):
                obtoken()
                asignacion()
            if(Lexico.token == Lexico.simbolo.puntoycoma):
                obtoken()
            else:
                error(5)
    #Se va por el camino del arreglo
    elif (seguir and Lexico.token == Lexico.simbolo.corchab):
        obtoken()
        if(Lexico.token == Lexico.simbolo.numtok):
            obtoken()
            if(Lexico.token == Lexico.simbolo.corchcr):
                obtoken()
                if(Lexico.token == Lexico.simbolo.igl):
                    obtoken()
                    if(Lexico.token == Lexico.simbolo.valortok):
                        obtoken()
                        valor()
                        while(Lexico.token == Lexico.simbolo.coma):
                            obtoken()
                            asignacion()
                        if(Lexico.token == Lexico.simbolo.puntoycoma):
                            obtoken()
        else:
            error(1)
    else:
        error(3)

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
                            asignacion()
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
                    asignacion()
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

