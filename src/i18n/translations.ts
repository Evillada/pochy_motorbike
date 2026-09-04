export interface ServiceItem {
  title: string;
  description: string;
  whatsappMessage: string;
}

export interface TrustPoint {
  title: string;
  description: string;
}

export interface HoursRow {
  label: string;
  value: string;
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
    ctaLabel: string;
    whatsappMessage: string;
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
    hours: HoursRow[];
    mapCtaLabel: string;
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
  languageToggle: {
    label: string;
  };
}

const es: Translations = {
  meta: {
    title: 'Pochy MotorBike | Taller de motos en Medellín',
    description:
      'Pochy MotorBike: taller de motos y mantenimientos generales en Medellín. Agenda tu cita por WhatsApp.',
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
    whatsappMessage: 'Hola, quiero agendar un servicio para mi moto en Pochy MotorBike.',
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
      'Pochy MotorBike tiene alianza con Addi: financia el mantenimiento de tu moto y paga en cuotas.',
    ctaLabel: 'Preguntar por Addi',
    whatsappMessage: 'Hola, quiero más información sobre financiar mi mantenimiento con Addi.',
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
        title: 'Financiación con Addi',
        description: 'Paga tu mantenimiento en cuotas cuando lo necesites.',
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
    hours: [
      { label: 'Lunes a viernes', value: '8:00 a.m. – 6:00 p.m.' },
      { label: 'Sábado', value: '8:00 a.m. – 1:00 p.m.' },
      { label: 'Domingo', value: 'Cerrado' },
    ],
    mapCtaLabel: 'Ver en Google Maps',
  },
  finalCta: {
    title: '¿Tu moto necesita atención?',
    subtitle: 'Escríbenos ahora y te respondemos por WhatsApp en minutos.',
    ctaLabel: 'Agendar por WhatsApp',
    whatsappMessage: 'Hola, quiero agendar una cita en Pochy MotorBike.',
  },
  footer: {
    tagline: 'Taller de motos y mantenimientos generales.',
    instagramLabel: 'Síguenos en Instagram',
    whatsappLabel: 'Escríbenos por WhatsApp',
    rights: 'Todos los derechos reservados.',
  },
  languageToggle: {
    label: 'Idioma',
  },
};

const en: Translations = {
  meta: {
    title: 'Pochy MotorBike | Motorcycle workshop in Medellín',
    description:
      'Pochy MotorBike: motorcycle workshop and general maintenance in Medellín. Book your appointment on WhatsApp.',
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
    whatsappMessage: "Hi, I'd like to book a service for my motorcycle at Pochy MotorBike.",
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
      "Pochy MotorBike partners with Addi: finance your motorcycle's maintenance and pay in installments.",
    ctaLabel: 'Ask about Addi',
    whatsappMessage: "Hi, I'd like more info about financing my maintenance with Addi.",
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
        title: 'Financing with Addi',
        description: 'Pay for your maintenance in installments whenever you need to.',
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
    hours: [
      { label: 'Monday to Friday', value: '8:00 am – 6:00 pm' },
      { label: 'Saturday', value: '8:00 am – 1:00 pm' },
      { label: 'Sunday', value: 'Closed' },
    ],
    mapCtaLabel: 'View on Google Maps',
  },
  finalCta: {
    title: 'Does your bike need attention?',
    subtitle: "Message us now and we'll reply on WhatsApp in minutes.",
    ctaLabel: 'Book on WhatsApp',
    whatsappMessage: "Hi, I'd like to book an appointment at Pochy MotorBike.",
  },
  footer: {
    tagline: 'Motorcycle workshop and general maintenance.',
    instagramLabel: 'Follow us on Instagram',
    whatsappLabel: 'Message us on WhatsApp',
    rights: 'All rights reserved.',
  },
  languageToggle: {
    label: 'Language',
  },
};

export type Lang = 'es' | 'en';

export const translations: Record<Lang, Translations> = { es, en };
