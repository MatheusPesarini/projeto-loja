import { Button } from '../ui/button';

export default function NewsletterSection() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 text-center bg-primary text-primary-foreground">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Fique por Dentro!</h2>
      <p className="mb-6">Assine nossa newsletter e receba novidades e promoções exclusivas.</p>
      <div className="flex justify-center">
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          aria-label="Seu melhor e-mail"
          className="p-2 h-10 rounded-l-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button type="submit" variant="secondary" className="rounded-l-none h-10">
          Inscrever
        </Button>
      </div>
    </section>
  );
}
