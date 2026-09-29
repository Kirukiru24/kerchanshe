// app/admin/products/page.tsx
import { getProductsAdmin, createProduct } from "@/app/actions/admin";

export default async function AdminProductsPage() {
  const products = await getProductsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">Products &amp; Lots</h1>
          <p className="text-xs text-ink/60">Manage green coffee origin lots, roasted inventory, and pricing.</p>
        </div>
      </div>

      <form action={createProduct} className="grid grid-cols-6 gap-3 bg-white/60 p-4 border border-line rounded">
        <input name="code" required placeholder="Lot Code (e.g. LOT-004)" className="border border-line px-3 py-1.5 text-sm rounded" />
        <input name="name" required placeholder="Product Name" className="border border-line px-3 py-1.5 text-sm rounded" />
        <input name="category" required placeholder="Category" className="border border-line px-3 py-1.5 text-sm rounded" />
        <input name="origin" required placeholder="Origin Region" className="border border-line px-3 py-1.5 text-sm rounded" />
        <input name="stockKg" type="number" required placeholder="Stock (Kg)" className="border border-line px-3 py-1.5 text-sm rounded" />
        <input name="pricePerKg" type="number" step="0.01" required placeholder="Price ($/Kg)" className="border border-line px-3 py-1.5 text-sm rounded" />
        <div className="col-span-6 flex justify-end">
          <button type="submit" className="rounded-full bg-roastedGold px-5 py-2 text-sm font-medium text-ink hover:opacity-90">
            + Add Product to Database
          </button>
        </div>
      </form>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Code</th>
            <th className="p-3 font-normal">Name</th>
            <th className="p-3 font-normal">Category</th>
            <th className="p-3 font-normal">Origin</th>
            <th className="p-3 font-normal">Stock</th>
            <th className="p-3 font-normal">Price</th>
            <th className="p-3 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} className="border-b border-line hover:bg-white/50">
              <td className="p-3 font-mono text-xs">{item.code}</td>
              <td className="p-3 font-medium text-ink">{item.name}</td>
              <td className="p-3 text-ink/70">{item.category}</td>
              <td className="p-3 text-ink/70">{item.origin}</td>
              <td className="p-3 font-mono">{item.stockKg} kg</td>
              <td className="p-3 font-medium">${item.pricePerKg.toFixed(2)}</td>
              <td className="p-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${item.status === "IN_STOCK" ? "bg-deepGreen/10 text-deepGreen" : "bg-amber-100 text-amber-800"}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}