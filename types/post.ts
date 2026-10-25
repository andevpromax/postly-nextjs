export type Post = {
  id: number
  title: string
  image: string
  imageS3: string
  userFirstName: string
  content: string
  createdAt: string
  isLiked: boolean
  likes: number
}

export type CreatePost = {
  imageUrl: string
  s3Key: string
  title: string
  content: string
  userId: number
}

export type PostProps = {
  post: Post
  action: (postId: number) => Promise<void>
}

export type PostsProps = {
  posts: Post[]
}
