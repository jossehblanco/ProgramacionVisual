from enum import Enum
from parametros import *

lexpal=["BEGIN","CALL","CONST","DO","END","IF","ODD","PROCEDURE","THEN","VAR","WHILE"]

class simbolo(Enum):
    nulo=0
    ident=1
    numero=2
    mas=3
    menos=4
    por=5
    barra=6
    oddtok=7
    igl=8
    nig=9
    mnr=10
    mei=11
    myr=12
    mai=13
    parena=14
    parenc=15
    coma=16
    puntoycoma=17
    punto=18
    asignacion=19
    begintok=20
    endtok=21
    iftok=22
    thentok=23
    whiletok=24
    dotok=25
    calltok=26
    consttok=27
    vartok=28
    proctok=29

tokpal = [simbolo.begintok, simbolo.calltok, simbolo.consttok, simbolo.dotok, simbolo.endtok, simbolo.iftok, simbolo.oddtok, simbolo.proctok, simbolo.thentok, simbolo.vartok, simbolo.whiletok]

token = simbolo.nulo

espec = []
