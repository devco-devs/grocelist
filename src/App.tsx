import { Header } from './components/Header'
import { ProductForm } from './components/ProductForm'
import { ProductList } from './components/ProductList'

export function App() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 w-full h-full flex flex-col min-h-screen min-w-screen">
      <div className="flex flex-col max-w-[1120px] mx-auto flex-1 w-full">
        <Header />
        <main className="flex-1 px-4 text-zinc-900 dark:text-zinc-100">
          <ProductForm />
          <ProductList />
        </main>
      </div>
    </div>
  )
}
