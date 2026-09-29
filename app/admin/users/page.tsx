// app/admin/users/page.tsx
import { getUsersAdmin } from "@/app/actions/admin";

export default async function AdminUsersPage() {
  const users = await getUsersAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">Users &amp; Role-Based Access</h1>
        <p className="text-xs text-ink/60">Live user credentials and security policies from Prisma.</p>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Name</th>
            <th className="p-3 font-normal">Email</th>
            <th className="p-3 font-normal">Role</th>
            <th className="p-3 font-normal">Brand Scope</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-line hover:bg-white/50">
              <td className="p-3 font-medium">{u.name}</td>
              <td className="p-3 font-mono text-xs">{u.email}</td>
              <td className="p-3">
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-900">
                  {u.role}
                </span>
              </td>
              <td className="p-3 text-ink/70">{u.brandScope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}