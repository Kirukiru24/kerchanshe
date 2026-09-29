import { notFound } from "next/navigation";
import { getFarm } from "@/lib/data";
import { ProcessStep } from "@/components/ProcessStep";

const STEPS = ["Hand-Picked", "Pulped & Fermented", "Washed & Graded", "Milled", "Cupped", "Exported"];

export default async function FarmProcessPage({ params }: { params: { farm: string } }) {
  const farm = await getFarm(params.farm);
  if (!farm) notFound();

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl text-ink">From Cherry to Container</h1>
        <p className="mt-1 text-ink/70">{farm.name}&rsquo;s process, step by step</p>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((title, i) => (
            <ProcessStep key={title} number={i + 1} title={title} />
          ))}
        </div>
      </div>
    </section>
  );
}
