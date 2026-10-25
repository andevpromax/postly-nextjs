import { Suspense } from 'react'
import { connection } from 'next/server'
import { getS3ImageUrl } from '@/lib/s3'

async function S3Image() {
  await connection()

  const imageUrl = await getS3ImageUrl('postly/24ea8dcd-62af-441c-ac26-53e8acfdc272')

  return <img src={imageUrl} alt="S3 test image" />
}

export default function S3TestPage() {
  return (
    <div>
      <h1>My private S3 image</h1>

      <Suspense fallback={<p>Loading image...</p>}>
        <S3Image />
      </Suspense>
    </div>
  )
}
