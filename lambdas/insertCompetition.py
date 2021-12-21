import json
from elasticsearch import Elasticsearch

esurl="https://search-fantastock0-23vzis4fs4cnwijmzo5e46qpza.us-west-2.es.amazonaws.com"
es = Elasticsearch([esurl], http_auth=('admin', 'Admin@123'))

comid="Competition_3"
doc={
  'status': 'Live',
  'category': 'Mega',
  'type': 'Weekly',
  'Competitionid': "random name",
  'attributes': {
    'startdate': '2021-12-10', #yyy-mm-dd
    'enddate': '2021-12-17',
    'poolsize': '10',
    'winners': '150',
    'totalamount': '5000',
    'entryfee': '5',
    'changes':'0'
  },
  'distribution': {
    '1': 500,
    '2': 300,
    '3-40': 55,
    '41-150': 10,
  },
  'rankings': {}
  
}

def lambda_handler(event, context):
    res = es.index(index="competitions", id=comid, body=doc)
    return {
        'statusCode': 200,
        'msg': json.dumps(res)
    }
