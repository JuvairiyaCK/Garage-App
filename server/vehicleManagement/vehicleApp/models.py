from django.db import models

# Create your models here.
class Customer(models.Model):
    customer_name=models.CharField(max_length=100)
    phone=models.IntegerField()
    vehicle_no=models.CharField(max_length=100)
    date=models.DateField(auto_now_add=True)
    image=models.ImageField(upload_to='media')
    status=models.CharField(max_length=100,default="pending")


    def service(self):
        data=Services.objects.filter(customer=self)
        return data

    def total_price(self):
        qs=self.services_set.all() #queryset<[obj1,obj2]>
        prices=[i.price for i in qs]  #[500,600,900]
        total=sum(prices)
        return total 



class Services(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    description=models.TextField(max_length=200)
    price=models.PositiveIntegerField()
