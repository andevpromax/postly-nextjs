import { formatDate } from '@/lib/format'
import { PostProps, PostsProps } from '@/types/post'
import FormLike from './form-like'

function Post({ post }: PostProps) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      {/* Images to test S3 bucket */}
      {/* <div className="post-image">
        <h3>Cloudinary</h3>
        <img src={post.image} alt="Cloudinary" />

        <h3>Amazon S3</h3>
        {post.imageS3 && <img src={post.imageS3} alt="Amazon S3" />}
      </div> */}
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            </p>
          </div>
          <div>
            <FormLike postId={post.id} isLiked={post.isLiked} likes={post.likes} />
            {/* optimistic update global */}
            {/* <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form> */}
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  )
}

export default function Posts({ posts }: PostsProps) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>
  }

  console.log('posts', posts)

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  )
}

//! optimistic update global

// export default function Posts({ posts }: PostsProps) {
//   const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
//     posts,
//     (currentPosts, updatedPostId) => {
//       const updatedPostIndex = currentPosts.findIndex((post) => post.id === updatedPostId)

//       if (updatedPostIndex === -1) {
//         return currentPosts
//       }

//       const updatedPost = { ...currentPosts[updatedPostIndex] }
//       updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1)
//       updatedPost.isLiked = !updatedPost.isLiked

//       const newPosts = [...currentPosts]
//       newPosts[updatedPostIndex] = updatedPost

//       return newPosts
//     },
//   )

//   if (!optimisticPosts || optimisticPosts.length === 0) {
//     return <p>There are no posts yet. Maybe start sharing some?</p>
//   }

//   async function updatePost(postId: number) {
//     updateOptimisticPosts(postId)
//     await togglePostLikeStatus(postId)
//   }

//   return (
//     <ul className="posts">
//       {optimisticPosts.map((post) => (
//         <li key={post.id}>
//           <Post post={post} action={updatePost} />
//         </li>
//       ))}
//     </ul>
//   )
// }
