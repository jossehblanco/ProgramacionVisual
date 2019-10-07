from enum import Enum
from parametros import *

lexpal=[":v",">:v","num","dec","texto","car","vof","si","sino","osi","para","mientras","has","ret","fun","retorna"]

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
    mientrastok=27
    hastok=28
    rettok=29
    funtok=30
    expretok=31
    numtok=32
    dectok=33
    textok=34
    cartok=35
    voftok=36
    numarra=37
    decarra=38
    textoarra=39
    cararra=70
    vofarra=71
    llaveatok=72
    llavectok=73
    rangotok = 76
    
    
    
    corchab=74
    corchcr=75
    parametok=76
    retortok=77

    

tokpal = [simbolo.dputok, simbolo.mdputok, simbolo.numtok, simbolo.dectok, simbolo.textok, simbolo.car, simbolo.voftok, simbolo.sitok, simbolo.sinotok, simbolo.ositok, simbolo.paratok,simbolo.mientrasttok,simbolo.hastok, simbolo.rettok]

token = simbolo.nulo

espec = []
