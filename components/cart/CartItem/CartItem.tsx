import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Trash, Plus, Minus } from '@components/icons'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import useUpdateItem from '@bigcommerce/storefront-data-hooks/cart/use-update-item'
import useRemoveItem from '@bigcommerce/storefront-data-hooks/cart/use-remove-item'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'

const CartItem = ({ item }: { item: any }) => {
  const { removeCartItem } = useUI()
  const updateItem = useUpdateItem(item)
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState(1)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    removeCartItem(item.id)
  }

  return (
    <li
      className={cn('flex flex-row space-x-8 py-8', {
        'opacity-75 pointer-events-none': removing,
      })}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden">
        <Image
          className={s.productImage}
          src={item.image[0]}
          width={150}
          height={150}
          alt="Product Image"
          // The cart item image is already optimized and very small in size
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col text-base">
        {/** TODO: Replace this. No `path` found at Cart */}
        <Link href={`/product/${item.url.split('/')[3]}`}>
          <span className="font-bold mb-5 text-lg cursor-pointer">
            {item.name}
          </span>
        </Link>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>{item.price}</span>
        <button className="flex justify-end" onClick={handleRemove}>
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem
