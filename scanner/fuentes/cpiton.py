import datetime
import mensajes_de_error
import lexico
import codigo_p
#import auxiliares
import parametros
import scanner
import parseador
import tds
from conjuntos import inicializar_conjuntos

fp = None
No_de_errores = 0
global niv
niv=0
def main(argv):
    global fp
    if argv==None:
        print("\nNo se ha proporcionado el nombre del programa fuente (uso: parser1 progfuente)")
    
    else:
        fp=open(argv,"r")        
        if fp==None:
            print("\nNo se encontro el programa fuente indicado")
        else:
            global nombreArch
            nombreArch=argv
            timer=datetime.datetime.today()
            
            #print("\n\nCompilador de cpiton version 69.0/parser1 --- Octubre de 2019 --- \n")
            #print(timer)
            #print("\nLexema                  Token\n")
            
            from auxiliares import inicializar_espec
            #print(auxiliares.hola)
            

            inicializar_espec()
            
            scanner.consolef.write("\n\nCompilador de cpiton version 69.0/parser1 --- Octubre de 2019 --- \n")
            scanner.consolef.write(timer.strftime('%d/%m/%Y'))
            scanner.consolef.write("\nLexema                  Token\n")
            
            scanner.ch=' '
            scanner.fin_de_archivo=0
            scanner.offset=-1
            scanner.ll=0
            No_de_errores = 0

            #inicializacion de conjuntos de estabilizacion (en conjuntos.py) 
            inicializar_conjuntos()

            scanner.obtoken()
            
            niv=0
            tds.it=0
            #global token
            #token = scanner.obtoken()
            #while(token != lexico.simbolo.mdputok):
            #    token = scanner.obtoken()
            #                
            parseador.inicio()
            
            
            from auxiliares import error
            if lexico.token!=lexico.simbolo.mdputok:
                error(32)
            
            from auxiliares import estadisticas
            estadisticas()
            scanner.consolef.close()
            fp.close()
            
            
            if No_de_errores==0:
                codigo_p.listar_p()
                codigo_p.escribe_codigo(argv)
            
    return 0
