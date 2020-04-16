from rest_framework import routers
from .api import billViewSet, billTrain, billPredict
from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/bill', billViewSet, 'bill')

urlpatterns = [
    path('api/train',  billTrain.as_view()),
    path('api/predict',  billPredict.as_view()),
]

urlpatterns += router.urls