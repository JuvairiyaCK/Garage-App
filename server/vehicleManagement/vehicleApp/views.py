from django.shortcuts import render
from .models import Customer,Services
from .serializers import CustomerSerializer,ServiceSerializer,UserSerializer
from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import authentication,permissions

# Create your views here.


class UserRegisterView(ViewSet):
    def create(self,request,*args,**kwargs):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_404_NOT_FOUND)



class CustomerView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer

    @action(methods=["POST"],detail=True)
    def add_services(self,request,*args,**kwargs):
        id=kwargs.get('pk')
        customer=Customer.objects.get(id=id)
        serializer=ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=customer)
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)


class ServiceView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    queryset=Services.objects.all()
    serializer_class=ServiceSerializer