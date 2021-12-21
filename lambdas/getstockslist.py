
import pymongo


def lambda_handler(event, context):
    
    # competition=event["params"]["path"]["competition"]
    
    # host="search-fantastock0-23vzis4fs4cnwijmzo5e46qpza.us-west-2.es.amazonaws.com"
    # awsauth = AWSRequestsAuth(aws_access_key='AKIAWEJK7I4J2XW4AGFS',
    #                   aws_secret_access_key='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',
    #                   aws_host=host,
    #                   aws_region='us-west-2',
    #                   aws_service='es')
    
    # esClient = Elasticsearch(
    #     hosts=[{'host': host, 'port':443}],
    #     use_ssl=True,
    #     http_auth=awsauth,
    #     verify_certs=True,
    #     connection_class=RequestsHttpConnection)
    
    # searchData = esClient.search({"query": {"match": {"competition": competition}}})

    # for competition in searchData['hits']['hits']:
    #     competitions.append(competition['_source'])

    
    # if not competitions:
    #     return{
    #         'statusCode':200,
    #         "headers": {"Access-Control-Allow-Origin":"*"},
    #         'body': json.dumps('No Competitions found')
    #     }
    # else:    
    #     return{
    #         'statusCode': 200,
    #         'headers': {"Access-Control-Allow-Origin":"*"},
    #         'body': competitions,
    #         'isBase64Encoded': False
    #     }
        
        
    competition=event['body-json']['competition']
    
    client = pymongo.MongoClient("mongodb+srv://admin:admin123@fantastock.h4npu.mongodb.net/fanta_stock?retryWrites=true&w=majority")
    db = client.fanta_stock
    collection=db.stockdata
    stockslist=collection.distinct('name')
    
    print(type(stockslist))
    
    if not stockslist:
        return{
            'statusCode':200,
            "headers": {"Access-Control-Allow-Origin":"*"},
            'body': json.dumps('No Companies found')
        }
    else:    
        return{
            'statusCode': 200,
            'headers': {"Access-Control-Allow-Origin":"*"},
            'body':stockslist,
            'isBase64Encoded': False
        }
