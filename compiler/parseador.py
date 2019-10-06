from tds import *
from auxiliares import *
import lexico as Lexico
from scanner import *

def bloque():
    temp = None
    if(Lexico.token == Lexico.simbolo.consttok):
        obtoken()
        declaracionconst()

        while (Lexico.token == Lexico.simbolo.coma):
            obtoken()
            declaracionconst()
        
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)

    if(Lexico.token == Lexico.simbolo.vartok):
        obtoken();
        declaracionvar();

        while(Lexico.token == Lexico.simbolo.coma):
            obtoken()
            declaracionvar()
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)

    while(Lexico.token == Lexico.simbolo.proctok):
        obtoken()
        if(Lexico.token == Lexico.simbolo.ident):
            poner(objeto.PROCEDIMIENTO)
            obtoken()
        else:
            error(4)
        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)
        temp = it
        bloque()
        it = temp

        if(Lexico.token == Lexico.simbolo.puntoycoma):
            obtoken()
        else:
            error(5)

    instruccion()

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

def instruccion():    
    if(Lexico.token == Lexico.simbolo.ident):
        i = posicion()
        if(i == -1):
            error(11) #error 11: identificador no declarado 
        else:
            if(tabla[i].tipo != objeto.VARIABLE):
                error(12) #error 12: no están permitidas las asignaciones a constantes o a procedimientos
        obtoken()
        if(Lexico.token == Lexico.simbolo.asignacion):
            obtoken()
        else:
            error(13) #error 13: se esperaba el operador de asignación
        expresion()
    else:
        if(Lexico.token == Lexico.simbolo.calltok):
            obtoken()
            if(Lexico.token != Lexico.simbolo.ident):
                error(14) #error 14: "CALL" debe ir seguido de un identificador 
            else:
                i = posicion()
                if(i == -1):
                    error(11) #error 11: Identificador no declarado 
                else:
                    if(tabla[i].tipo != objeto.PROCEDIMIENTO):
                        error(15) #error 15 : No tiene sentido llamar a una constante o a una variable 
                obtoken()
        else:
            if(Lexico.token == Lexico.simbolo.iftok):
                obtoken()
                condicion()
                if(Lexico.token == Lexico.simbolo.thentok):
                    obtoken()
                else:
                    error(16) #error 16: Se esperaba un "THEN"
                instruccion()
            else:
                if(Lexico.token == Lexico.simbolo.begintok):
                    obtoken()
                    instruccion()
                    while (Lexico.token == Lexico.simbolo.puntoycoma or Lexico.token == Lexico.simbolo.coma):
                        obtoken()
                        instruccion()
                    if(Lexico.token == Lexico.simbolo.endtok):
                        obtoken()
                    else:
                        error(17) #error 17: Se esperaba un "END" o un punto y coma 
                else:
                    if(Lexico.token == Lexico.simbolo.whiletok):
                        obtoken()
                        condicion()
                        if(Lexico.token == Lexico.simbolo.dotok):
                            obtoken()
                        else:
                            error(18) #error 18: Se esperaba un "DO"
                        instruccion()

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

