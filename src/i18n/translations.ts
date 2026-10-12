export interface ServiceItem {
  title: string;
  description: string;
  whatsappMessage: string;
}

export interface TrustPoint {
  title: string;
  description: string;
}

export interface FinancingOption {
  name: string;
  ctaLabel: string;
  whatsappMessage: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    whyUs: string;
    location: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    whatsappMessage: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    items: ServiceItem[];
  };
  financing: {
    eyebrow: string;
    title: string;
    description: string;
    gaugeLabel: string;
    options: FinancingOption[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    points: TrustPoint[];
  };
  location: {
    eyebrow: string;
    title: string;
    citySummary: string;
    hoursTitle: string;
    appointmentOnly: string;
    appointmentNote: string;
    appointmentCtaLabel: string;
    appointmentWhatsappMessage: string;
    mapCtaLabel: string;
    mapTitle: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    whatsappMessage: string;
  };
  footer: {
    tagline: string;
    instagramLabel: string;
    whatsappLabel: string;
    rights: string;
  };
  whatsappFloat: {
    label: string;
  };
  languageToggle: {
    label: string;
  };
}

const es: Translations = {
  meta: {
    title: 'Taller de motos en Medellín | Pochy Motorbike',
    description:
      'Taller de motos en Belén, Medellín: mantenimiento, frenos, cambio de aceite y repuestos. Financia con Addi o Sistecrédito. Agenda tu cita por WhatsApp.',
  },
  nav: {
    services: 'Servicios',
    whyUs: 'Por qué nosotros',
    location: 'Ubicación',
    contact: 'Contacto',
  },
  hero: {
    eyebrow: 'Taller de motos · Medellín',
    title: 'Tu moto, en manos que sí saben.',
    subtitle:
      'Mantenimiento general, diagnóstico y repuestos para tu motocicleta. Rápido, honesto y cerca de ti en Medellín.',
    ctaPrimary: 'Agenda por WhatsApp',
    ctaSecondary: 'Ver servicios',
    whatsappMessage: 'Hola, quiero agendar un servicio para mi moto en Pochy Motorbike.',
  },
  services: {
    eyebrow: 'Lo que hacemos',
    title: 'Servicios',
    subtitle: 'Mantenimiento completo para que tu moto no te falle cuando más la necesitas.',
    ctaLabel: 'Cotizar',
    items: [
      {
        title: 'Mantenimiento general',
        description: 'Revisión completa de tu moto: motor, frenos, suspensión y más.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Mantenimiento general*.',
      },
      {
        title: 'Cambio de aceite',
        description: 'Aceite y filtro adecuados para la marca y uso de tu motocicleta.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Cambio de aceite*.',
      },
      {
        title: 'Frenos',
        description: 'Cambio de pastillas y discos, ajuste y revisión del sistema de frenado.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Frenos*.',
      },
      {
        title: 'Diagnóstico eléctrico',
        description: 'Batería, luces, encendido y fallas eléctricas detectadas a tiempo.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Diagnóstico eléctrico*.',
      },
      {
        title: 'Repuestos',
        description: 'Repuestos para las marcas y modelos más comunes en Medellín.',
        whatsappMessage: 'Hola, quiero consultar disponibilidad de *Repuestos*.',
      },
    ],
  },
  financing: {
    eyebrow: 'Financiación',
    title: 'Mantén tu moto al día, paga a tu ritmo',
    description:
      'Financia el mantenimiento de tu moto con Addi o Sistecrédito y paga en cuotas. También recibimos pagos con tarjeta a través de Redeban.',
    gaugeLabel: 'Listo para rodar',
    options: [
      {
        name: 'Addi',
        ctaLabel: 'Preguntar por Addi',
        whatsappMessage: 'Hola, quiero más información sobre financiar mi mantenimiento con Addi.',
      },
      {
        name: 'Sistecrédito',
        ctaLabel: 'Preguntar por Sistecrédito',
        whatsappMessage: 'Hola, quiero más información sobre financiar mi mantenimiento con Sistecrédito.',
      },
      {
        name: 'Redeban',
        ctaLabel: 'Pagar con Redeban',
        whatsappMessage: 'Hola, quiero pagar mi servicio con tarjeta a través de Redeban.',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Por qué elegirnos',
    title: 'Un taller de confianza en Medellín',
    points: [
      {
        title: 'Atención personalizada',
        description: 'Te explicamos qué necesita tu moto, sin letra pequeña ni sorpresas.',
      },
      {
        title: 'Repuestos de calidad',
        description: 'Trabajamos con repuestos confiables para las marcas más comunes.',
      },
      {
        title: 'Financiación flexible',
        description: 'Paga en cuotas con Addi o Sistecrédito, o con tarjeta vía Redeban.',
      },
      {
        title: 'Ubicados en Medellín',
        description: 'Fácil de visitar, respuesta rápida por WhatsApp.',
      },
    ],
  },
  location: {
    eyebrow: 'Encuéntranos',
    title: 'Ubicación y horario',
    citySummary: 'Medellín, Colombia',
    hoursTitle: 'Horario de atención',
    appointmentOnly: 'Solo con cita previa',
    appointmentNote:
      'Atendemos únicamente con cita. Escríbenos y te asignamos el horario que mejor te funcione.',
    appointmentCtaLabel: 'Solicitar cita por WhatsApp',
    appointmentWhatsappMessage: 'Hola, quiero solicitar una cita en Pochy Motorbike.',
    mapCtaLabel: 'Ver en Google Maps',
    mapTitle: 'Mapa de Pochy Motorbike en Medellín',
  },
  finalCta: {
    title: '¿Tu moto necesita atención?',
    subtitle: 'Escríbenos ahora y te respondemos por WhatsApp en minutos.',
    ctaLabel: 'Agendar por WhatsApp',
    whatsappMessage: 'Hola, quiero agendar una cita en Pochy Motorbike.',
  },
  footer: {
    tagline: 'Taller de motos y mantenimientos generales.',
    instagramLabel: 'Síguenos en Instagram',
    whatsappLabel: 'Escríbenos por WhatsApp',
    rights: 'Todos los derechos reservados.',
  },
  whatsappFloat: {
    label: '¿Agendamos tu cita?',
  },
  languageToggle: {
    label: 'Idioma',
  },
};

const en: Translations = {
  meta: {
    title: 'Motorcycle Workshop in Medellín | Pochy Motorbike',
    description:
      'Motorcycle workshop in Belén, Medellín: maintenance, brakes, oil changes and parts. Finance with Addi or Sistecrédito. Book your appointment on WhatsApp.',
  },
  nav: {
    services: 'Services',
    whyUs: 'Why us',
    location: 'Location',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Motorcycle workshop · Medellín',
    title: 'Your bike, in hands that know.',
    subtitle:
      'General maintenance, diagnostics, and parts for your motorcycle. Fast, honest, and close to you in Medellín.',
    ctaPrimary: 'Book on WhatsApp',
    ctaSecondary: 'See services',
    whatsappMessage: "Hi, I'd like to book a service for my motorcycle at Pochy Motorbike.",
  },
  services: {
    eyebrow: 'What we do',
    title: 'Services',
    subtitle: "Complete maintenance so your bike doesn't let you down when you need it most.",
    ctaLabel: 'Get a quote',
    items: [
      {
        title: 'General maintenance',
        description: 'Full check-up of your bike: engine, brakes, suspension, and more.',
        whatsappMessage: "Hi, I'd like a quote for *General maintenance*.",
      },
      {
        title: 'Oil change',
        description: 'The right oil and filter for your motorcycle brand and use.',
        whatsappMessage: "Hi, I'd like a quote for *Oil change*.",
      },
      {
        title: 'Brakes',
        description: 'Pad and disc replacement, adjustment, and full brake check.',
        whatsappMessage: "Hi, I'd like a quote for *Brakes*.",
      },
      {
        title: 'Electrical diagnostics',
        description: 'Battery, lights, ignition, and electrical faults caught early.',
        whatsappMessage: "Hi, I'd like a quote for *Electrical diagnostics*.",
      },
      {
        title: 'Spare parts',
        description: 'Parts for the most common brands and models in Medellín.',
        whatsappMessage: "Hi, I'd like to check availability of *Spare parts*.",
      },
    ],
  },
  financing: {
    eyebrow: 'Financing',
    title: 'Keep your bike maintained, pay at your pace',
    description:
      "Finance your motorcycle's maintenance with Addi or Sistecrédito and pay in installments. We also accept card payments through Redeban.",
    gaugeLabel: 'Ready to ride',
    options: [
      {
        name: 'Addi',
        ctaLabel: 'Ask about Addi',
        whatsappMessage: "Hi, I'd like more info about financing my maintenance with Addi.",
      },
      {
        name: 'Sistecrédito',
        ctaLabel: 'Ask about Sistecrédito',
        whatsappMessage: "Hi, I'd like more info about financing my maintenance with Sistecrédito.",
      },
      {
        name: 'Redeban',
        ctaLabel: 'Pay with Redeban',
        whatsappMessage: "Hi, I'd like to pay for my service by card through Redeban.",
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why choose us',
    title: 'A workshop you can trust in Medellín',
    points: [
      {
        title: 'Personalized attention',
        description: 'We explain what your bike needs — no fine print, no surprises.',
      },
      {
        title: 'Quality parts',
        description: 'We work with reliable parts for the most common brands.',
      },
      {
        title: 'Flexible financing',
        description: 'Pay in installments with Addi or Sistecrédito, or by card via Redeban.',
      },
      {
        title: 'Based in Medellín',
        description: 'Easy to visit, fast response on WhatsApp.',
      },
    ],
  },
  location: {
    eyebrow: 'Find us',
    title: 'Location & hours',
    citySummary: 'Medellín, Colombia',
    hoursTitle: 'Opening hours',
    appointmentOnly: 'By appointment only',
    appointmentNote: "We only work by appointment. Message us and we'll find a time that works for you.",
    appointmentCtaLabel: 'Request an appointment on WhatsApp',
    appointmentWhatsappMessage: "Hi, I'd like to request an appointment at Pochy Motorbike.",
    mapCtaLabel: 'View on Google Maps',
    mapTitle: 'Map of Pochy Motorbike in Medellín',
  },
  finalCta: {
    title: 'Does your bike need attention?',
    subtitle: "Message us now and we'll reply on WhatsApp in minutes.",
    ctaLabel: 'Book on WhatsApp',
    whatsappMessage: "Hi, I'd like to book an appointment at Pochy Motorbike.",
  },
  footer: {
    tagline: 'Motorcycle workshop and general maintenance.',
    instagramLabel: 'Follow us on Instagram',
    whatsappLabel: 'Message us on WhatsApp',
    rights: 'All rights reserved.',
  },
  whatsappFloat: {
    label: 'Book an appointment',
  },
  languageToggle: {
    label: 'Language',
  },
};

const pt: Translations = {
  meta: {
    title: 'Oficina de motos em Medellín | Pochy Motorbike',
    description:
      'Oficina de motos em Belén, Medellín: manutenção, freios, troca de óleo e peças. Financie com Addi ou Sistecrédito. Agende seu horário pelo WhatsApp.',
  },
  nav: {
    services: 'Serviços',
    whyUs: 'Por que nós',
    location: 'Localização',
    contact: 'Contato',
  },
  hero: {
    eyebrow: 'Oficina de motos · Medellín',
    title: 'Sua moto, em mãos que entendem.',
    subtitle:
      'Manutenção geral, diagnóstico e peças para sua motocicleta. Rápido, honesto e perto de você em Medellín.',
    ctaPrimary: 'Agende pelo WhatsApp',
    ctaSecondary: 'Ver serviços',
    whatsappMessage: 'Olá, quero agendar um serviço para minha moto na Pochy Motorbike.',
  },
  services: {
    eyebrow: 'O que fazemos',
    title: 'Serviços',
    subtitle: 'Manutenção completa para sua moto não te deixar na mão quando você mais precisa.',
    ctaLabel: 'Orçamento',
    items: [
      {
        title: 'Manutenção geral',
        description: 'Revisão completa da sua moto: motor, freios, suspensão e mais.',
        whatsappMessage: 'Olá, quero um orçamento para *Manutenção geral*.',
      },
      {
        title: 'Troca de óleo',
        description: 'Óleo e filtro adequados para a marca e o uso da sua motocicleta.',
        whatsappMessage: 'Olá, quero um orçamento para *Troca de óleo*.',
      },
      {
        title: 'Freios',
        description: 'Troca de pastilhas e discos, ajuste e revisão do sistema de freios.',
        whatsappMessage: 'Olá, quero um orçamento para *Freios*.',
      },
      {
        title: 'Diagnóstico elétrico',
        description: 'Bateria, luzes, ignição e falhas elétricas detectadas a tempo.',
        whatsappMessage: 'Olá, quero um orçamento para *Diagnóstico elétrico*.',
      },
      {
        title: 'Peças',
        description: 'Peças para as marcas e modelos mais comuns em Medellín.',
        whatsappMessage: 'Olá, quero consultar a disponibilidade de *Peças*.',
      },
    ],
  },
  financing: {
    eyebrow: 'Financiamento',
    title: 'Mantenha sua moto em dia, pague no seu ritmo',
    description:
      'Financie a manutenção da sua moto com Addi ou Sistecrédito e pague em parcelas. Também aceitamos pagamentos com cartão pela Redeban.',
    gaugeLabel: 'Pronto para rodar',
    options: [
      {
        name: 'Addi',
        ctaLabel: 'Perguntar sobre Addi',
        whatsappMessage: 'Olá, quero mais informações sobre financiar minha manutenção com Addi.',
      },
      {
        name: 'Sistecrédito',
        ctaLabel: 'Perguntar sobre Sistecrédito',
        whatsappMessage: 'Olá, quero mais informações sobre financiar minha manutenção com Sistecrédito.',
      },
      {
        name: 'Redeban',
        ctaLabel: 'Pagar com Redeban',
        whatsappMessage: 'Olá, quero pagar meu serviço com cartão pela Redeban.',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Por que nos escolher',
    title: 'Uma oficina de confiança em Medellín',
    points: [
      {
        title: 'Atendimento personalizado',
        description: 'Explicamos o que sua moto precisa, sem letras miúdas nem surpresas.',
      },
      {
        title: 'Peças de qualidade',
        description: 'Trabalhamos com peças confiáveis para as marcas mais comuns.',
      },
      {
        title: 'Financiamento flexível',
        description: 'Pague em parcelas com Addi ou Sistecrédito, ou com cartão pela Redeban.',
      },
      {
        title: 'Em Medellín',
        description: 'Fácil de visitar, resposta rápida pelo WhatsApp.',
      },
    ],
  },
  location: {
    eyebrow: 'Encontre-nos',
    title: 'Localização e horário',
    citySummary: 'Medellín, Colômbia',
    hoursTitle: 'Horário de atendimento',
    appointmentOnly: 'Somente com agendamento',
    appointmentNote:
      'Atendemos apenas com horário marcado. Fale conosco e encontramos o melhor horário para você.',
    appointmentCtaLabel: 'Solicitar horário pelo WhatsApp',
    appointmentWhatsappMessage: 'Olá, quero solicitar um horário na Pochy Motorbike.',
    mapCtaLabel: 'Ver no Google Maps',
    mapTitle: 'Mapa da Pochy Motorbike em Medellín',
  },
  finalCta: {
    title: 'Sua moto precisa de atenção?',
    subtitle: 'Fale conosco agora e respondemos pelo WhatsApp em minutos.',
    ctaLabel: 'Agendar pelo WhatsApp',
    whatsappMessage: 'Olá, quero agendar um horário na Pochy Motorbike.',
  },
  footer: {
    tagline: 'Oficina de motos e manutenção geral.',
    instagramLabel: 'Siga-nos no Instagram',
    whatsappLabel: 'Fale conosco no WhatsApp',
    rights: 'Todos os direitos reservados.',
  },
  whatsappFloat: {
    label: 'Agende seu horário',
  },
  languageToggle: {
    label: 'Idioma',
  },
};

const fr: Translations = {
  meta: {
    title: 'Atelier moto à Medellín | Pochy Motorbike',
    description:
      'Atelier moto à Belén, Medellín : entretien, freins, vidange et pièces. Financement avec Addi ou Sistecrédito. Rendez-vous sur WhatsApp.',
  },
  nav: {
    services: 'Services',
    whyUs: 'Pourquoi nous',
    location: 'Adresse',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Atelier moto · Medellín',
    title: 'Votre moto, entre des mains expertes.',
    subtitle:
      'Entretien général, diagnostic et pièces pour votre moto. Rapide, honnête et près de chez vous à Medellín.',
    ctaPrimary: 'Réserver sur WhatsApp',
    ctaSecondary: 'Voir les services',
    whatsappMessage: 'Bonjour, je souhaite réserver un entretien pour ma moto chez Pochy Motorbike.',
  },
  services: {
    eyebrow: 'Ce que nous faisons',
    title: 'Services',
    subtitle: 'Un entretien complet pour que votre moto ne vous lâche pas quand vous en avez le plus besoin.',
    ctaLabel: 'Demander un devis',
    items: [
      {
        title: 'Entretien général',
        description: 'Révision complète de votre moto : moteur, freins, suspension et plus.',
        whatsappMessage: 'Bonjour, je souhaite un devis pour *Entretien général*.',
      },
      {
        title: 'Vidange',
        description: "L'huile et le filtre adaptés à la marque et à l'usage de votre moto.",
        whatsappMessage: 'Bonjour, je souhaite un devis pour *Vidange*.',
      },
      {
        title: 'Freins',
        description: 'Remplacement des plaquettes et disques, réglage et contrôle du freinage.',
        whatsappMessage: 'Bonjour, je souhaite un devis pour *Freins*.',
      },
      {
        title: 'Diagnostic électrique',
        description: 'Batterie, éclairage, allumage et pannes électriques détectés à temps.',
        whatsappMessage: 'Bonjour, je souhaite un devis pour *Diagnostic électrique*.',
      },
      {
        title: 'Pièces détachées',
        description: 'Des pièces pour les marques et modèles les plus courants à Medellín.',
        whatsappMessage: 'Bonjour, je souhaite vérifier la disponibilité de *Pièces détachées*.',
      },
    ],
  },
  financing: {
    eyebrow: 'Financement',
    title: 'Entretenez votre moto, payez à votre rythme',
    description:
      "Financez l'entretien de votre moto avec Addi ou Sistecrédito et payez en plusieurs fois. Nous acceptons aussi les paiements par carte via Redeban.",
    gaugeLabel: 'Prêt à rouler',
    options: [
      {
        name: 'Addi',
        ctaLabel: 'Se renseigner sur Addi',
        whatsappMessage: "Bonjour, je souhaite plus d'informations pour financer mon entretien avec Addi.",
      },
      {
        name: 'Sistecrédito',
        ctaLabel: 'Se renseigner sur Sistecrédito',
        whatsappMessage: "Bonjour, je souhaite plus d'informations pour financer mon entretien avec Sistecrédito.",
      },
      {
        name: 'Redeban',
        ctaLabel: 'Payer avec Redeban',
        whatsappMessage: 'Bonjour, je souhaite payer mon service par carte via Redeban.',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Pourquoi nous choisir',
    title: 'Un atelier de confiance à Medellín',
    points: [
      {
        title: 'Service personnalisé',
        description: 'Nous vous expliquons ce dont votre moto a besoin, sans petites lignes ni surprises.',
      },
      {
        title: 'Pièces de qualité',
        description: 'Nous travaillons avec des pièces fiables pour les marques les plus courantes.',
      },
      {
        title: 'Financement flexible',
        description: 'Payez en plusieurs fois avec Addi ou Sistecrédito, ou par carte via Redeban.',
      },
      {
        title: 'Basés à Medellín',
        description: "Facile d'accès, réponse rapide sur WhatsApp.",
      },
    ],
  },
  location: {
    eyebrow: 'Nous trouver',
    title: 'Adresse et horaires',
    citySummary: 'Medellín, Colombie',
    hoursTitle: "Horaires d'accueil",
    appointmentOnly: 'Uniquement sur rendez-vous',
    appointmentNote:
      'Nous recevons uniquement sur rendez-vous. Écrivez-nous et nous trouverons le créneau qui vous convient.',
    appointmentCtaLabel: 'Demander un rendez-vous sur WhatsApp',
    appointmentWhatsappMessage: 'Bonjour, je souhaite demander un rendez-vous chez Pochy Motorbike.',
    mapCtaLabel: 'Voir sur Google Maps',
    mapTitle: 'Carte de Pochy Motorbike à Medellín',
  },
  finalCta: {
    title: "Votre moto a besoin d'attention ?",
    subtitle: 'Écrivez-nous maintenant, nous répondons sur WhatsApp en quelques minutes.',
    ctaLabel: 'Réserver sur WhatsApp',
    whatsappMessage: 'Bonjour, je souhaite prendre rendez-vous chez Pochy Motorbike.',
  },
  footer: {
    tagline: 'Atelier moto et entretien général.',
    instagramLabel: 'Suivez-nous sur Instagram',
    whatsappLabel: 'Écrivez-nous sur WhatsApp',
    rights: 'Tous droits réservés.',
  },
  whatsappFloat: {
    label: 'Prendre rendez-vous',
  },
  languageToggle: {
    label: 'Langue',
  },
};

export type Lang = 'es' | 'en' | 'pt' | 'fr';

export const DEFAULT_LANG: Lang = 'es';

export const LANGS: Lang[] = ['es', 'en', 'pt', 'fr'];

export const LANG_NAMES: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
};

export const OG_LOCALES: Record<Lang, string> = {
  es: 'es_CO',
  en: 'en_US',
  pt: 'pt_BR',
  fr: 'fr_FR',
};

/** The Spanish page lives at the root; every other language under its own prefix. */
export function langPath(lang: Lang): string {
  return lang === DEFAULT_LANG ? '/' : `/${lang}/`;
}

export const translations: Record<Lang, Translations> = { es, en, pt, fr };
