import { FC } from 'react'
import Link from 'next/link'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'

interface Props {
  categories?: any
  newestProducts?: any
}

const Head: FC<Props> = ({ categories, newestProducts }) => {
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Categories</a>
              </Link>
            </li>
            {categories.map((cat: any, idx: number) => (
              <li key={idx} className="py-1 text-accents-8 text-base">
                <Link href={cat.name}>
                  <a>
                    {cat.name} ({cat.total})
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {newestProducts.slice(0, 25).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="simple"
              imgWidth={480}
              imgHeight={480}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Head
