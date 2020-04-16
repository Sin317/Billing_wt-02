from django.db import models

class bill(models.Model):
    expenditure = models.FloatField()
    salary = models.FloatField()
    pay_month = models.IntegerField()
    due_month = models.IntegerField()
    category = models.CharField(max_length=500, blank=True)

    def __unicode__(self):
        return self.category
