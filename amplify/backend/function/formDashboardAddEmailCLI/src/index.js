exports.handler = function(event, context) {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));

  body_json = json.loads(event['body'])
  some_var = body_json['somevar']
  other_var = body_json['othervar']

  console.log(some_var);
  console.log(other_var);
  return 'hello from lambda function';
  // event.Records.forEach(record => {
  //   console.log(record.eventID);
  //   console.log(record.eventName);
  //   console.log('DynamoDB Record: %j', record.dynamodb);
  // });
  // context.done(null, 'Successfully processed DynamoDB record'); // SUCCESS with message
};
