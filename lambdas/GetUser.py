import json
import boto3
import requests

def lambda_handler(event, context):
    print(event)
    doc=event['body-json']
    accesstoken=doc['token']
    client = boto3.client('cognito-idp', region_name='us-west-2')
    response = client.get_user(
    AccessToken=accesstoken
    )
    print(response)
    name = response['Username']
    print(name)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
