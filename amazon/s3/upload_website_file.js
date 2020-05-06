const fs = require('fs') // from node.js
const path = require('path') // from node.js
const AWS = require('aws-sdk')

const config = {
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  endpoint: 'ENDPOINT',
  sslEnabled: true,
  s3ForcePathStyle: true
}
AWS.config.update(config)

const s3Client = new AWS.S3({ signatureVersion: 'v2' })

// configuration
const fileConfig = {
  s3BucketName: 'website',
  folderPath: './test_data' // path relative script's location
}

// resolve full folder path
const distFolderPath = path.join(__dirname, fileConfig.folderPath)

fileUpload(distFolderPath, '')
// get of list of files from 'dist' directory
function fileUpload (distFolderPath, folderName) {
  fs.readdir(distFolderPath, (err, files) => {
    // if (err) { throw err }
    if (!files || files.length === 0) {
      console.log(`provided folder '${distFolderPath}' is empty or does not exist.`)
      console.log('Make sure your project was compiled!')
      return
    }

    // for each file in the directory
    for (const fileName of files) {
    // get the full path of the file
      const filePath = path.join(distFolderPath, fileName)
      
      // ignore if directory
      if (fs.lstatSync(filePath).isDirectory()) {
        let folderPath
        if(folderName === ''){
          folderPath = fileName
        }else{
          folderPath = folderName + '/' + fileName
        }
        fileUpload(filePath, folderPath)
        continue
      }

      // read file contents
      fs.readFile(filePath, (error, fileContent) => {
      // if unable to read file contents, throw exception
        if (error) { throw error }
        let folderPath
        if(folderName === ''){
          folderPath = fileName
        }else{
          folderPath = folderName + '/' + fileName
        }

        let extn = folderPath.split('.').pop();
        let contentType = 'application/octet-stream';
        if (extn == 'html') contentType = "text/html";
        if (extn == 'css') contentType = "text/css";
        if (extn == 'js') contentType = "application/javascript";
        if (extn == 'png' || extn == 'jpg' || extn == 'gif') contentType = "image/" + extn;
        console.log(folderPath)
        // upload file to S3
        s3Client.putObject({
          Bucket: fileConfig.s3BucketName,
          Key:  folderPath,
          Body: fileContent,
          ContentType: contentType,
          ACL:'public-read'
        }, (res) => {
          if (res !== null) {
            console.log(`Response: '${res}'!`)
          }
          console.log(`Successfully uploaded '${fileName}'!`)
        })
      })
    }
  })
}
