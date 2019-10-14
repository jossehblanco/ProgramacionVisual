from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Params
from .serializers import ParamsSerializer
from django.core.files import File
# Create your views here.

class ParamsView(APIView):
    def get(self, request):
        params = Params.objects.all()
        serializer = ParamsSerializer(params, many=True)
        return Response({"params" : serializer.data})
    def post(self, request):
        MAXLINEA = ""
        MAXDIGIT = ""
        MAXID =  ""
        params = request.data.get('param')
        serializer = ParamsSerializer(data = params)
        if serializer.is_valid(raise_exception =True):
            MAXLINEA += "MAXLINEA;" + str(serializer.data.get('MAXLINEA')) + "\n"
            MAXDIGIT += "MAXDIGIT;" + str(serializer.data.get('MAXDIGIT')) + "\n" 
            MAXID += "MAXID;" + str(serializer.data.get('MAXID')) + "\n"
        with open('/home/jossehblanco/Desktop/ProyectoTeo/PROYECTO/ide/fuente/teoserver/params.txt', 'w') as f:
            myFile = File(f)
            myFile.write(MAXLINEA)
            myFile.write(MAXDIGIT)
            myFile.write(MAXID)
        myFile.closed
        f.closed
        return Response({"success": "Article '{}' created successfully"})