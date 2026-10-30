import type { Speaker } from "../types";

/** Sample profiles for layout and planning. Replace with confirmed speakers. */
export const speakers: Speaker[] = [
  {
    slug: "amara-cole",
    name: "Amara Cole",
    title: "Sample profile · Technology strategy",
    expertise: ["Technology", "Innovation"],
    bio: "A sample profile prepared for the Future of Technology program. Amara’s session explores how teams turn a complex idea into a clear conference experience.",
    image: "/images/speaker-amara.jpg",
    imageAlt: "Sample portrait of Amara Cole, a woman in professional attire smiling toward the camera.",
  },
  {
    slug: "julian-hart",
    name: "Julian Hart",
    title: "Sample profile · Leadership",
    expertise: ["Leadership", "Innovation"],
    bio: "A sample profile for leadership conversations. Julian’s listed sessions focus on how hosts guide a room without crowding the people in it.",
    image: "/images/speaker-julian.jpg",
    imageAlt: "Sample portrait of Julian Hart, a man in a dark suit standing with his arms crossed.",
  },
  {
    slug: "priya-raman",
    name: "Priya Raman",
    title: "Sample profile · Design and product",
    expertise: ["Design", "Entrepreneurship"],
    bio: "A sample profile for creative and product sessions. Priya’s biography will be replaced when a confirmed speaker is announced.",
    image: "/images/speaker-priya.jpg",
    imageAlt: "Sample portrait of Priya Raman, a woman in a light blazer seated in a bright office.",
  },
  {
    slug: "elias-navarro",
    name: "Elias Navarro",
    title: "Sample profile · Workshops",
    expertise: ["Technology", "Entrepreneurship"],
    bio: "A sample workshop host. Elias is listed on hands-on sessions so the schedule and speaker pages can be reviewed before real faculty are confirmed.",
    image: "/images/speaker-elias.jpg",
    imageAlt: "Sample portrait of Elias Navarro, a man in a navy suit against a plain background.",
  },
  {
    slug: "naomi-chen",
    name: "Naomi Chen",
    title: "Sample profile · Community and hosting",
    expertise: ["Community", "Design"],
    bio: "A sample host for networking and forum sessions. Naomi’s profile stands in until the published speaker list is ready.",
    image: "/images/speaker-naomi.jpg",
    imageAlt: "Sample portrait of Naomi Chen, a woman with a calm expression in soft indoor light.",
  },
  {
    slug: "marcus-adeyemi",
    name: "Marcus Adeyemi",
    title: "Sample profile · Emerging technology",
    expertise: ["Technology", "Leadership"],
    bio: "A sample profile for briefings on emerging tools. Marcus is included so event pages can show a complete speaker row.",
    image: "/images/speaker-marcus.jpg",
    imageAlt: "Sample portrait of Marcus Adeyemi, a man smiling in a dark collared shirt.",
  },
];

export function getSpeaker(slug: string) {
  return speakers.find((speaker) => speaker.slug === slug);
}

export function speakersFor(slugs: string[]) {
  return slugs.map((slug) => getSpeaker(slug)).filter((speaker): speaker is Speaker => Boolean(speaker));
}

export function expertiseOptions() {
  return Array.from(new Set(speakers.flatMap((speaker) => speaker.expertise))).sort();
}
