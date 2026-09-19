import type { Locale } from "@/lib/i18n";

export type AuthCopy = {
  common: {
    backHome: string;
    or: string;
    name: string;
    email: string;
    password: string;
    client: string;
    freelancer: string;
    role: string;
    google: string;
    working: string;
    error: string;
  };
  login: {
    eyebrow: string;
    title: string;
    body: string;
    submit: string;
    forgot: string;
    prompt: string;
    link: string;
    verified: string;
  };
  signup: {
    eyebrow: string;
    title: string;
    body: string;
    submit: string;
    prompt: string;
    link: string;
    disclaimer: string;
  };
  forgot: {
    eyebrow: string;
    title: string;
    body: string;
    submit: string;
    success: string;
    back: string;
  };
  verify: {
    eyebrow: string;
    title: string;
    body: string;
    check: string;
    resend: string;
    resent: string;
    noUser: string;
    login: string;
  };
  onboarding: {
    eyebrow: string;
    title: string;
    body: string;
    submit: string;
  };
  account: {
    eyebrow: string;
    title: string;
    body: string;
    verified: string;
    role: string;
    status: string;
    comingSoon: string;
    logout: string;
  };
  consent: {
    title: string;
    body: string;
    accept: string;
    decline: string;
    privacy: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
  };
};

export const authCopy: Record<Locale, AuthCopy> = {
  nl: {
    common: {
      backHome: "Terug naar Betterwork",
      or: "of",
      name: "Volledige naam",
      email: "E-mailadres",
      password: "Wachtwoord",
      client: "Ik zoek talent",
      freelancer: "Ik zoek werk",
      role: "Waarvoor gebruik je Betterwork eerst?",
      google: "Doorgaan met Google",
      working: "Even geduld...",
      error: "Er ging iets mis. Probeer het opnieuw.",
    },
    login: {
      eyebrow: "Welkom terug",
      title: "Log in bij Betterwork",
      body: "Beheer je account terwijl we de lokale marktplaats voorbereiden.",
      submit: "Inloggen",
      forgot: "Wachtwoord vergeten?",
      prompt: "Nog geen account?",
      link: "Maak er een aan",
      verified: "Je e-mailadres is bevestigd. Log in om verder te gaan.",
    },
    signup: {
      eyebrow: "Begin lokaal",
      title: "Maak je Betterwork-account",
      body: "Claim je plek als opdrachtgever of freelancer voor de lancering.",
      submit: "Account aanmaken",
      prompt: "Heb je al een account?",
      link: "Log in",
      disclaimer: "Door verder te gaan accepteer je onze voorwaarden en privacyverklaring.",
    },
    forgot: {
      eyebrow: "Account herstellen",
      title: "Stel je wachtwoord opnieuw in",
      body: "We sturen een veilige resetlink naar je e-mailadres.",
      submit: "Stuur resetlink",
      success: "Controleer je inbox. Als het account bestaat, ontvang je een resetlink.",
      back: "Terug naar inloggen",
    },
    verify: {
      eyebrow: "Nog één stap",
      title: "Bevestig je e-mailadres",
      body: "Open de verificatielink in je inbox en kom daarna hier terug.",
      check: "Ik heb mijn e-mail bevestigd",
      resend: "Verificatiemail opnieuw sturen",
      resent: "Een nieuwe verificatiemail is verstuurd.",
      noUser: "Al bevestigd? Log in om verder te gaan.",
      login: "Naar inloggen",
    },
    onboarding: {
      eyebrow: "Maak je profiel af",
      title: "Hoe ga jij Betterwork gebruiken?",
      body: "Deze basis helpt ons je account goed voor te bereiden. Rollen toevoegen en wisselen volgt later.",
      submit: "Profiel afronden",
    },
    account: {
      eyebrow: "Jouw account",
      title: "Welkom bij Betterwork",
      body: "Je account is klaar. Projecten, profielen en berichten komen bij de marketplace-lancering beschikbaar.",
      verified: "E-mail bevestigd",
      role: "Primaire rol",
      status: "Platformstatus",
      comingSoon: "Marketplace binnenkort beschikbaar",
      logout: "Uitloggen",
    },
    consent: {
      title: "Help Betterwork verbeteren",
      body: "Met jouw toestemming gebruiken we Firebase Analytics om anoniem te begrijpen welke pagina's nuttig zijn.",
      accept: "Analytics toestaan",
      decline: "Alleen noodzakelijk",
      privacy: "Lees privacy",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Duidelijk over je gegevens",
      intro: "Betterwork verzamelt alleen wat nodig is om accounts, vroege toegang en een veilige lokale marktplaats te leveren.",
      sections: [
        { title: "Accountgegevens", body: "We bewaren je naam, e-mailadres, gekozen rol, taal, inlogproviders en verificatiestatus in Firebase. Wachtwoorden worden door Firebase Authentication verwerkt en zijn niet zichtbaar voor Betterwork." },
        { title: "Sessies en beveiliging", body: "Na het inloggen gebruiken we een beveiligde httpOnly-cookie van vijf dagen. CSRF-controles en servervalidatie beschermen accountwijzigingen." },
        { title: "Analytics", body: "Firebase Analytics start alleen in productie nadat je toestemming geeft. Je keuze wordt lokaal in je browser bewaard en kan worden gewist via je browserinstellingen." },
        { title: "Vroege toegang", body: "Aanmeldingen voor vroege toegang worden apart bewaard om je over de lancering te informeren. We verkopen deze gegevens niet." },
      ],
    },
  },
  en: {
    common: {
      backHome: "Back to Betterwork",
      or: "or",
      name: "Full name",
      email: "Email address",
      password: "Password",
      client: "I need talent",
      freelancer: "I need work",
      role: "What will you use Betterwork for first?",
      google: "Continue with Google",
      working: "Please wait...",
      error: "Something went wrong. Please try again.",
    },
    login: {
      eyebrow: "Welcome back",
      title: "Log in to Betterwork",
      body: "Manage your account while we prepare the local marketplace.",
      submit: "Log in",
      forgot: "Forgot password?",
      prompt: "No account yet?",
      link: "Create one",
      verified: "Your email is verified. Log in to continue.",
    },
    signup: {
      eyebrow: "Start local",
      title: "Create your Betterwork account",
      body: "Claim your place as a client or freelancer before launch.",
      submit: "Create account",
      prompt: "Already have an account?",
      link: "Log in",
      disclaimer: "By continuing, you accept our terms and privacy notice.",
    },
    forgot: {
      eyebrow: "Recover account",
      title: "Reset your password",
      body: "We will send a secure reset link to your email address.",
      submit: "Send reset link",
      success: "Check your inbox. If the account exists, you will receive a reset link.",
      back: "Back to login",
    },
    verify: {
      eyebrow: "One more step",
      title: "Verify your email address",
      body: "Open the verification link in your inbox, then return here.",
      check: "I verified my email",
      resend: "Resend verification email",
      resent: "A new verification email has been sent.",
      noUser: "Already verified? Log in to continue.",
      login: "Go to login",
    },
    onboarding: {
      eyebrow: "Complete your profile",
      title: "How will you use Betterwork?",
      body: "This helps us prepare your account. Adding and switching roles will follow later.",
      submit: "Complete profile",
    },
    account: {
      eyebrow: "Your account",
      title: "Welcome to Betterwork",
      body: "Your account is ready. Projects, profiles, and messaging arrive with the marketplace launch.",
      verified: "Email verified",
      role: "Primary role",
      status: "Platform status",
      comingSoon: "Marketplace coming soon",
      logout: "Log out",
    },
    consent: {
      title: "Help improve Betterwork",
      body: "With your permission, Firebase Analytics helps us anonymously understand which pages are useful.",
      accept: "Allow analytics",
      decline: "Necessary only",
      privacy: "Read privacy",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Clear about your data",
      intro: "Betterwork only collects what is needed to provide accounts, early access, and a secure local marketplace.",
      sections: [
        { title: "Account data", body: "We store your name, email, selected role, language, login providers, and verification status in Firebase. Passwords are handled by Firebase Authentication and are not visible to Betterwork." },
        { title: "Sessions and security", body: "After login, we use a secure five-day httpOnly cookie. CSRF checks and server validation protect account changes." },
        { title: "Analytics", body: "Firebase Analytics starts only in production after you consent. Your choice is stored locally in your browser and can be cleared in browser settings." },
        { title: "Early access", body: "Early-access registrations are stored separately so we can inform you about launch. We do not sell this data." },
      ],
    },
  },
};
