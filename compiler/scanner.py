from parametros import *
import lexico as Lexico

linea=[] #buffer de lineas
contadorLineas = 0
ll=0 #contador de caracters
offset=0 #corrimiento en la lectura de los caracteres del programa fuente
fin_archivo=0 #bandera de fin
ch=" " #ultimo caracter leido
lex=" " #ultimo lexema leido
valor=0 #valor numero de un lexema correspondiente a un numero

def getline(lim):
    import cpiton
    global linea
    c = cpiton.fp.read(1)
    s = ""
    for i in range(0,lim-1):
        if(c == '\n' or c=='' or i == lim):
            break
        s += c
        c = cpiton.fp.read(1)
    if(c == '\n'):
        s += c
        i+=1
    linea.append(s)
    return i

def obtch():
    from auxiliares import error
    global fin_archivo
    global offset
    global ll
    global linea
    global MAXLINEA
    global contadorLineas
    if(fin_archivo == 1):
        error(32)
    if(offset == ll-1):
        ll = getline(MAXLINEA)
        offset = -1
        if(ll == 0):
            fin_archivo = 1
            print(linea)
            offset-=1
    offset += 1
    #
    actual = linea[contadorLineas][offset]
    if((fin_archivo == 1)):
        return ' '
    elif(actual == '\n'):
        contadorLineas += 1
        return ' '
    else:
        return(linea[contadorLineas][offset])
    #except IndexError:
    #    ll = getline(linea,MAXLINEA)
    #    actual = linea[offset]
    #    if( (actual == '\0') or (actual == '\n') or (fin_archivo == 1)):
    #        return ' '
    #    else:
    #        return(linea[offset].upper())

def leerints(lexid, i, j, MAX, checkDecimal):
    global ch
    while(1):
        try:
            prueba = int(ch)
            if(i<MAX):
                i+=1
                lexid += ch
            j+=1
            ch = obtch()
        except ValueError:
            if(checkDecimal):
                error(1)#si en la primera iteracion no viene un numero es como que pongan 2. y nada mas
            break
    if(j>MAX):
        error(30)
    return

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
        while( ch.isalpha()):
            if(i < MAXID):
                i+=1
                lexid += ch
            ch = obtch()

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
        try:
            prueba = int(ch)
            lexid = ch
            i=j=1
            ch = obtch()
            isDouble = False            
            leerints(lexid, i,j,MAXDIGIT,False)
            #VERIFICANDO SI ES DECIMAL
            if(ch == '.'):
                isDouble = True
                lexid += ch
                ch = obtch()
                i=j=1
                leerints(lexid,i,j, MAXDECIMAL,True)
             
            if(isDouble):
                Lexico.token = Lexico.simbolo.dectok
                valor = float(lexid)
            else:
                Lexico.token = Lexico.simbolo.numtok
                valor = int(lexid)
        except ValueError:
            if(ch == ':'):
                ch = obtch()
                if(ch == 'v'):
                    Lexico.token = Lexico.simbolo.dputok
                    ch = obtch()
                else:
                    error(28)
            elif(ch == '<'):
                ch=obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.mei
                    ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.mnr
            elif(ch == '>'):
                ch = obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.mai
                    ch = obtch()
                elif(ch == ':'):
                    ch = obtch()
                    if(ch == 'v'):
                        Lexico.token = Lexico.simbolo.mdputok
                        ch = obtch()
                    else:
                        Lexico.token = Lexico.simbolo.nulo
                        ch = obtch()
                        error(28)
                else:
                    Lexico.token = Lexico.simbolo.myr
            elif(ch == '='):
                ch = obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.igl
                    ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.asignacion
            elif(ch == '!'):
                ch = obtch()
                if(ch == '='):
                    Lexico.token = Lexico.simbolo.nig
                    obtoken()
                else:
                    error(15)
            else:
                Lexico.token = Lexico.espec[ord(ch)]
                ch = obtch()







                 
