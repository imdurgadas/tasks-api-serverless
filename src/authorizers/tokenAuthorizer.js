exports.handler = (event, context, callback) => {
    const token = event.headers.authorization;

    console.log(`Token Received: ${token} , Event Route ARN: ${event.routeArn}`)

    if (token === 'user-allow'){
        callback(null, generatePolicy('user-allow', 'Allow', event.routeArn)) 
    }else if (token === 'user-deny'){
        callback(null, generatePolicy('user-deny', 'Deny', event.routeArn)) 
    }else{
        callback("No authentication header found, rejecting the request....")
    }
}

const generatePolicy = (principalId , effect, resource ) => {
    const response = {}
    response.principalId = principalId;

    if (effect && resource) {
        const policyDocument = {
            Version: "2012-10-17",
            Statement : [
                {
                    Effect: effect,
                    Action: 'execute-api:Invoke',
                    Resource: resource
                }
            ]
        }
        response.policyDocument = policyDocument;
    }
    
    //if we want additional metadata information to be available
    response.context = {
        'powered-by': 'tech with durgadas'
    }

    console.log(JSON.stringify(response));

    return response;
}