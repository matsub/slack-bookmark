function makeMessage (text) {
  return {
    response_type: 'in_channel',
    text
  }
}

exports.slackBookmark = (req, res) => {
  const response = makeMessage("Hello, Slack!")
  res.send(JSON.stringify(response));
};
