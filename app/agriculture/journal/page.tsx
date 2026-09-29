// Seed placeholder — swap for JournalPost entity query (Section 27) once the
// headless CMS is connected. Six placeholders shown; real posts are farm-tagged.
const PLACEHOLDER_POSTS = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  category: "Harvest Update",
  title: "Article headline goes here",
}));

export default function JournalPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="font-serif text-3xl text-ink">The Kerchanshe Journal</h1>
      <p className="mt-1 text-ink/70">
        Harvest updates, farmer stories, and sustainability reporting from all six estates
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_POSTS.map((post) => (
          <article key={post.id}>
            <div className="aspect-[4/3] w-full bg-cream" aria-hidden />
            <p className="mt-3 text-xs uppercase tracking-wide text-ink/50">{post.category}</p>
            <h2 className="mt-1 font-serif text-lg text-ink">{post.title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}
