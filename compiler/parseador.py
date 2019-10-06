from tds import *
from auxiliares import *
from lexico import *
from scanner import *

def bloque():
    temp = None

    if(token == lexico.simbolo.consttok):
        obtoken()
        declaracionconst()

        while (token == lexico.simbolo.coma):
            obtoken()
            declaracionconst()
        
        if(token == lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)

    if(token == lexico.simbolo.vartok):
        obtoken();
        declaracionvar();

        while(token == lexico.simbolo.coma):
            obtoken()
            declaracionvar()
        if(token == lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)

    while(token == lexico.simbolo.proctok):
        obtoken()
        if(token == lexico.simbolo.ident):
            poner(PROCEDIMIENTO)
            obtoken()
        else:
            error(4)
        if(token == lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)
        temp = it
        bloque()
        it = temp

        if(token == lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)

    instruccion()

def declaracionconst():
    if(token == lexico.simbolo.ident):
        obtoken()
        if(token == lexico.simbolo.igl):
            obtoken()
            if(token == lexico.simbolo.numero):
                poner(CONSTANTE)
                obtoken()
            else:
                error(2) #error 2: debe ir seguido de un número

        else:
            error(3) #error 3: el identificador debe ir seguido de "=" 
    else:
        error(4) #error 4: Const, Var y Procedure deben ir seguidos de un identificador

def declaracionvar():
    if(token == lexico.simbolo.ident):
        poner(VARIABLE)
        obtoken()
    else:
        error(4)#error 4: Const, Var y Procedure deben ir seguidos de un identificador

def instruccion():
    i = None
    if(token == lexico.simbolo.ident):
        i = posicion()
        if(i == 0):
            error(11) #error 11: identificador no declarado 
        else:
            if(tabla[i].tipo != VARIABLE):
                error(12) #error 12: no están permitidas las asignaciones a constantes o a procedimientos
        obtoken()
        if(token == lexico.simbolo.asignacion):
            obtoken()
        else:
            error(13) #error 13: se esperaba el operador de asignación
        expresion()
    else:
        if(token == lexico.simbolo.calltok):
            obtoken()
            if(token != lexico.simbolo.ident):
                error(14) #error 14: "CALL" debe ir seguido de un identificador 
            else:
                i = posicion()
                if(i == 0):
                    error(11) #error 11: Identificador no declarado 
                else:
                    if(tabla[i].tipo != PROCEDIMIENTO):
                        error(15) #error 15 : No tiene sentido llamar a una constante o a una variable 
                obtoken()
        else:
            if(token == lexico.simbolo.iftok):
                obtoken()
                condicion()
                if(token == lexico.simbolo.thentok):
                    obtoken()
                else:
                    error(16) #error 16: Se esperaba un "THEN"
                instruccion()
            else:
                if(token == lexico.simbolo.begintok):
                    obtoken()
                    instruccion()
                    while (token == lexico.simbolo.puntoycoma):
                        obtoken()
                        instruccion()
                    if(token == lexico.simbolo.endtok):
                        obtoken()
                    else:
                        error(17) #error 17: Se esperaba un "END" o un punto y coma 
                else:
                    if(token == lexico.simbolo.whiletok):
                        obtoken()
                        condicion()
                        if(token == lexico.simbolo.dotok):
                            obtoken()
                        else:
                            error(18) #error 18: Se esperaba un "DO"
                        instruccion()

def expresion():
    if(token == lexico.simbolo.mas or token == lexico.simbolo.menos):
        obtoken()
        termino()
    else:
        termino()
    while(token == lexico.simbolo.mas or token == lexico.simbolo.menos):
        obtoken()
        termino()

def termino():
    factor()
    while(token == lexico.simbolo.por or token == lexico.simbolo.barra):
        obtoken()
        factor()

def factor():
    i = None
    if(token == lexico.simbolo.ident):
        i = posicion()
        if(i == 0):
            error(11) #error 11: Identificador no declarado
        else:
            if(tabla[i].tipo == PROCEDIMIENTO):
                error(21) #error 21: Una expresión no debe contener un identificador de procedimiento
        obtoken()
    else:
        if(token == lexico.simbolo.numero):
            obtoken()
        else:
            if(token == lexico.simbolo.parena):
                obtoken()
                expresion()
                if(token == lexico.simbolo.parenc):
                    obtoken()
                else:
                    error(22) #error 22: Falta un paréntesis de cierre  
            else:
                error(23) #error 23: El factor anterior no puede ir seguido de este símbolo 

def condicion():
    if(token == lexico.simbolo.oddtok):
        obtoken()
        expresion()
    else:
        expresion()
        if((token != lexico.simbolo.igl) and (token != lexico.simbolo.nig) and (token != lexico.simbolo.mei) and (token != lexico.simbolo.myr) and (token != lexico.simbolo.mai)):
            error(20) #error 20: Se esperaba un operador relacional
        else:
            obtoken()
            expresion()

