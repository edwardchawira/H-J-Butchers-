import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="bg-oxblood text-cream">
      <div className="container-site flex flex-col items-center gap-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <p className="eyebrow">The Butcher&apos;s Post</p>
          <h2 className="mt-2 text-3xl">Offers and recipes, freshly delivered</h2>
          <p className="mt-2 text-sm text-white/75">Join for 10% off your first basket with code WELCOME10.</p>
        </div>
        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Your email address"
            className="h-11 flex-1 rounded-sm border border-white/30 bg-white px-4 text-sm placeholder:text-muted"
          />
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
