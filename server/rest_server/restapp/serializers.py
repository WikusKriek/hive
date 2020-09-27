from rest_framework import serializers

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

class postDataSerializer(serializers.Serializer):
    studentNumber = serializers.CharField()
    password = serializers.CharField(max_length=200)
    
class postDataUrlSerializer(serializers.Serializer):
    studentNumber = serializers.CharField()
    password = serializers.CharField(max_length=200)
    url = serializers.CharField()