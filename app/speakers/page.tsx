import type { Metadata } from "next";
import { SpeakerDirectory } from "@/components/speakers/SpeakerDirectory";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { expertiseOptions, speakers } from "@/lib/speakers";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Sample speaker profiles for B&JEvents programs, with search by name and expertise.",
};

export default function SpeakersPage() {
  return (
    <>
      <PageIntro
        label="Speakers"
        title="Voices for the room."
        text="These profiles are samples so the directory, search, and event pages can be reviewed. They will be replaced when speakers are confirmed."
      />
      <section className="bg-ivory py-12 md:py-16">
        <Container>
          <SpeakerDirectory speakers={speakers} expertise={expertiseOptions()} />
        </Container>
      </section>
    </>
  );
}
