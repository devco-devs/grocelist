import { Pencil, PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useProducts } from "../providers/ProductsProvider";
import { convertToCents } from "../utils/converters";

// FIXME: AJUSTAR EDIÇÃO DE ITEM
export function Actions() {
  const { addProductToList, currentEditingProductId, editProduct, getCurrentProduct, products } = useProducts();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (currentEditingProductId) {
      setProduct(products.find(item => item.id === currentEditingProductId)?.product ?? "");
      setQuantity(String(products.find(item => item.id === currentEditingProductId)?.quantity ?? ""));
      setPrice(String(products.find(item => item.id === currentEditingProductId)?.price ?? ""));
    }
  }, [currentEditingProductId])


  function handleAddProduct() {
    if (!product) {
      alert('Digite ao menos o nome do produto');
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

  function handleEditProduct() {
    if (!product) {
      alert('Digite ao menos o nome do produto');
      return;
    }
    editProduct(currentEditingProductId, {
      product,
      quantity: Number(quantity),
      price: convertToCents(price)
    });
    setProduct("");
    setQuantity("");
    setPrice("");
    getCurrentProduct("");
  }

  function handleCancelEditing() {
    getCurrentProduct("");
    setProduct("");
    setQuantity("");
    setPrice("");
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-auto gap-3 p-4 bg-gray-300 rounded-md">
      <input name="product" value={product} onChange={e => setProduct(e.target.value)} required type="text" placeholder="Produto" className="px-3 py-2 rounded-md w-full md:flex-1 placeholder:text-gray-600" />
      <input name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required type="number" placeholder="Quantidade" className="px-3 py-2 rounded-md w-full md:w-1/6 placeholder:text-gray-600" />
      <input name="price" value={price} onChange={e => setPrice(e.target.value)} required type="number" placeholder="Valor (em R$)" className="px-3 py-2 rounded-md w-full md:w-1/6 placeholder:text-gray-600" />
      {currentEditingProductId ? (
        <>
          <button
            onClick={handleEditProduct}
            className="flex items-center justify-center gap-1 bg-emerald-500 px-3 py-2 rounded-md text-white w-full md:w-1/6"
          >
            <Pencil size={18} className="leading-none" />
            SALVAR
          </button>
          <button
            onClick={handleCancelEditing}
            className="flex items-center justify-center gap-1 bg-red-500 px-3 py-2 rounded-md text-white w-full md:w-1/6"
          >
            CANCELAR
          </button>
        </>
      ) : (
        <button
          onClick={currentEditingProductId ? handleEditProduct : handleAddProduct}
          className="flex items-center justify-center gap-1 bg-emerald-500 px-3 py-2 rounded-md text-white w-full md:w-1/6"
        >
          <PlusCircle size={18} className="leading-none" />
          {currentEditingProductId ? "SALVAR" : "ADICIONAR"}
        </button>
      )}

    </div >
  )
}