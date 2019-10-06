from parametros import *
import lexico as Lexico

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
    try:
        actual = linea[offset]
        if( (actual == '\0') or (actual == '\n') or (fin_archivo == 1)):
            return ' '
        else:
            return(linea[offset].upper())
    except IndexError:
        ll = getline(linea,MAXLINEA)
        actual = linea[offset]
        if( (actual == '\0') or (actual == '\n') or (fin_archivo == 1)):
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
            if(lexid == Lexico.lexpal[j]):
                ok=1
                break

        if(ok == 1):
            Lexico.token = Lexico.tokpal[j]
        else:
            Lexico.token = Lexico.simbolo.ident

        lex = lexid

    else:
        #if(isinstance(ch,int)):
        try:
            prueba = int(ch)
            lexid = ch
            i=j=1
            ch = obtch()
            #while ( isinstance(ch,int)):
            while(1):
                try:
                    prueba = int(ch)
                    if(i<MAXDIGIT):
                        i+=1
                        lexid += ch
                    j+=1
                    ch = obtch()
                except ValueError:
                    break
            if(j>MAXDIGIT):
                auxiliares.error(30)
            Lexico.token = Lexico.simbolo.numero
            valor = int(lexid)
            lexid += '\0'
        except ValueError:
            if(ch == '<'):
                ch=obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.mei
                    ch = obtch()
                else:
                    if(ch == '>'):
                        Lexico.token = Lexico.simbolo.nig
                        ch = obtch()
                    else:
                        Lexico.token = Lexico.simbolo.mnr
            elif(ch == '>'):
                ch = obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.mai
                    ch = obtch()
                #elif(ch == ':'):
                    #ch = obtch()
                    #if(ch == 'v'):
                        #token = fin
                        #ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.myr
            elif(ch == ':'):
                ch = obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.asignacion
                    ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.nulo
            #elif(ch == '='):
            #    ch = obtch()
            #    if(ch == '='):
            #        Lexico.token = Lexico.simbolo.igl
            #        ch = obtch()
            #    else:
            #        Lexico.token = Lexico.simbolo.asignacion
            else:
                Lexico.token = Lexico.espec[ord(ch)]
                ch = obtch()







                 
