from elasticsearch import Elasticsearch
import json

esurl="https://search-fantastock0-23vzis4fs4cnwijmzo5e46qpza.us-west-2.es.amazonaws.com"
es = Elasticsearch([esurl], http_auth=('admin', 'Admin@123'))

""" doc={
      "uid": "adasari",
      "cid": "Competition_1",
      "stocks": ["WBA","IBM","FB","GS","CAT","test"],
    }
"""

def lambda_handler(event, context):
    doc=event['body-json']
    comid=doc["companies"]
    # uid=doc["uid"]
    uid="ABCDEFG"
    return([uid, comid])
    # res={}
    # if(es.exists(index="competitions", id=doc["cid"]) and es.exists(index="competitions", id=doc["cid"])):
    #     body={
    #         "script": {
    #         "lang": "painless",
    #         "source": """
    #             Map temp=[:];
    #             temp['score']=0;
    #             temp['rank']=0;
    #             temp['stocks']=params.stocks;
    #             temp['changes']=0;
    #             ctx._source.rankings[params.uid]=temp;
    #         """,
    #         "params": doc
    #         }
    #     }
    #     res['user']= es.update(index="competitions", id=doc["cid"], body=body)
    
    #     body={
    #         "script": {
    #         "lang": "painless",
    #         "source": """
    #             Map temp=[:];
    #             temp['score']=0;
    #             temp['rank']=0;
    #             temp['stocks']=params.stocks;
    #             temp['changes']=0;
    #         ctx._source.competitions[params.cid]=temp;
    #         """,
    #         "params": doc
    #         }
    #     }
    #     res['comp'] = es.update(index="user", id=doc["uid"], body=body)
    
    # else:
    #     res['error']="Competition or User dosen't exists"
    
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(res)
    # }
