from rest_framework import serializers

from bills.models import Bill


class BillSerializer(serializers.ModelSerializer):
    seller_name = serializers.ReadOnlyField()
    ordered_by_name = serializers.ReadOnlyField()
    project_name = serializers.ReadOnlyField()

    class Meta:
        model = Bill
        fields = '__all__'
