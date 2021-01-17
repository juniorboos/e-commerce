import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

// Data
import {
  getAllProducts,
  getProductById,
  getRelatedProducts,
} from 'pages/api/api'

export async function getStaticProps({ params }: any) {
  const product = await getProductById(params.slug)
  const related = await getRelatedProducts(params.slug)

  return {
    props: { product: product, related: related },
  }
}

export async function getStaticPaths() {
  const products = await getAllProducts()
  return {
    paths: products.map((product: any) => {
      return { params: { slug: product.id.toString() } }
    }),
    fallback: true,
  }
}

export default function Slug({
  product,
  related,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <ProductView product={product} related={related} />
  )
}

Slug.Layout = Layout
