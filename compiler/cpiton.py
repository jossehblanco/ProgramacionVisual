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
            print("\n\nCompilador de cpiton version 69.0/parser1 --- Octubre de 2019 --- \n")
            print(timer)
            print("\nLexema                  Token\n")
            
            from auxiliares import inicializar_espec
            #print(auxiliares.hola)
            inicializar_espec()
            
            scanner.ch=' '
            scanner.fin_de_archivo=0
            scanner.offset=-1
            scanner.ll=0
            scanner.obtoken()
            
            
            tds.it=0
            #global token
            #token = scanner.obtoken()
            #while(token != lexico.simbolo.mdputok):
            #    token = scanner.obtoken()

            parseador.inicio()
            
            
            from auxiliares import error
            if lexico.token!=lexico.simbolo.mdputok:
                error(32)
            
            from auxiliares import estadisticas
            estadisticas()
            
            fp.close
            
    return 0
