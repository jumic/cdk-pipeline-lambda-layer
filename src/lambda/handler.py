import json

def lambda_handler(event, context):
    if event.get("error"):
        raise ValueError("An error occurred as requested.")
    
    return {
        "statusCode": 200,
        "body": json.dumps("Hello, World! 2")
    }
