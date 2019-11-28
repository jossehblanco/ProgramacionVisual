from enum import Enum

MAXIC = 200
LONGSTACK = 500


class fcn(Enum):
    LIT = 0
    OPR = 1
    CAR = 2
    ALM = 3
    LLA = 4
    INS = 5
    SAL = 6
    SAC = 7


class codigo_intermedio(object):
    def __init__(self, f, ni, di):
        self.ni = ni
        self.di = di
        self.f = f

global codigo
global p
codigo=[]
p=[]

mnemonico=["LIT","OPR","CAR","ALM","LLA","INS","SAL","SAC"]
comentario=[";cargar una constante",";operacion aritmetica, relacional o retornar",";cargar una variable",
                     ";almacenamiento/instruccion de asignacion",";llamada a procedimiento",";asignacion de espacio de memoria",
                     ";salto incondicional",";salto condicional"]


def base(ni, b):
    bi=b
    while ni > 0:
        b1 = p[b1]
        ni -=1
    return bi

def interpretar():
    s=-1
    b=0
    d=0
    p.insert(0,0)
    p.insert(1,0)
    p.insert(2,0)
    while d != 0:
        d += 1
        i=codigo[d]
        print("\nejecutando la instruccion ", d-1,": ", mnemonico[i.f]," ",i.ni," ",i.di)

        if i.f == fcn.LIT:
            s += 1
            p[s] = i.di
            print("\nLIT: cargando la literal ",i.di," en la direccion ",s," ( s en ",s,")")

        if i.f == fcn.CAR:
            s += 1
            p[s] = p[base(i.ni,b) + i.di]
            print("\nCAR: cargando ",p[base(i.ni,b) + i.di]," en la direccion ",s,"(s en ",s,")")

        if i.f == fcn.ALM:
            print("\nALM : almacenando ",p[s]," en la direccion ", base(i.ni,b)+i.di," (s en",s-1,")")
            p[base(i.ni,b)+i.di]=p[s]
            s -= 1
        if i.f == fcn.LLA:
            p[s+1] = base(i.ni,b)
            p[s+2] = b
            p[s+3] = d
            print("\nLLA: activando subrutina, enlaces y DR: ",p[s+1]," ",p[s+2]," ",p[s+3]," ")
            b=s+1
            d=i.di
            print("\n      :nueva base",b," , instruccion ",d," (s en",s,")")

        if i.f == fcn.INS:
            print("\nINS : asignando ",i.di," espacions en el stack (s en ",s+i.di," )")
            s += i.di

        if i.f == fcn.SAL:
            print("\nSAL: saltando incondicionalmente a la instruccion ",i.di," (s en ",s,")")
            d=i.di

        if i.f == fcn.SAC:
            print("\nSAC : ")
            if(p[s]==0):
                d = i.di
                print("la condicion es falsa. slatando condicionalmente a la instruccion ",d," .")
            else:
                print("la condicion es verdadera. prosigo en la instruccion ",d,".")
            s -= 1
            print("(s en ",s,")")

        if i.f == fcn.OPR:
            print("\nOPR: ")
            if i.di == 0:
                s = b-1
                d = p[s+3]
                b = p[s+2]
                print("retornar a la instruccion ",d,", base= ",b,"(s en ",s,")")

            if i.di == 2:
                print("suma de ",p[s]," + ",p[s+1]," (s en ",s,")")
                p[s]=p[s]+p[s+1]

            if i.di == 3:
                print("resta de ", p[s], " + ", p[s + 1], " (s en ", s, ")")
                p[s] = p[s] - p[s + 1]

            if i.di == 4:
                print("multiplicacion de ", p[s], " + ", p[s + 1], " (s en ", s, ")")
                p[s] = p[s] * p[s + 1]

            if i.di == 5:
                print("division de ", p[s], " + ", p[s + 1], " (s en ", s, ")")
                if(p[s+1]==0):
                    file.close()
                    print("Error a tiempo de ejecucion\nSe intenta dividir entre cero")
                    print("--Programa abortado--")
                    exit(1)
                p[s] = p[s] / p[s+1]

            if i.di == 8:
                s -= 1
                print(p[s],"=",p[s+1],"? (s en ",s,")")
                p[s]= p[s] == p[s+1]

            if i.di == 9:
                s -= 1
                print(p[s],"!=",p[s+1],"? (s en ",s,")")
                p[s]= p[s] != p[s+1]

            if i.di == 10:
                s -= 1
                print(p[s], "<", p[s + 1], "? (s en ", s, ")")
                p[s] = p[s] < p[s + 1]

            if i.di == 11:
                s -= 1
                print(p[s], ">=", p[s + 1], "? (s en ", s, ")")
                p[s] = p[s] >= p[s + 1]

            if i.di == 12:
                s -= 1
                print(p[s], ">", p[s + 1], "? (s en ", s, ")")
                p[s] = p[s] > p[s + 1]

            if i.di == 13:
                s -= 1
                print(p[s], "<=", p[s + 1], "? (s en ", s, ")")
                p[s] = p[s] <= p[s + 1]

            if i.di == 14:
                s -= 1
                print(p[s], "AND", p[s + 1], "? (s en ", s, ")")
                p[s] = p[s] and p[s + 1]

            if i.di == 15:
                s -= 1
                print(p[s], " OR ", p[s + 1], "? (s en ", s, ")")
                p[s] = p[s] or p[s + 1]

global file

def main(argv):
    file = open(argv,"r")
    if file == None:
        print("Error al abrir el archivo")
    else:
        ic=0
        line = file.readline()
        codigo[ic] = codigo_intermedio(line[2:5],line[6],line[8])
        while line != '':
            ic += 1
            line = file.readline()
            codigo[ic] = codigo_intermedio(line[2:5],line[6],line[8])
        file.close()
        interpretar()