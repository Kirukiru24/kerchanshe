// app/admin/settings/page.tsx
export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-ink">System &amp; Portal Settings</h1>
        <p className="text-xs text-ink/60">Global organization parameters, API integrations, and currency settings.</p>
      </div>

      <div className="space-y-6 rounded border border-line bg-white/60 p-6">
        <h2 className="font-serif text-lg text-ink">Enterprise Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-ink/70">Company Name</label>
            <input type="text" defaultValue="Kerchanshe Trading PLC" className="mt-1 w-full rounded border border-line p-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70">Primary Contact Email</label>
            <input type="email" defaultValue="info@kerchanshe.com" className="mt-1 w-full rounded border border-line p-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70">Headquarters Address</label>
            <input type="text" defaultValue="Addis Ababa, Ethiopia" className="mt-1 w-full rounded border border-line p-2" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/70">Base Currency</label>
            <select className="mt-1 w-full rounded border border-line p-2 bg-white">
              <option>USD ($) / ETB (Br)</option>
              <option>USD ($) Only</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded border border-line bg-white/60 p-6">
        <h2 className="font-serif text-lg text-ink">Integrations &amp; Payment Gateways</h2>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between border-b border-line/50 pb-3">
            <div>
              <p className="font-medium">Telebirr &amp; CBE Birr Gateway</p>
              <p className="text-xs text-ink/60">Domestic mobile payment processing</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">Connected</span>
          </div>
          <div className="flex items-center justify-between border-b border-line/50 pb-3">
            <div>
              <p className="font-medium">Stripe / International Merchant</p>
              <p className="text-xs text-ink/60">Cross-border credit card settlements</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">Connected</span>
          </div>
        </div>
      </div>

      <button className="rounded-full bg-roastedGold px-6 py-2.5 text-sm font-medium text-ink hover:opacity-90">
        Save All Changes
      </button>
    </div>
  );
}