import { S3 } from 'aws-sdk';
import mime from 'mime';

export default class FileSystem {
    constructor(){}

    static async upload(file: { name: string, buffer: Buffer }){
        
        const s3 = new S3({
            credentials: {
                accessKeyId: String(process.env.AWS_KEY), 
                secretAccessKey: String(process.env.AWS_SECRET)
            },
            region: process.env.BUCKET_REGION
        })
        const params = {
            Bucket: String(process.env.BUCKET_NAME),
            Key: file.name,
            Body: file.buffer,
            ContentType: mime.lookup(file.name) || 'application/octet-stream'
        };

        await s3.upload(params).promise();
    }

    static async download(fileName: string){
        const s3 = new S3({
            credentials: {
                accessKeyId: String(process.env.AWS_KEY), 
                secretAccessKey: String(process.env.AWS_SECRET)
            },
            region: process.env.BUCKET_REGION
        });
        
        const params = {
            Bucket: String(process.env.BUCKET_NAME),
            Key: fileName,
        };
        const file = await s3.getObject(params).promise();
        return file;
    }
}