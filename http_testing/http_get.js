async function resuq(){
const http = require('http')
  await http.get('http://10.231.213.212:8080/site/line', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}
module.exports = resuq;






// // http://10.231.213.212:8080/site/line
// async function resqu() {
//   const https = require('http')
//   const options = {
//     hostname: '10.231.213.212',
//     port: 8080,
//     path: '/site/line',
//     method: 'GET'
//   }
//
//   const req = await https.request(options, res => {
//     console.log(`statusCode: ${res.statusCode}`)
//     var body = '';
//
//     res.on('data', d => {
//       process.stdout.write(d)
//       body += d;
//       console.log(d)
//       // return d;
//     })
//   })
//
//   req.on('end', fbResponse=>{
//   fbResponse = JSON.parse(body);
//
//   })
//
//   req.on('error', error => {
//     console.error(error);
//   })
//
//   req.end();
//   return fbResponse;
// }
//
// exports.resqu = resqu;
