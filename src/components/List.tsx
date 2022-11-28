import { Pen, Trash } from "phosphor-react";
import { useState } from "react";
import { useProducts } from "../providers/ProductsProvider";
import { convertToCents, convertToReais } from "../utils/converters";
import { Empty } from "./Empty";


export function List() {
  const { products, editProduct, removeProduct } = useProducts();
  const total = products?.reduce((acc, item) => acc + (item.price * item.quantity), 0) ?? 0;
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // FIXME: AJUSTAR CONVERSOR
  function handleStartEditing(item: any) {
    setIsEditing(true);
    setProduct(item.product);
    setQuantity(String(convertToReais(item.quantity)));
    setPrice((item.price));
  }


  function handleEditProduct(productId: string) {
    const edittedProduct = {
      product,
      quantity: Number(quantity),
      price: convertToCents(price)
    }

    editProduct(productId, edittedProduct);
    setIsEditing(false)
    setProduct("");
    setQuantity("");
    setPrice("");
  }


  if (!products?.length) {
    return <Empty />
  }

  return (
    <table className="w-full my-4 bg-gray-300 rounded-md font-semibold border-collapse">
      {products?.map(item => (
        <tr key={item.id} className=" even:bg-zinc-400 flex flex-1 items-center">
          {!isEditing ? (
            <>
              <td className="flex-1 p-2">{item.product}</td>
              <td className="w-1/6 md:w-1/12 p-2">x {item.quantity}</td>
              <td className="w-1/6 p-2">{convertToReais(item.price)}</td>
            </>
          ) : (
            <>
              <td className="flex-1 p-2">{item.product}</td>
              <td className="w-1/6 md:w-1/12 p-2">
                <input name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required type="number" placeholder="Quantidade" className="px-3 py-2 rounded-md w-full md:w-1/6 placeholder:text-gray-600" />
              </td>
              <td className="w-1/6 p-2">
                <input name="price" value={price} onChange={e => setPrice(e.target.value)} required type="number" placeholder="Valor (em R$)" className="px-3 py-2 rounded-md w-full md:w-1/6 placeholder:text-gray-600" />
              </td>
            </>
          )}

          {!isEditing ? (
            <td className="flex ml-6 gap-2 md:gap-4 pr-4">
              <button onClick={() => removeProduct(item.id)}>
                <Trash size={18} />
              </button>
              <button onClick={() => handleStartEditing(item)}>
                <Pen size={18} />
              </button>
            </td>
          ) : (
            <button onClick={() => handleEditProduct(item.id)}>
              Salvar
            </button>
          )}
        </tr>
      ))}
      <tr className="bg-emerald-600 text-white flex flex-1 items-center rounded-b-md">
        <td className="p-2">Total:</td>
        <td className="p-2 w-full" />
        <td className="p-2">{convertToReais(total)}</td>
      </tr>
    </table>
  )
}