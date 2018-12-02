const Datastore = require('@google-cloud/datastore')
const datastore = Datastore()


function register(url) {
  if (url === '') {
    return 'Usage: `/bookmark <something-to-bookmark>`'
  }

  const key = datastore.key('bookmark')
  const entity = { key, data: { url } }

  return datastore.save(entity)
    .then(() => '覚えた')
    .catch(err => {
      console.error(err)
      return '覚えらんねえ'
    })
}


function pick() {
  const query = datastore.createQuery('bookmark')

  return datastore.runQuery(query)
    .then(([[entity]]) => 'これ読め: ' + entity.url)
    .catch(err => {
      console.error(err)
      return 'ちょっと今忙しいわ'
    })
}


function makeMessage (text) {
  return {
    response_type: 'in_channel',
    text
  }
}


exports.slackBookmark = async (req, res) => {
  const text = await register(req.body.text)
  const msg = makeMessage(text)

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(msg))
}


exports.slackBookmarkPickRandomly = async (req, res) => {
  const text = await pick()
  const msg = makeMessage(text)

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(msg))
}
