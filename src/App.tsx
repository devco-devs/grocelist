import { Actions } from "./components/Actions";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { ProductsProvider } from "./providers/ProductsProvider";

export function App() {
  return (
    <ProductsProvider>
      <Header />
      <main className="max-w-[1120px] w-full h-full p-4 mx-auto">
        <Actions />
        <List />
      </main>
    </ProductsProvider>
  )
}