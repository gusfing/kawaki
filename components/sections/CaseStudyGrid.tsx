import { getCaseStudies } from "@/lib/mdx";
import { InteractivePortfolio } from "./InteractivePortfolio";
import { Button } from "@/components/ui/Button";

export function CaseStudyGrid() {
  const studies = getCaseStudies();

  return (
    <section className="w-full py-24 md:py-32 px-5 md:px-16 bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <InteractivePortfolio
          studies={studies}
          title="Proof is in the shipping."
          eyebrow="Recent Work & Case Studies"
        />

        <div className="mt-16 flex justify-center">
          <Button variant="secondary" href="/case-studies">
            Explore All Case Studies & Results →
          </Button>
        </div>
      </div>
    </section>
  );
}
