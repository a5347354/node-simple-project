const fs = require('fs') // from node.js
const path = require('path') // from node.js

module.exports = {
    deleteObject: function (client, deleteParams) {
        client.deleteObject(deleteParams, function (err, data) {
            if (err) {
                console.log("delete err " + deleteParams.Key);
            } else {
                console.log("deleted " + deleteParams.Key);
            }
        });
    },
    listBuckets: function (client) {
        client.listBuckets({}, function (err, data) {
            var buckets = data.Buckets;
            var owners = data.Owner;
            for (var i = 0; i < buckets.length; i += 1) {
                var bucket = buckets[i];
                console.log(bucket.Name + " created on " + bucket.CreationDate);
            }
            for (var i = 0; i < owners.length; i += 1) {
                console.log(owners[i].ID + " " + owners[i].DisplayName);
            }
        });

    },
    deleteBucket: function (client, bucket) {
        client.deleteBucket({Bucket: bucket}, function (err, data) {
            if (err) {
                console.log("error deleting bucket " + err);
            } else {
                console.log("delete the bucket " + data);
            }
        });
    },
    clearBucket: function (client, bucket) {
        var self = this;
        client.listObjects({Bucket: bucket}, function (err, data) {
            if (err) {
                console.log("error listing bucket objects "+err);
                return;
            }
            var items = data.Contents;
            for (var i = 0; i < items.length; i += 1) {
                var deleteParams = {Bucket: bucket, Key: items[i].Key};
                self.deleteObject(client, deleteParams);
            }
        });
    },
    uploadAllWebsiteFolder: function (client, distFolderPath, fileConfig) {
        let folderName = '' 
        fs.readdir(distFolderPath, (err, files) => {
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
              if (extn === 'html') contentType = "text/html";
              if (extn === 'css') contentType = "text/css";
              if (extn === 'js') contentType = "application/javascript";
              if (extn === 'png' || extn === 'jpg' || extn === 'gif') contentType = "image/" + extn;

              // upload file to S3
              client.putObject({
                Bucket: fileConfig.s3BucketName,
                Key:  folderPath,
                Body: fileContent,
                ContentType: contentType,
                ACL:'public-read'
              }, (res) => {
                if (res !== null) {
                  console.log(`Response: '${res}'!`)
                }
                console.log(`Successfully uploaded: '${fileName}'!`)
              })
            })
          }
        })
      }
      
};