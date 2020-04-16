from rest_framework import serializers
from bill.models import bill

# bill Serializer
class billSerializer(serializers.ModelSerializer):
  class Meta:
    model = bill 
    fields = '__all__'