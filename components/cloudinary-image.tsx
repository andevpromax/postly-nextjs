'use client'

import Image, { type ImageLoaderProps } from 'next/image'

function imageLoader(config: ImageLoaderProps) {
  const startUrl = config.src.split('upload/')[0]
  const endUrl = config.src.split('upload/')[1]
  const transformations = `w_${config.width},q_${config.quality ?? 75}`

  return `${startUrl}upload/${transformations}/${endUrl}`
}

type CloudinaryImageProps = {
  src: string
  alt: string
}

export default function CloudinaryImage({ src, alt }: CloudinaryImageProps) {
  return <Image loader={imageLoader} src={src} width={200} height={120} alt={alt} quality={50} />
}
