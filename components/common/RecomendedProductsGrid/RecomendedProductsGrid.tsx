import { FC } from 'react'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './RecomendedProductsGrid.module.css'

interface Props {
  products: any
}

const Head: FC<Props> = ({ products }) => {
  return (
    <div className={s.root}>
      <div className="flex-1">
        <Grid layout="D">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="simple"
              imgWidth={240}
              imgHeight={240}
              relation={true}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Head
