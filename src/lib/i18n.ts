export const locales = ["nl", "en"] as const;

export type Locale = (typeof locales)[number];

export type LandingCopy = {
  metadata: { title: string; description: string };
  header: {
    talent: string;
    work: string;
    story: string;
    login: string;
    account: string;
    comingSoon: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    eyebrow: string;
    headline: [string, string, string];
    body: string;
    primary: string;
    secondary: string;
    note: string;
    imageAlt: string;
  };
  heroCard: {
    title: string;
    body: string;
  };
  trust: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    signoff: string;
    imageAlt: string;
  };
  talent: {
    eyebrow: string;
    title: string;
    body: string;
    clientTitle: string;
    clientBody: string;
    freelancerTitle: string;
    freelancerBody: string;
  };
  footer: {
    tagline: string;
    product: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
};

export const copy: Record<Locale, LandingCopy> = {
  nl: {
    metadata: {
      title: "Lokaal talent, echte projecten",
      description:
        "Vind lokaal talent of nieuw freelance werk via Betterwork, de Suriname-first marktplaats.",
    },
    header: {
      talent: "Talent vinden",
      work: "Werk vinden",
      story: "Over Betterwork",
      login: "Inloggen",
      account: "Account",
      comingSoon: "Binnenkort beschikbaar",
      menuOpen: "Menu openen",
      menuClose: "Menu sluiten",
    },
    hero: {
      eyebrow: "Binnenkort live in Suriname",
      headline: ["Lokaal talent.", "Echte projecten.", "Samen vooruit."],
      body:
        "Betterwork is de Suriname-first marktplaats waar opdrachtgevers en freelancers elkaar vinden, afspraken duidelijk maken en projecten in beweging brengen.",
      primary: "Maak een account",
      secondary: "Ontdek werk",
      note: "Voor opdrachtgevers en freelancers. 100% lokaal.",
      imageAlt:
        "Twee Surinaamse professionals die samen aan een project werken",
    },
    heroCard: {
      title: "Klaar om te beginnen?",
      body: "Maak een gratis account aan als opdrachtgever of freelancer en claim je plek voor de lancering.",
    },
    trust: {
      title: "Lokaal gevonden. Duidelijk afgesproken. Betaald op jouw manier.",
      items: [
        {
          title: "Lokaal eerst",
          body: "Gemaakt voor Suriname. Begrip van onze markt, taal en manier van werken.",
        },
        {
          title: "Duidelijke afspraken",
          body: "Heldere scope, budget en tijdlijnen. Zo weet iedereen waar hij aan toe is.",
        },
        {
          title: "Betaal op jouw manier",
          body: "Lokale bankoverschrijving, Mopé of Uni5Pay als geplande betaalopties.",
        },
        {
          title: "Vertrouwen voorop",
          body: "Echte mensen, eerlijke communicatie en support van een lokaal team.",
        },
      ],
    },
    story: {
      eyebrow: "Ons verhaal",
      title: "Waarom Betterwork bestaat",
      paragraphs: [
        "Je hebt een goed idee en een drukke agenda, of een project dat moet groeien. Maar het vinden van de juiste freelancer in Suriname kost tijd. Afspraken zijn soms onduidelijk en betalen gaat niet altijd zoals je gewend bent.",
        "Betterwork brengt daar verandering in. Eén vertrouwde plek waar opdrachtgevers lokaal talent vinden en freelancers meer betekenisvol werk ontdekken. Dichtbij, duidelijk en passend bij hoe wij in Suriname zaken doen.",
      ],
      signoff: "Gebouwd in Suriname. Voor Suriname.",
      imageAlt: "Uitzicht over de Surinamerivier en Paramaribo",
    },
    talent: {
      eyebrow: "Twee routes. Eén community.",
      title: "Een betere lokale markt begint aan beide kanten.",
      body:
        "Betterwork maakt ruimte voor duidelijke opdrachten én voor Surinaams talent dat gezien wil worden.",
      clientTitle: "Voor opdrachtgevers",
      clientBody:
        "Deel wat je nodig hebt, ontvang lokale reacties en kies de persoon die bij jouw project past.",
      freelancerTitle: "Voor freelancers",
      freelancerBody:
        "Ontdek passend werk, laat je vaardigheden zien en bouw duurzame relaties op in je eigen markt.",
    },
    footer: {
      tagline: "Lokaal talent. Echte projecten. Samen vooruit.",
      product: "Product",
      legal: "Juridisch",
      privacy: "Privacy",
      terms: "Voorwaarden",
      copyright: "Betterwork. Alle rechten voorbehouden.",
    },
  },
  en: {
    metadata: {
      title: "Local talent, real projects",
      description:
        "Find local talent or new freelance work through Betterwork, the Suriname-first marketplace.",
    },
    header: {
      talent: "Find talent",
      work: "Find work",
      story: "About Betterwork",
      login: "Log in",
      account: "Account",
      comingSoon: "Coming soon",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      eyebrow: "Coming soon to Suriname",
      headline: ["Local talent.", "Real projects.", "Moving forward."],
      body:
        "Betterwork is the Suriname-first marketplace where clients and freelancers find each other, make clear agreements, and get projects moving.",
      primary: "Create an account",
      secondary: "Discover work",
      note: "For clients and freelancers. 100% local.",
      imageAlt: "Two Surinamese professionals working together on a project",
    },
    heroCard: {
      title: "Ready to start?",
      body: "Create a free account as a client or freelancer and claim your place before launch.",
    },
    trust: {
      title: "Found locally. Clearly agreed. Paid your way.",
      items: [
        {
          title: "Local first",
          body: "Built for Suriname, with an understanding of our market, languages, and way of working.",
        },
        {
          title: "Clear agreements",
          body: "Clear scope, budget, and timelines so everyone knows what to expect.",
        },
        {
          title: "Pay your way",
          body: "Local bank transfer, Mopé, or Uni5Pay as planned payment options.",
        },
        {
          title: "Trust comes first",
          body: "Real people, honest communication, and support from a local team.",
        },
      ],
    },
    story: {
      eyebrow: "Our story",
      title: "Why Betterwork exists",
      paragraphs: [
        "You have a good idea and a busy schedule, or a project that needs to grow. But finding the right freelancer in Suriname takes time. Agreements can be unclear, and paying does not always work the way you expect.",
        "Betterwork changes that. One trusted place where clients find local talent and freelancers discover more meaningful work. Close to home, clear, and suited to how we do business in Suriname.",
      ],
      signoff: "Built in Suriname. For Suriname.",
      imageAlt: "View across the Suriname River toward Paramaribo",
    },
    talent: {
      eyebrow: "Two paths. One community.",
      title: "A better local market starts on both sides.",
      body:
        "Betterwork creates space for clear project opportunities and for Surinamese talent that deserves to be seen.",
      clientTitle: "For clients",
      clientBody:
        "Share what you need, receive local responses, and choose the person who fits your project.",
      freelancerTitle: "For freelancers",
      freelancerBody:
        "Discover fitting work, show your skills, and build lasting relationships in your own market.",
    },
    footer: {
      tagline: "Local talent. Real projects. Moving forward.",
      product: "Product",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "Betterwork. All rights reserved.",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
