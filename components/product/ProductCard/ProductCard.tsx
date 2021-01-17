import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import s from './ProductCard.module.css'

interface Product {
  id: number
  image: Array<string>
  price: string
  about: Array<string>
  name: string
  specification: any
  category: Array<string>
  brand: any
  url: string
  relation: number
}

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
  relation?: boolean
}

const ProductCard: FC<Props> = ({
  className,
  product,
  variant,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  relation,
  imgLayout = 'responsive',
}) => {
  return (
    <Link href={`/product/${product.id}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="truncate bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {product.name}
              </span>
            </div>
            <Image
              quality="85"
              width={imgWidth}
              sizes={imgSizes}
              height={imgHeight}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
              src={product.image[0]}
              className={s.productImage}
              alt={'Product Image'}
            />
          </div>
        ) : (
          <>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{product.name}</span>
                </h3>
                <span className={s.productPrice}>
                  {product.price} {relation && '(' + product.relation + ')'}
                </span>
              </div>
              {/* <WishlistButton className={s.wishlistButton} /> */}
            </div>
            <div className={s.imageContainer}>
              <Image
                quality="85"
                src={product.image[0]}
                alt={product.name}
                className={s.productImage}
                width={imgWidth}
                sizes={imgSizes}
                height={imgHeight}
                // layout={imgLayout}
                loading={imgLoading}
                priority={imgPriority}
              />
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
