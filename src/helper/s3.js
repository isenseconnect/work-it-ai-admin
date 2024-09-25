const AWS = require("aws-sdk");
const { apiCall } = require("./helper");

AWS.config.update({
  accessKeyId: config.S3.ACCESS_KEY_ID,
  secretAccessKey: config.S3.SECRET_ACCESS_KEY,
  region: config.S3.region,
});

const s3 = new AWS.S3();

export const uploadToS3 = async (data) => {
  try {
    const uploadParams = {
      Bucket: config.S3.BUCKET_NAME,
      Key: `homepage/${file}`,
      Body: fileContent,
      acl: "public-read", // TODO Need to block from AWS panel instead.
    };
    const s3Result = await s3.upload(uploadParams).promise();
  } catch (err) {
    throw err;
  }
};
