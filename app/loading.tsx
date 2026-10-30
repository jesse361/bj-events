import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-24">
      <p className="text-sm text-quiet">Loading the page…</p>
      <div className="mt-6 h-10 max-w-md rounded-full bg-sage" />
      <div className="mt-4 h-4 max-w-xl rounded-full bg-sage-light" />
    </Container>
  );
}
