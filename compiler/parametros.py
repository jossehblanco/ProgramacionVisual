import re
MAXLINEA=1000   #Tamaño maximo de una linea ARCHIVO
MAXPAL=34       #Numero de palabras reservadas
MAXDIGIT=5      #Maximo de digitos en numeros enteros ARCHIVO
MAXDECIMAL=5    #Maximo de digitos despues del punto
MAXID=10        #Maxima longitud de identificadores ARCHIVO
LONG_FECHA=30   #Maxima longitud de fecha
MAXIT=100       #Maximo tamaño de tabla de los simbolos

try:
    with open("../params.txt") as fp:
        line=fp.readline()
        lines=re.findall(r'\d+',line)
        numero=int(lines[0])
        MAXLINEA=numero
        line=fp.readline()
        lines=re.findall(r'\d+',line)
        numero=int(lines[0])
        MAXDIGI=numero
        line=fp.readline()
        lines=re.findall(r'\d+',line)
        numero=int(lines[0])
        MAXID=numero
except Exception as ex:
    print("Archivo no encontrado "+ex)
