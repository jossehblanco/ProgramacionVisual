from tds import *
from auxiliares import *
import lexico as Lexico
from scanner import *

def bloque():
    temp = None
#-------------Declaracion de variable----------------------------------    
    if(Lexico.token == Lexico.simbolo.vartok):
        obtoken();
        declaracionvariable();

        while(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            declaracionvariable()
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)
#-----------------------------------------------------------------------
#------------Asignacion------------------------------------------------
    if(Lexico.token == lexico.simbolo.ident):
        asignacion()
        while(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            asignacion()
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)
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
def declaracionvariable():
    if(lexico.token == lexico.simbolo.ident):
        poner(objeto.VARIABLE)
        obtoken()
    else:
        error(4)
    return

def asignacion():
    if(lexico.token == lexico.simbolo.ident):
        obtoken()
        #Se va por el camino de una asignacion a variable
        if(lexico.token == lexico.simbolo.igl):
            obtoken()
            if(lexico.token == lexico.simbolo.valortok):
                obtoken()
        #Se va por el camino del arreglo
        elif (lexico.token == lexico.simbolo.corchab):
            obtoken()
            if(lexico.token == lexico.simbolo.numtok):
                obtoken()
                if(lexico.token == lexico.simbolo.corchcr):
                    obtoken()
                    if(lexico.token == lexico.simbolo.igl):
                        obtoken()
                        if(lexico.token == lexico.simbolo.valortok):
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
            error(26)
    else:
        error(25)

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
        error(24)

def VerificarParaIdents():
    if(Lexico.token != Lexico.simbolo.ident):
            error(14)
    else:
        i = posicion()
        if(i == -1):
            error(11)
        else:
            if(tabla[i].tipo == objeto.NUM):
                obtoken()
                return True
            else:
                error(7)

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
        error(24)

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
            seguir = VerificarParaIdents()
            if(seguir and Lexico.token == Lexico.simbolo.rangotok):        
                obtoken()
                if(Lexico.token == Lexico.simbolo.parena):
                    obtoken()
                    seguir = VerificarParaIdents()
                    if(seguir and Lexico.token == Lexico.simbolo.coma):
                        obtoken()
                        seguir = VerificarParaIdents()
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
                    error(24)
            else:
                error(6)
        else:#Verificando si es MIENSTRASTOK
            if(Lexico.token == Lexico.simbolo.mientrastok):
                obtoken()
                InstruccionMientras()
            else:
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

