import json
import shared

def lambda_handler(event, context):
    sum = shared.add_numbers(3, 5)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello, World! ' + str(sum))
    }