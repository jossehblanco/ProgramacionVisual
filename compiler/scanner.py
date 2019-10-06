linea #buffer de lineas
ll #contador de caracters
offset #corrimiento en la lectura de los caracteres del programa fuente
fin_archivo #bandera de fin
ch #ultimo caracter leido
lex #ultimo lexema leido
valor #valor numero de un lexema correspondiente a un numero

def getline(s,lim):
    c = f.read(1)
    for i in range(0,lim-1):
        if(c == '\n'):
            break
        s[i] = c
    if(c == '\n'):
        s[i] = c
        i+=1
    s[i] = '\0'
    return i

def obtch():
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
        return(linea[i].upper())

def obtoken():
    lexid = None
    ok=0
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
        lexid += '\0'

        for j in range(0,MAXPAL):
            if(lexid == lexpal[j]):
                ok=1
                break

        if(ok == 1):
            token = tokpal[j]
        else:
            token = ident

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
                error(30)
            token = numero
            valor = atol(lexid)
        else:
            if(ch == '<'):
                ch=obtch()
                if(ch == '='):
                    token = mei
                    ch = obtch()
                else:
                    token = mnr
            elif(ch == '>'):
                ch = obtch()
                if(ch == '='):
                    token = mai
                    ch = obtch()
                #elif(ch == ':'):
                    #ch = obtch()
                    #if(ch == 'v'):
                        #token = fin
                        #ch = obtch()
                else:
                    token = myr
            elif(ch == '!'):
                ch = obtch()
                if(ch == '='):
                    token = nig
                    ch = obtch()
                else:
                    token = nulo
            elif(ch == '='):
                ch = obtch()
                if(ch == '='):
                    token = igl
                    ch = obtch()
                else:
                    token = asignacion
            else:
                token = espec[ch]
                ch = obtch()







                 
