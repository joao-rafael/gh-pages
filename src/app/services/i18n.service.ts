import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'es' | 'pt';

export interface Translations {
  role: string;
  profileAlt: string;
  bio: string;
  working: string;
  contractor: string;
  controls: {
    languageSelector: string;
    switchLanguage: string;
    colorSelector: string;
    useColorTheme: string;
    switchToDarkTheme: string;
    switchToLightTheme: string;
    openNewTab: string;
  };
  portfolio: {
    back: string;
    title: string;
    intro: string;
    disclaimer: string;
    aria: string;
    filterAria: string;
    tagsAria: string;
    tags: {
      work: string;
      personal: string;
      academic: string;
    };
  };
  cards: {
    software: string;
    blog: string;
    linkedin: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    role: 'Front-End Software Engineer · HCI-minded product builder',
    profileAlt: 'Photo of João Rafael Silva',
    bio: 'Building Digital Products with Good Usability.\nExperienced software engineer with human computer interaction research background.',
    working: 'Currently working as a Senior Software Engineer at',
    contractor: 'as a contractor via',
    controls: {
      languageSelector: 'Language selector',
      switchLanguage: 'Switch to {lang}',
      colorSelector: 'Accent color selector',
      useColorTheme: 'Use this accent color and randomize the background animation',
      switchToDarkTheme: 'Switch to dark theme',
      switchToLightTheme: 'Switch to light theme',
      openNewTab: 'opens in a new tab',
    },
    portfolio: {
      back: 'Home',
      title: 'Portfolio',
      intro: 'Some of my software projects and product work.',
      disclaimer: 'Projects tagged as Work are the property of their respective companies, with all rights reserved. I contributed to them while working with or for those companies.',
      aria: 'Software projects',
      filterAria: 'Project filters',
      tagsAria: 'Project tags',
      tags: {
        work: 'Work',
        personal: 'Personal',
        academic: 'Academic',
      },
    },
    cards: {
      software: 'Software Projects',
      blog: 'Blog',
      linkedin: 'LinkedIn',
    },
  },
  es: {
    role: 'Ingeniero de Software Front-End · Product builder con mirada de HCI',
    profileAlt: 'Foto de João Rafael Silva',
    bio: 'Construyendo Productos Digitales con Buena Usabilidad.\nIngeniería de software con experiencia en investigación de interacción humano-computadora.',
    working: 'Actualmente trabajo como Ingeniero de Software Senior en',
    contractor: 'como contractor vía',
    controls: {
      languageSelector: 'Selector de idioma',
      switchLanguage: 'Cambiar a {lang}',
      colorSelector: 'Selector de color de acento',
      useColorTheme: 'Usar este color de acento y aleatorizar la animación de fondo',
      switchToDarkTheme: 'Cambiar al tema oscuro',
      switchToLightTheme: 'Cambiar al tema claro',
      openNewTab: 'abre en una nueva pestaña',
    },
    portfolio: {
      back: 'Inicio',
      title: 'Portafolio',
      intro: 'Algunos de mis proyectos de software y trabajos de producto.',
      disclaimer: 'Los proyectos marcados como Trabajo son propiedad de sus respectivas empresas, con todos los derechos reservados. Colaboré en ellos mientras trabajaba con o para esas empresas.',
      aria: 'Proyectos de software',
      filterAria: 'Filtros de proyectos',
      tagsAria: 'Etiquetas del proyecto',
      tags: {
        work: 'Trabajo',
        personal: 'Personal',
        academic: 'Académico',
      },
    },
    cards: {
      software: 'Proyectos de Software',
      blog: 'Blog',
      linkedin: 'LinkedIn',
    },
  },
  pt: {
    role: 'Engenheiro de Software Front-End · Construtor de produtos com noções de IHC',
    profileAlt: 'Foto de João Rafael Silva',
    bio: 'Construindo Produtos Digitais com Boa Usabilidade.\nEngenheiro de software com experiência em pesquisa de interação humano-computador.',
    working: 'Atualmente trabalho como Engenheiro de Software Sênior na',
    contractor: 'como contractor pela',
    controls: {
      languageSelector: 'Seletor de idioma',
      switchLanguage: 'Mudar para {lang}',
      colorSelector: 'Seletor de cor de destaque',
      useColorTheme: 'Usar esta cor de destaque e sortear a animação de fundo',
      switchToDarkTheme: 'Mudar para o tema escuro',
      switchToLightTheme: 'Mudar para o tema claro',
      openNewTab: 'abre em uma nova aba',
    },
    portfolio: {
      back: 'Início',
      title: 'Portfólio',
      intro: 'Alguns dos meus projetos de software e trabalhos de produto.',
      disclaimer: 'Projetos marcados como Trabalho são propriedade das suas respectivas empresas, com todos os direitos reservados. Eu colaborei neles enquanto trabalhava com ou para essas empresas.',
      aria: 'Projetos de software',
      filterAria: 'Filtros de projetos',
      tagsAria: 'Tags do projeto',
      tags: {
        work: 'Trabalho',
        personal: 'Pessoal',
        academic: 'Acadêmico',
      },
    },
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
