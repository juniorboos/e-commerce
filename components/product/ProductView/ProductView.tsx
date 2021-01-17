import { FC, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import s from './ProductView.module.css'
import { useUI } from '@components/ui/context'
import { ProductSlider } from '@components/product'
import { Button, Container, Text } from '@components/ui'

import WishlistButton from '@components/wishlist/WishlistButton'

import RecomendedProductsGrid from '../../common/RecomendedProductsGrid'

interface Props {
  className?: string
  children?: any
  product: any
  related: any
}

const ProductView: FC<Props> = ({ product, related }) => {
  const { openSidebar, addCartItem } = useUI()
  const [loading, setLoading] = useState(false)

  const addToCart = () => {
    setLoading(true)
    addCartItem(product)
    openSidebar()
    setLoading(false)
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.image[0],
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          {/* <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>{product.price}</div>
          </div> */}

          <div className={s.sliderContainer}>
            <ProductSlider key={product.entityId}>
              {product.image.map((image: string, i: number) => (
                <div key={i} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image}
                    alt={'Product Image'}
                    width={1050}
                    height={1050}
                    priority={i === 0}
                    quality="85"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            <div className="pb-4">
              <div className={s.nameBox}>
                <h1 className={s.name}>{product.name}</h1>
                <div className={s.price}>{product.price}</div>
              </div>
              <div className="pb-14 break-words w-full max-w-xl">
                {product.about[0] !== 'nan' &&
                  product.about.map((item: string, idx: number) => (
                    <Text key={idx} html={item} />
                  ))}
              </div>

              {product.specification[0] !== 'nan' && (
                <h2 className="uppercase font-medium">Specification</h2>
              )}
              {product.specification[0] !== 'nan' &&
                product.specification.map((spec: string, idx: number) => (
                  <div key={idx} className="flex flex-row py-1">
                    {spec}
                  </div>
                ))}
            </div>
          </section>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              loading={loading}
              // disabled={!variant}
              onClick={() => addToCart()}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        <WishlistButton className={s.wishlistButton} />
      </div>
      {related.length > 0 && <RecomendedProductsGrid products={related} />}
    </Container>
  )
}

export default ProductView
