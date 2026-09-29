// app/admin/content/page.tsx
import { getPostsAdmin, createPost, togglePostStatus } from "@/app/actions/admin";

export default async function AdminContentPage() {
  const posts = await getPostsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">Content &amp; Journal Articles</h1>
          <p className="text-xs text-ink/60">
            Publish news, harvest reports, and story updates directly to the Kerchanshe journal.
          </p>
        </div>
      </div>

      {/* Form to create a new Article */}
      <form action={createPost} className="flex gap-3 rounded border border-line bg-white/60 p-4">
        <input
          name="title"
          required
          placeholder="Article Title (e.g. Harvest Report 2026: High Altitude Yields of Guji)"
          className="flex-1 rounded border border-line px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-roastedGold"
        />
        <select
          name="status"
          className="rounded border border-line bg-white px-3 py-2 text-sm text-ink/80"
        >
          <option value="DRAFT">Save as Draft</option>
          <option value="PUBLISHED">Publish Directly</option>
        </select>
        <button
          type="submit"
          className="rounded-full bg-roastedGold px-5 py-2 text-sm font-medium text-ink hover:opacity-90"
        >
          + Add Post
        </button>
      </form>

      {/* Database Content Table */}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Article Title</th>
            <th className="p-3 font-normal">Author</th>
            <th className="p-3 font-normal">Date Created</th>
            <th className="p-3 font-normal">Status</th>
            <th className="p-3 font-normal text-right">Toggle Status</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-ink/50">
                No articles found. Create your first post using the form above.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id} className="border-b border-line hover:bg-white/50">
                <td className="p-3 font-medium text-ink">{post.title}</td>
                <td className="p-3 text-ink/70">{post.author.name}</td>
                <td className="p-3 font-mono text-xs text-ink/60">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.status === "PUBLISHED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <form
                    action={async () => {
                      "use server";
                      await togglePostStatus(post.id, post.status);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs text-roastedGold hover:underline font-medium"
                    >
                      {post.status === "PUBLISHED" ? "Unpublish" : "Publish Now"} →
                    </button>
                  </form>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}