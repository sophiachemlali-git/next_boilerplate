import { GetServerSideProps, NextPage } from 'next'

// Simulate a fake API service that returns a promise for fetching blog post data
const fetchBlogPostData = async (postId: number): Promise<BlogPost> => {
  // Simulate some delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate fetching data
  const blogPosts: BlogPost[] = [
    { id: 1, title: 'First Blog Post', content: 'Content of the first blog post' },
    { id: 2, title: 'Second Blog Post', content: 'Content of the second blog post' },
    { id: 3, title: 'Third Blog Post', content: 'Content of the third blog post' },
  ]

  // Find the blog post with the given ID
  const foundPost = blogPosts.find(post => post.id === postId)

  // Throw an error if the blog post is not found
  if (!foundPost) {
    throw new Error('Blog post not found')
  }

  // Return the blog post
  return foundPost
}

// ------------------------------------------------------------------

// Define the props for the BlogPostPage component
interface BlogPostPageProps {
  blogPost: BlogPost
}

// Define the structure of a blog post
interface BlogPost {
  id: number
  title: string
  content: string
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ blogPost }) => {
  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </div>
  )
}

export default BlogPostPage

// Define the function to fetch data for a specific blog post at runtime
export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async ({ params }) => {
  // Fetch blog post from the fake API based on the ID in params
  const postId = Number(params?.id)
  try {
    // Simulate fetching blog post data from the fake API
    const blogPost = await fetchBlogPostData(postId)

    // Return the blog post as props to be used by the component
    return {
      props: {
        blogPost,
      },
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    // If there's an error fetching the blog post, return a 404 page
    return {
      notFound: true,
    }
  }
}
