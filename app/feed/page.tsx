// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Posts from '@/components/posts'
import { getPosts } from '@/lib/posts'

export default async function FeedPage() {
  const posts = await getPosts()
  console.log('POST', posts)
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  )
}
