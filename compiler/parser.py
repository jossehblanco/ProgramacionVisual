from tds import *
from auxiliares import *
from lexico import *
from scanner import *

def bloque():
    temp = None

    if(token == consttok):
        obtoken()
        declaracionconst()

        while (token == coma):
            obtoken()
            declaracionconst()
        
        if(token == puntoycoma):
            obtoken()
        else:
            error(5)

    if(token == vartok):
        obtoken();
        declaracionvar();

        while(token == coma):
            obtoken()
            declaracionvar()
        if(token == puntoycoma):
            obtoken()
        else:
            error(5)

    while(token == proctok):
        obtoken()
        if(token == ident):
            poner(PROCEDIMIENTO)
            obtoken()
        else:
            error(4)
        if(token == puntoycoma):
            obtoken()
        else:
            error(5)
        temp = it
        bloque()
        it = temp

        if(token == puntoycoma):
            obtoken()
        else:
            error(5)

    instruccion()

def declaracionconst():
    if(token == ident):
        obtoken()
        if(token == igl):
            obtoken()
            if(token == numero):
                poner(CONSTANTE)
                obtoken()
            else:
                error(2) #error 2: debe ir seguido de un número

        else:
            error(3) #error 3: el identificador debe ir seguido de "=" 
    else:
        error(4) #error 4: Const, Var y Procedure deben ir seguidos de un identificador

def declaracionvar():
    if(token == ident):
        poner(VARIABLE)
        obtoken()
    else:
        error(4)#error 4: Const, Var y Procedure deben ir seguidos de un identificador

def instruccion():
    i = None
    if(token == ident):
        i = posicion()
        if(i == 0):
            error(11) #error 11: identificador no declarado 
        else:
            if(tabla[i].tipo != VARIABLE):
                error(12) #error 12: no están permitidas las asignaciones a constantes o a procedimientos
        obtoken()
        if(token == asignacion):
            obtoken()
        else:
            error(13) #error 13: se esperaba el operador de asignación
        expresion()
    else:
        if(token == calltok):
            obtoken()
            if(token != ident):
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
            if(token == iftok):
                obtoken()
                condicion()
                if(token == thentok):
                    obtoken()
                else:
                    error(16) #error 16: Se esperaba un "THEN"
                instruccion()
            else:
                if(token == begintok):
                    obtoken()
                    instruccion()
                    while (token == puntoycoma):
                        obtoken()
                        instruccion()
                    if(token == endtok):
                        obtoken()
                    else:
                        error(17) #error 17: Se esperaba un "END" o un punto y coma 
                else:
                    if(token == whiletok):
                        obtoken()
                        condicion()
                        if(token == dotok):
                            obtoken()
                        else:
                            error(18) #error 18: Se esperaba un "DO"
                        instruccion()

def expresion():
    if(token == mas or token == menos):
        obtoken()
        termino()
    else:
        termino()
    while(token == mas or token == menos):
        obtoken()
        termino()

def termino():
    factor()
    while(token == por or token == barra):
        obtoken()
        factor()

def factor():
    i = None
    if(token == ident):
        i = posicion()
        if(i == 0):
            error(11) #error 11: Identificador no declarado
        else:
            if(tabla[i].tipo == PROCEDIMIENTO):
                error(21) #error 21: Una expresión no debe contener un identificador de procedimiento
        obtoken()
    else:
        if(token == numero):
            obtoken()
        else:
            if(token == parena):
                obtoken()
                expresion()
                if(token == parenc):
                    obtoken()
                else:
                    error(22) #error 22: Falta un paréntesis de cierre  
            else:
                error(23) #error 23: El factor anterior no puede ir seguido de este símbolo 

def condicion():
    if(token == oddtok):
        obtoken()
        expresion()
    else:
        expresion()
        if((token != igl) and (token != nig) and (token != mei) and (token != myr) and (token != mai)):
            error(20) #error 20: Se esperaba un operador relacional
        else:
            obtoken()
            expresion()

