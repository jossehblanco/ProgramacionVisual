import datetime
import mensajes_de_error
import lexico
import auxiliares
import parametros
import scanner
import parser
import tds
 
def main(argv):
    
    if argv==None:
        print("\nNo se ha proporcionado el nombre del programa fuente (uso: parser1 progfuente)")
    
    else:
        fp=open(argv,"r")
        if fp==None:
            print("\nNo se encontro el programa fuente indicado")
        else:
            timer=datetime.datetime.today()
            print("\n\nCompilador de pl0 version 3.0/Parser1 --- abril de 2011 --- A2\n")
            print(timer)
            
            inicializar_espec()
            
            ch=' '
            fin_de_archivo=0
            offset=-1
            ll=0
            obtoken()
            
            it=0
            
            bloque()
            
            if token!=punto:
                error(9)
            
            estadisticas()
            
            fp.close
            
    return 0

main("/home/carlos/Documentos/TeoriaProyecto/TeoProyecto/compiler/ejemplo.txt")
