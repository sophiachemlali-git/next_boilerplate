import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

// Sample data for articles
const ARTICLES = [
  { id: 1, title: 'Article 1', content: 'Content of Article 1' },
  { id: 2, title: 'Article 2', content: 'Content of Article 2' },
  { id: 3, title: 'Article 3', content: 'Content of Article 3' },
]

// Define the structure of an article
interface Article {
  id: number
  title: string
  content: string
}

// Define the props for the ArticlesPage component
interface ArticlePageProps {
  article: Article
}

// React functional component to display individual articles
const ArticlesPage: React.FC<ArticlePageProps> = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  )
}

export default ArticlesPage

// Define the function to generate static paths at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Replace this with a real API call to fetch articles dynamically
  const articles = ARTICLES

  // Map articles to create an array of paths
  const paths = articles.map((article: Article) => ({
    params: { id: article.id.toString() },
  }))

  // Return paths and set fallback to false (nonexistent paths return 404)
  return {
    paths,
    fallback: false,
  }
}

// Define the function to fetch data for a specific article at build time
export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}: GetStaticPropsContext) => {
  // Replace this with a real API call to fetch articles dynamically
  const articles = ARTICLES

  // Find the article with the given ID
  // This can be modified by directly fetching the article props (By ID)
  const article = articles.find((a: Article) => a.id.toString() === params?.id)

  // If the article is not found, return a 404 page
  if (!article) {
    return {
      notFound: true,
    }
  }

  // Return the article as props to be used by the component
  return {
    props: {
      article,
    },
  }
}
