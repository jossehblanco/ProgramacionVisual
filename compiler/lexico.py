from enum import Enum
from parametros import *

lexpal=[":v",">:v","num","dec","texto","car","vof","si","sino","osi","para","mientras","has","ret"]

class simbolo(Enum):
    nulo=0
    ident=1
    valortok=2
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
    dputok=20
    mdputok=21
    sitok=22
    sitok=23
    sinotok=24
    ositok=25
    paratok=26
    mientrasttok=27
    hastok=28
    rettok=29
    funtok=30
    tipotok=31
    expretok=32
    

tokpal = [simbolo.dputok, simbolo.mdputok, simbolo.sitok, simbolo.sinotok, simbolo.ositok, simbolo.paratok, simbolo.paratok, simbolo.mientrasttok, simbolo.hastok, simbolo.rettok, simbolo.funtok,simbolo.tipotok,simbolo.expretok]

token = simbolo.nulo

espec = []
