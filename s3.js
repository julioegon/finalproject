const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
}); // creates an instance of an AWS user --> it is basically an object that has methods that allow us to communicate with our s3 bucket

exports.upload = (req, res, next) => {
    if (!req.file) {
        //if there is no req.fil something went wrong with multer
        console.log("no file to upload");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "image-board-pimento",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("Yay our img made it to the cloud =)");
            next(); // we want to make sure to exit the middleware after successfully uploading the img to the cloud
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            // uh oh
            console.log("Something went wrong uploading to the cloud =(");
            console.log(err);
        });
};
