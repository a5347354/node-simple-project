// http://10.231.213.212:8080/site/line
async function resqu() {
  const https = require('http')
  const options = {
    hostname: '10.231.213.212',
    port: 8080,
    path: '/site/line',
    method: 'GET'
  }

  const req = await https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    var body = '';

    res.on('data', d => {
      process.stdout.write(d)
      body += d;
      console.log(d)
      // return d;
    })
  })

  req.on('end', fbResponse=>{
    var fbResponse = JSON.parse(body);
    // return fbResponse;
  })

  req.on('error', error => {
    console.error(error);
  })

  req.end();
}

module.exports = resqu;
