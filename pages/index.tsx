import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getAllProducts, getBestSeller, getCategories } from './api/api'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const bestSelling = await getBestSeller()
  const allProducts = await getAllProducts()
  const categories = await getCategories()

  return {
    props: {
      bestSelling,
      allProducts,
      categories,
    },
    revalidate: 10 * 60 * 1000,
  }
}

export default function Home({
  bestSelling,
  allProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Grid>
        {bestSelling.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgWidth={i === 0 ? 1080 : 540}
            imgHeight={i === 0 ? 1080 : 540}
            imgPriority
            imgLoading="eager"
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {allProducts.slice(0, 5).map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee>
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      />
      <Grid layout="B">
        {bestSelling.slice(3, 6).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgWidth={i === 1 ? 1080 : 540}
            imgHeight={i === 1 ? 1080 : 540}
          />
        ))}
      </Grid>
      <Marquee>
        {allProducts.slice(5, 10).map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        categories={categories}
        newestProducts={allProducts}
      /> */}
    </div>
  )
}

Home.Layout = Layout
