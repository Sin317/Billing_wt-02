from django.contrib import admin

from .models import bill

class billAdmin(admin.ModelAdmin):
    list_display = ('category', 'due_month')

# Register your models here.
admin.site.register(bill, billAdmin)