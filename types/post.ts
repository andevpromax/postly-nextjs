export type Post = {
  id: number
  title: string
  image: string
  userFirstName: string
  content: string
  createdAt: string
}

export type CreatePost = {
  imageUrl: string
  title: string
  content: string
  userId: number
}

export type PostProps = {
  post: Post
}

export type PostsProps = {
  posts: Post[]
}
