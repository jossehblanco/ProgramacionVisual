from rest_framework import serializers


class ParamsSerializer(serializers.Serializer):
    MAXLINEA = serializers.CharField()
    MAXDIGIT = serializers.CharField()
    MAXID = serializers.CharField()
    def create(self, validated_data):
        return Params.objects.create(**validated_data)