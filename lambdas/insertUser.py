import json
from elasticsearch import Elasticsearch

esurl="https://search-fantastock0-23vzis4fs4cnwijmzo5e46qpza.us-west-2.es.amazonaws.com"
es = Elasticsearch([esurl], http_auth=('admin', 'Admin@123'))

uid="bpvarma"
doc={
          "name" : "Pavan Varma",
          "userid" : uid,
          "dateofjoin" : "2021-11-10",
          "coins" : 100,
          "competitions" : {}
    }
def lambda_handler(event, context):
    res = es.index(index="user", id=uid, body=doc)
    return {
        'statusCode': 200,
        'msg': json.dumps(res)
    }
