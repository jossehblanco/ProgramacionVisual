import datetime
import mensajes_de_error
import lexico
#import auxiliares
import parametros
import scanner
import parseador
import tds

fp = None

def main(argv):
    global fp
    if argv==None:
        print("\nNo se ha proporcionado el nombre del programa fuente (uso: parser1 progfuente)")
    
    else:
        fp=open(argv,"r")
        if fp==None:
            print("\nNo se encontro el programa fuente indicado")
        else:
            timer=datetime.datetime.today()
            print("\n\nCompilador de pl0 version 3.0/parser1 --- abril de 2011 --- A2\n")
            print(timer)
            
            from auxiliares import inicializar_espec
            #print(auxiliares.hola)
            inicializar_espec()
            
            scanner.ch=' '
            scanner.fin_de_archivo=0
            scanner.offset=-1
            scanner.ll=0
            scanner.obtoken()
            
            it=0
            
            parseador.bloque()
            
            if token!=punto:
                error(9)
            
            estadisticas()
            
            fp.close
            
    return 0
