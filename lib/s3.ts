import 'server-only'

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
})

export async function uploadToS3(image: File): Promise<string> {
  const imageData = await image.arrayBuffer()

  const buffer = Buffer.from(imageData)

  const extension = image.type === 'image/png' ? 'png' : 'jpg'
  const fileName = `postly/${randomUUID()}.${extension}`

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: image.type,
    }),
  )

  return fileName
}

export async function getS3ImageUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  })

  const url = await getSignedUrl(s3, command, {
    expiresIn: 60,
  })

  return url
}
