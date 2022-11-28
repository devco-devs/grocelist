import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import { useProducts } from "../providers/ProductsProvider";
import { convertToCents } from "../utils/converters";

export function Actions() {
  const { addProductToList } = useProducts();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleAddProduct() {
    if (!product || !quantity || !price) {
      alert('Preencha todos os campos');
      return;
    }
    addProductToList({
      product,
      quantity: Number(quantity),
      price: convertToCents(price)
    });
    setProduct("");
    setQuantity("");
    setPrice("");
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-auto gap-3 p-4 bg-gray-300 rounded-md">
      <input name="product" value={product} onChange={e => setProduct(e.target.value)} required type="text" placeholder="Produto" className="px-3 py-2 rounded-md w-full md:flex-1 placeholder:text-gray-600" />
      <input name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required type="number" placeholder="Quantidade" className="px-3 py-2 rounded-md w-full md:w-1/6 placeholder:text-gray-600" />
      <input name="price" value={price} onChange={e => setPrice(e.target.value)} required type="number" placeholder="Valor (em R$)" className="px-3 py-2 rounded-md w-full md:w-1/6 placeholder:text-gray-600" />
      <button
        onClick={handleAddProduct}
        className="flex items-center justify-center gap-1 bg-emerald-500 px-3 py-2 rounded-md text-white w-full md:w-1/6"
      >
        <PlusCircle size={18} className="leading-none" />
        ADICIONAR
      </button>
    </div >
  )
}