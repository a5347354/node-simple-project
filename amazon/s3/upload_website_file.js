const path = require('path') // from node.js
const AWS = require('aws-sdk')
const s3 = require("./module.js");

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

// s3.deleteObject(s3Client, fileConfig.s3BucketName)
s3.uploadAllWebsiteFolder(s3Client, distFolderPath, fileConfig)
