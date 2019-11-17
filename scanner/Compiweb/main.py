import sys
from cpiton import main

MaxLinea=0
MaxDigi=0
MaxId=0

def compiweb(src, maxlinea,maxdigi,maxid):
    MaxLinea=int(maxlinea)
    MaxDigi=int(maxdigi)
    MaxId=int(maxid)
    main(src)

#x = str(sys.argv[1])
#connection carlitox
#main("/home/carlos/Documentos/TeoriaProyecto/TeoProyecto/compiler/ejemplo.txt")

#connection bebecito falso
#main("ejemplo.txt")

#connection bebecito
#main(x)
