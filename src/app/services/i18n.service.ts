import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'es' | 'pt';

export interface Translations {
  role: string;
  bio: string;
  working: string;
  contractor: string;
  cards: {
    software: string;
    blog: string;
    linkedin: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    role: 'Front-End Software Engineer · UX/UI-minded product builder',
    bio: 'Building Digital Products with Good Usability.\nExperienced software engineer with human computer interaction research background.',
    working: 'Currently working as a Senior Software Engineer at',
    contractor: 'as a contractor via',
    cards: {
      software: 'Software Projects',
      blog: 'Blog',
      linkedin: 'LinkedIn',
    },
  },
  es: {
    role: 'Ingeniero de Software Front-End · Product builder con mirada de UI/UX',
    bio: 'Construyendo Productos Digitales con Buena Usabilidad.\nIngeniería de software con experiencia en investigación de interacción humano-computadora.',
    working: 'Actualmente trabajo como Ingeniero de Software Senior en',
    contractor: 'como contractor vía',
    cards: {
      software: 'Proyectos de Software',
      blog: 'Blog',
      linkedin: 'LinkedIn',
    },
  },
  pt: {
    role: 'Engenheiro de Software Front-End · Construtor de Produtos com noções de UI/UX',
    bio: 'Construindo Produtos Digitais com Boa Usabilidade.\nEngenheiro de software com experiência em pesquisa de interação humano-computador.',
    working: 'Atualmente trabalho como Engenheiro de Software Sênior na',
    contractor: 'como contractor pela',
    cards: {
      software: 'Projetos de Software',
      blog: 'Blog',
      linkedin: 'LinkedIn',
    },
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly activeLang = signal<Lang>('en');
  readonly t = computed(() => translations[this.activeLang()]);

  setLang(lang: Lang): void {
    this.activeLang.set(lang);
  }
}
