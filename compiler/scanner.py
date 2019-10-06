from parametros import *
from lexico import *

linea=" " #buffer de lineas
ll=0 #contador de caracters
offset=0 #corrimiento en la lectura de los caracteres del programa fuente
fin_archivo=0 #bandera de fin
ch=" " #ultimo caracter leido
lex=" " #ultimo lexema leido
valor=0 #valor numero de un lexema correspondiente a un numero

def getline(s,lim):
    import pl0
    global linea
    c = pl0.fp.read(1)
    for i in range(0,lim-1):
        if(c == '\n' or i == lim):
            break
        s += c
        c = pl0.fp.read(1)
    if(c == '\n'):
        s += c
        i+=1
    s += '\0'
    linea = s
    return i

def obtch():
    from auxiliares import error
    global fin_archivo
    global offset
    global ll
    global linea
    global MAXLINEA
    if(fin_archivo == 1):
        error(32)
    if(offset == ll-1):
        ll = getline(linea,MAXLINEA)
        if(ll == 0):
            fin_archivo = 1
            print(linea)
            offset-=1
    offset += 1

    if( (linea[offset] == '\0') or (fin_archivo == 1)):
        return ' '
    else:
        return(linea[offset].upper())

def obtoken():
    from auxiliares import error
    lexid = None
    global lex
    ok=0
    global ch
    while(ch == ' ' or ch == '\n' or ch == '\t'):
        ch=obtch()

    if(ch.isalpha()):
        lexid = ch
        i = 1
        ch = obtch()
        while( ch.isalpha() or isinstance(ch,int)):
            if(i < MAXID):
                i+=1
                lexid += ch
            ch = obtch()
        #lexid += '\0'

        for j in range(0,MAXPAL):
            if(lexid == lexpal[j]):
                ok=1
                break

        if(ok == 1):
            token = tokpal[j]
        else:
            token = lexico.simbolo.ident

        lexid = lex

    else:
        if(isinstance(ch,int)):
            lexid = ch
            i=j=1
            ch = obtch()
            while ( isinstance(ch,int)):
                if(i<MAXDIGIT):
                    i+=1
                    lexid += ch
                j+=1
                ch = obtch()
            lexid += '\0'
            if(j>MAXDIGIT):
                auxiliares.error(30)
            token = lexico.simbolo.numero
            valor = int(lexid)
        else:
            if(ch == '<'):
                ch=obtch()
                if(ch == '='):
                    token = lexico.simbolo.mei
                    ch = obtch()
                else:
                    token = lexico.simbolo.mnr
            elif(ch == '>'):
                ch = obtch()
                if(ch == '='):
                    token = lexico.simbolo.mai
                    ch = obtch()
                #elif(ch == ':'):
                    #ch = obtch()
                    #if(ch == 'v'):
                        #token = fin
                        #ch = obtch()
                else:
                    token = lexico.simbolo.myr
            elif(ch == '!'):
                ch = obtch()
                if(ch == '='):
                    token = lexico.simbolo.nig
                    ch = obtch()
                else:
                    token = lexico.simbolo.nulo
            elif(ch == '='):
                ch = obtch()
                if(ch == '='):
                    token = lexico.simbolo.igl
                    ch = obtch()
                else:
                    token = lexico.simbolo.asignacion
            else:
                token = espec[ch]
                ch = obtch()







                 
