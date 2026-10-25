'use client'

import LikeButton from './like-icon'
import { useOptimistic } from 'react'
import { togglePostLikeStatus } from '@/actions/posts'

type FormLikeProps = {
  postId: number
  isLiked: boolean
  likes: number
}
export default function FormLike({ postId, isLiked, likes }: FormLikeProps) {
  const [optimisticPost, updateOptimisticPost] = useOptimistic(
    { isLiked, likes },
    (currentPost, _action: void) => ({
      isLiked: !currentPost.isLiked,
      likes: currentPost.likes + (currentPost.isLiked ? -1 : 1),
    }),
  )

  async function updatePost() {
    updateOptimisticPost()
    await togglePostLikeStatus(postId)
  }

  return (
    <form action={updatePost} className={optimisticPost.isLiked ? 'liked' : ''}>
      <LikeButton />
    </form>
  )
}
