from .models import bill
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import billSerializer

from sklearn.cluster import KMeans
from sklearn.externals import joblib

import json
import numpy

# bill Viewset
class billViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = billSerializer
    queryset = bill.objects.all()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.integer):
            return int(obj)
        elif isinstance(obj, numpy.floating):
            return float(obj)
        elif isinstance(obj, numpy.ndarray):
            return obj.tolist()
        else:
            return super(MyEncoder, self).default(obj)

class billTrain(APIView):
    """
    train bill cluster model
    """
    def get(self, request, format=None):
        print("--------------- billTrain get --------")
        snippets = bill.objects.all()
        serializer = billSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print("--------------- billTrain post --------")
        print(request.data)

        n_clusters = request.data["cluster_number"]
        n_clusters = int(n_clusters)

        print("n_cluster=%d" % n_clusters)

        model = KMeans(n_clusters=n_clusters)

        billObjects = bill.objects.all()

        billDataTrain = [[onebill.expenditure, onebill.salary, 1000*(onebill.pay_month), 1000*(onebill.due_month)] for onebill in billObjects]

        # test data
        print("delgation data print")
        print(billDataTrain[0])

        model.fit(billDataTrain)

        # save model for prediction
        joblib.dump(model, 'model.kmeans')

        # test saved prediction
        model = joblib.load('model.kmeans')

        # cluster result
        labels = model.predict(billDataTrain)

        print("cluster result")
        print(labels)

        print("========================")

        # transfer data to client
        billDataDict =  [
            {"expenditure": onebill.expenditure, "salary": onebill.salary, "pay_month": onebill.pay_month, "due_month": onebill.due_month}
            for onebill in billObjects
        ]

        print(billDataDict[0])
        print(len(billDataDict))

        for i in range(0, len(billDataDict)):
            billDataDict[i]["cluster"] = labels[i]

        print(billDataDict[0])

        respData = json.dumps(billDataDict, cls=MyEncoder)

        #respData = "ok"

        return Response(respData, status=status.HTTP_201_CREATED)


class billPredict(APIView):
    """
    predict bill cluster
    """
    def post(self, request, format=None):
        print("--------------- billPredict post --------")
        print(request.data)

        expenditure = request.data["expenditure"]
        salary = request.data["salary"]
        pay_month = request.data["pay_month"]
        due_month = request.data["due_month"]

        print("expenditure=%s" % expenditure)


        billDataTrain = [[expenditure, salary, pay_month, due_month]]

        # test data
        print("delgation data print")
        print(billDataTrain[0])

        # test saved prediction
        model = joblib.load('model.kmeans')

        # cluster result
        labels = model.predict(billDataTrain)

        print("cluster result")
        print(labels)

        print("========================")

        # transfer data to client
        billDataPredict = {
            "predicted_cluster": labels[0]
        }

        print(billDataPredict["predicted_cluster"])

        respData = json.dumps(billDataPredict, cls=MyEncoder)

        return Response(respData, status=status.HTTP_201_CREATED)





