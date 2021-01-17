import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { UserNav } from '@components/common'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { useUI } from '@components/ui/context'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import CartItem from '../CartItem'
import s from './CartSidebarView.module.css'
import { checkout } from 'pages/api/api'

const CartSidebarView: FC = () => {
  const { closeSidebar, getCartItems, resetCart } = useUI()

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [total, setTotal] = useState(0)

  const handleClose = () => {
    if (success) resetCart()
    closeSidebar()
  }

  const items = getCartItems()

  const finishCheckout = () => {
    const itemsId = items.map((item: any) => {
      return item.id
    })

    checkout(itemsId)
    setSuccess(true)
  }

  useEffect(() => {
    const prices = items.map((item: any) => {
      return Number(item.price.substring(1))
    })
    setTotal(prices.reduce((a: number, b: number) => a + b, 0).toFixed(2))
  }, [items])

  return (
    <div
      className={cn(s.root, {
        [s.empty]: error,
        [s.empty]: success,
        [s.empty]: items.length === 0,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav className="" />
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <h2 className="pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide ">
              My Cart
            </h2>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
              {items.map((item: any) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-4 py-5 sm:px-6">
            <div className="border-t border-accents-3">
              <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Button onClick={() => finishCheckout()} Component="a" width="100%">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
