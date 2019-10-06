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
    procto=29


class tokpal(Enum):
    begintok=0
    calltok=1
    consttok=2
    dotok=3
    endtok=4
    iftok=5
    oddtok=6
    proctok=7
    thentok=8
    vartok=9
    whiletok=10
    
