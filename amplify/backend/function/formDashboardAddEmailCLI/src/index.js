exports.handler = function(event, context) {
  //eslint-disable-line
  console.log(JSON.stringify(event));

  // const body_json = JSON.loads(event['body'])
  // const some_var = body_json['somevar']
  // const other_var = body_json['othervar']

  // console.log(some_var);
  // console.log(other_var);
  return 'hello from lambda function';
  // event.Records.forEach(record => {
  //   console.log(record.eventID);
  //   console.log(record.eventName);
  //   console.log('DynamoDB Record: %j', record.dynamodb);
  // });
  // context.done(null, 'Successfully processed DynamoDB record'); // SUCCESS with message
};
