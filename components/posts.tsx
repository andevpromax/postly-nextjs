import { formatDate } from '@/lib/format'
import LikeButton from './like-icon'
import { PostProps, PostsProps } from '@/types/post'
import { togglePostLikeStatus } from '@/actions/posts'

function Post({ post }: PostProps) {
  return (
    <article className="post">
      {/* <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div> */}
      <div className="post-image">
        <h3>Cloudinary</h3>
        <img src={post.image} alt="Cloudinary" />

        <h3>Amazon S3</h3>
        {post.imageS3 && <img src={post.imageS3} alt="Amazon S3" />}
      </div>
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
            <form
              action={togglePostLikeStatus.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
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
