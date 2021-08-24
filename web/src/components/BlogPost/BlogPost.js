import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <article className="container mx-auto p-4 bg-gray-100 m-4 rounded-xl">
      <header>
        <h2 className="font-semibold p-2">
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
        <p className="p-2">{post.body}</p>
        <div className="text-purple-700 text-opacity-75 p-2">
          Posted at: {post.createdAt}
        </div>
      </header>
    </article>
  )
}

export default BlogPost
