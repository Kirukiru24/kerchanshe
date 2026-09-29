// app/admin/orders/page.tsx
export default function AdminOrdersPage() {
  const orders = [
    { id: "ORD-9042", customer: "Abebe Bikila", date: "2026-09-22", items: "2x Yirgacheffe 250g", total: "$36.00", status: "Processing", payment: "Paid (Telebirr)" },
    { id: "ORD-9041", customer: "Sara Tesfaye", date: "2026-09-21", items: "1x Guji Specialty Wholebean", total: "$22.50", status: "Shipped", payment: "Paid (CBE Birr)" },
    { id: "ORD-9040", customer: "John Doe", date: "2026-09-20", items: "4x Sample Tasters Pack", total: "$80.00", status: "Delivered", payment: "Paid (Stripe)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">B2C Retail Orders</h1>
          <p className="text-xs text-ink/60">Monitor domestic and international consumer coffee orders.</p>
        </div>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Order ID</th>
            <th className="p-3 font-normal">Customer</th>
            <th className="p-3 font-normal">Date</th>
            <th className="p-3 font-normal">Items</th>
            <th className="p-3 font-normal">Total</th>
            <th className="p-3 font-normal">Payment</th>
            <th className="p-3 font-normal">Status</th>
            <th className="p-3 font-normal text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-line hover:bg-white/50">
              <td className="p-3 font-mono text-xs">{order.id}</td>
              <td className="p-3 font-medium">{order.customer}</td>
              <td className="p-3 text-ink/70">{order.date}</td>
              <td className="p-3 text-ink/70">{order.items}</td>
              <td className="p-3 font-medium">{order.total}</td>
              <td className="p-3 text-xs">{order.payment}</td>
              <td className="p-3">
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800">
                  {order.status}
                </span>
              </td>
              <td className="p-3 text-right text-roastedGold hover:underline cursor-pointer">View Order →</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}