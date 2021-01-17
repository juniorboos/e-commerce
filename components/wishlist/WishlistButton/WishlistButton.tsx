import React, { FC, useState } from 'react'
import cn from 'classnames'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import useAddItem from '@bigcommerce/storefront-data-hooks/wishlist/use-add-item'
import useRemoveItem from '@bigcommerce/storefront-data-hooks/wishlist/use-remove-item'
import useWishlist from '@bigcommerce/storefront-data-hooks/wishlist/use-wishlist'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { Heart } from '@components/icons'
import { useUI } from '@components/ui/context'

const WishlistButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const [selected, setSelected] = useState(false)

  return (
    <button
      aria-label="Add to wishlist"
      className={className}
      onClick={() => setSelected(!selected)}
    >
      <Heart fill={selected ? 'var(--pink)' : 'none'} />
    </button>
  )
}

export default WishlistButton
