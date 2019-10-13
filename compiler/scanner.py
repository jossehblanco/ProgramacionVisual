from parametros import *
import lexico as Lexico
from auxiliares import error

linea=[] #buffer de lineas
contadorLineas = 0
ll=0 #contador de caracters
offset=0 #corrimiento en la lectura de los caracteres del programa fuente
fin_archivo=0 #bandera de fin
ch=" " #ultimo caracter leido
lex=" " #ultimo lexema leido
valor=0 #valor numero de un lexema correspondiente a un numero
lextoken = ""
caracteres = ""

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
    #Le pongo el or pues si es una linea de comentario deberia de saltarse esa linea y leer otra
    if(offset == ll-1 or Lexico.token == Lexico.simbolo.linecomment):
        if(Lexico.token == Lexico.simbolo.linecomment):
            contadorLineas +=1
        ll = getline(MAXLINEA)
        offset = -1
        if(ll == 0):
            fin_archivo = 1
            print(linea)
            offset-=1
    offset += 1
    #
    if(offset == -1):
        return ' '
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
                if(ch != ';' or (j == 1 and ch == ';')):
                    error(1)#si en la primera iteracion no viene un numero es como que pongan 2. y nada mas
            break
    if(j>MAX):
        error(33)
    return

def obtoken():
    global lextoken
    global caracteres
    #from auxiliares import error
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
        while( ch.isalnum() or ord(ch) == '95'):
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

        lex = lexid[:]

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
                Lexico.token = Lexico.simbolo.decimal
                valor = float(lexid)
            else:
                Lexico.token = Lexico.simbolo.numero
                valor = int(lexid)
        except ValueError:
            if(ch == ':'):
                caracteres = ch
                ch = obtch()
                if(ch == 'v'):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.dputok
                    ch = obtch()
                else:
                    error(28)
            elif(ch == '<'):
                caracteres = ch
                ch=obtch()
                if(ch == '='):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.mei
                    ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.mnr
            elif(ch == '>'):
                caracteres = ch
                ch = obtch()
                if(ch == '='):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.mai
                    ch = obtch()
                elif(ch == ':'):
                    caracteres += ch
                    ch = obtch()
                    if(ch == 'v'):
                        caracteres += ch
                        Lexico.token = Lexico.simbolo.mdputok
                        ch = obtch()
                    else:
                        Lexico.token = Lexico.simbolo.nulo
                        ch = obtch()
                        error(28)
                else:
                    Lexico.token = Lexico.simbolo.myr
            elif(ch == '='):
                caracteres = ch
                ch = obtch()
                if(ch == '='):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.igl
                    ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.asignacion
            elif(ch == '!'):
                caracteres = ch
                ch = obtch()
                if(ch == '='):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.nig          
                    ch = obtch()
                else:
                    error(15)
            elif(ch == '/'):
                caracteres = ch
                ch = obtch()
                if(ch == '/'):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.linecomment
                    ch = obtch()
                elif(ch == '*'):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.startcomment
                    ch = obtch()
                else:
                    error(15)
            elif(ch == '*'):
                caracteres = ch
                ch = obtch()
                if(ch == '/'):
                    caracteres += ch
                    Lexico.token = Lexico.simbolo.endcomment
                    ch = obtch()
                else:
                    Lexico.token = Lexico.simbolo.por
            else:
                caracteres = ch
                Lexico.token = Lexico.espec[ord(ch)]
                ch = obtch()

    lextoken = Lexico.token
    if(lexid is None):
        lexid = caracteres
    lextoken = lexid + "                    " + str(Lexico.token)
    print(lextoken)
    print("\n")
    if(Lexico.token == Lexico.simbolo.linecomment):
        #para que no vuelva a entrar al if de la funcion obtch()
        Lexico.token = Lexico.simbolo.nulo
        obtoken()
    if(Lexico.token == Lexico.simbolo.startcomment):
        while(Lexico.token != Lexico.simbolo.endcomment):
            ch = obtch()
            obtoken()
        obtoken()
    








                 
