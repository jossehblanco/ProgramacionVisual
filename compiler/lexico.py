from enum import Enum
from parametros import *

lexpal=[":v",">:v","num","dec","texto","car","vof","si","sino","osi","para","mientras","has","ret","fun","rango","elev",
        "raizc","abs","aproxar","log","euxp","cptexto","modulo","tamtxt","aproxab","leerstd","imp","abArch","cArch","leerArch",
        "escArch"]
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
    sinotok=23
    ositok=24
    paratok=25
    mientrastok=26
    hastok=27
    rettok=28
    funtok=29
    expretok=30
    numtok=31
    dectok=32
    textok=33
    cartok=34
    voftok=35
    numarra=36
    decarra=37
    textoarra=38
    cararra=70
    vofarra=71
    llaveatok=72
    llavectok=73
    corchab=74
    corchcr=75
    rangotok = 76
    parametok=77
    #FUNCIONES DEL LENGUAJE
    elev = 300
    raizc = 301
    abs = 302
    aproxar = 303
    log = 304
    euxp = 305
    cptexto = 306
    modulo = 307
    tamtxt = 308
    aproxab = 309
    leerstd = 400
    imp = 401
    abArch = 402
    cArch = 403
    leerArch = 404
    escArch = 405

    

tokpal = [simbolo.dputok, simbolo.mdputok, simbolo.numtok, simbolo.dectok, simbolo.textok, simbolo.cartok, simbolo.voftok, simbolo.sitok,
         simbolo.sinotok, simbolo.ositok, simbolo.paratok,simbolo.mientrastok,simbolo.hastok, simbolo.rettok, simbolo.funtok, simbolo.rangotok,
         simbolo.elev, simbolo.raizc, simbolo.abs, simbolo.aproxar, simbolo.log, simbolo.euxp, simbolo.cptexto, simbolo.modulo, simbolo.tamtxt,
         simbolo.aproxab, simbolo.leerstd, simbolo.imp, simbolo.abArch, simbolo.cArch, simbolo.leerArch, simbolo.escArch]

token = simbolo.nulo

espec = []
