import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import crypto from 'crypto'

const URL_EXPIRATION = 20 // 5 minutes

const randFileName = (bytes: number = 32) => crypto.randomBytes(bytes).toString('hex');
const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS as string,
        secretAccessKey: process.env.AWS_SECRET as string,
    }
})

export async function POST(req: NextRequest) {
    const session = getServerSession()
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { fileName, fileType, fileSize } = await req.json()
    if (!fileName || !fileType || !fileSize) return new Response('Invalid request', { status: 400 })

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const randName = randFileName();
    const putCommand = new PutObjectCommand({
        Key: 'imgs/' + randName,
        ContentType: fileType,
        Bucket: process.env.AWS_BUCKET,
    })
    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: URL_EXPIRATION })
    const getUrl = 'https://ddfqppfg2enl5.cloudfront.net/imgs/' + randName;

    return Response.json({ putUrl, getUrl }, { status: 200 })
}