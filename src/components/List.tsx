import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useProducts } from "../providers/ProductsProvider";
import { convertToCents, convertToReais } from "../utils/converters";
import { Empty } from "./Empty";


export function List() {
  const { products, getCurrentProduct, removeProduct } = useProducts();
  const total = products?.reduce((acc, item) => acc + (item.price * item.quantity), 0) ?? 0;


  if (!products?.length) {
    return <Empty />
  }

  return (
    <div className="mt-20">
      {products?.map(item => (
        <div key={item.id} className="flex w-full odd:bg-gray-300 even:bg-gray-200">
          <div className="flex items-center w-full max-w-[50%] md:max-w-[70%] p-2">{item.product}</div>
          <div className="flex w-1/12 items-center flex-1p-2">x {item.quantity}</div>
          <div className="flex w-1/6 items-center flex-1 p-2">{convertToReais(item.price)}</div>

          <div className="flex items-center gap-2 ">
            <button onClick={() => getCurrentProduct(item.id)}>
              <Pencil size={20} />
            </button>
            <button onClick={() => removeProduct(item.id)}>
              <Trash size={20} />
            </button>
          </div>
        </div>
      ))}

      <div className="flex bg-emerald-500 text-white">
        <div className="flex flex-1 p-2">
          <strong>Total</strong>
        </div>
        <div className="flex w-[16%] p-2 mr-24 md:mr-16">{convertToReais(total)}</div>
      </div>
    </div>
  )
}