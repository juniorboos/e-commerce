import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { getAllProducts, getBestSeller, getCategories } from './api/api'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Best Selling Products
  // const { products: bestSellingProducts } = await getAllProducts({
  //   variables: { field: 'bestSellingProducts', first: 6 },
  //   config,
  //   preview,
  // })

  // Get Best Newest Products
  const bestSelling = await getBestSeller()
  const allProducts = await getAllProducts()
  const categories = await getCategories()

  const { brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      bestSelling,
      allProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 10 * 60 * 1000,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  bestSelling,
  allProducts,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Grid>
        {allProducts.slice(0, 3).map((product: any, i: number) => (
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
        {bestSelling.map((product: any) => (
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
        {allProducts.slice(3, 6).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgWidth={i === 1 ? 1080 : 540}
            imgHeight={i === 1 ? 1080 : 540}
          />
        ))}
      </Grid>
      <Marquee>
        {allProducts.slice(6, 9).map((product: any) => (
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
