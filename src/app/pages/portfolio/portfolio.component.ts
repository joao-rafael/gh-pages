import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService, Lang } from '../../services/i18n.service';

interface Project {
  projectName: string;
  link: string;
  imgLink: string;
  description: Record<Lang, string>;
  tags: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  selectedTag = 'all';

  readonly projects: Project[] = [
    {
      projectName: 'ADP IHCM',
      link: 'https://uk.adp.com/what-we-offer/products/adp-ihcm.aspx',
      imgLink: './../assets/projects/adp.png',
      description: {
        en: 'Enterprise HR platform localized to 20+ languages, with frontend work focused on modular delivery, reusable components, and product experience improvements.',
        es: 'Plataforma empresarial de RR. HH. localizada a más de 20 idiomas, con trabajo frontend enfocado en entrega modular, componentes reutilizables y mejoras de experiencia.',
        pt: 'Plataforma corporativa de RH localizada em mais de 20 idiomas, com trabalho frontend focado em entrega modular, componentes reutilizáveis e melhorias de experiência.'
      },
      tags: ['Work', 'MFEs', 'Vanilla JS', 'TypeScript', 'Monorepo']
    },
    {
      projectName: 'Itaú WhatsApp Banking Central (internal project)',
      link: 'https://www.itau.com.br/atendimento-itau/para-voce/whatsapp-itau',
      imgLink: './../assets/projects/itau-wpp.png',
      description: {
        en: 'Internal banking messaging platform supporting guided service journeys for an audience of 80M+ potential message receivers.',
        es: 'Plataforma interna de mensajería bancaria para jornadas guiadas de atención, con una audiencia de más de 80M de potenciales receptores.',
        pt: 'Plataforma interna de mensageria bancária para jornadas guiadas de atendimento, com 80M+ potenciais destinatários.'
      },
      tags: ['Work', 'Angular', 'TypeScript', 'Monorepo']
    },
    {
      projectName: 'Mobi7 Localiza',
      link: 'https://www.mobi7.com.br',
      imgLink: './../assets/projects/mobi7.png',
      description: {
        en: 'Fleet and mobility telemetry work for 500K+ connected vehicles and 3K+ enterprise customers, connecting operations with data-rich workflows.',
        es: 'Trabajo de telemetría para flotas y movilidad con más de 500K vehículos conectados y 3K clientes empresariales.',
        pt: 'Trabalho de telemetria para frotas e mobilidade com 500K+ veículos conectados e 3K+ clientes empresariais.'
      },
      tags: ['Work', 'Angular', 'TypeScript', 'GraphQL']
    },
    {
      projectName: 'Itaú Mobile Banking App',
      link: 'https://www.itau.com.br/app-itau',
      imgLink: './../assets/projects/itau-app.png',
      description: {
        en: 'Mobile banking features delivered through hybrid app surfaces for a product with 100M+ downloads.',
        es: 'Funcionalidades de banca móvil entregadas en superficies híbridas para un producto con más de 100M descargas.',
        pt: 'Funcionalidades de banco mobile entregues em superfícies híbridas para um produto com 100M+ downloads.'
      },
      tags: ['Work', 'Mobile', 'Webview', 'React.js', 'TypeScript', 'Banking']
    },
    {
      projectName: 'Itaú Internet Banking App (Itaú empresas)',
      link: 'https://www.itau.com.br/canais-itau/itau-empresas-internet',
      imgLink: './../assets/projects/itau-pj.png',
      description: {
        en: 'Business banking web experience supporting secure financial workflows for 1.7M+ customers and potential users.',
        es: 'Experiencia web de banca empresarial para flujos financieros seguros, con más de 1.7M clientes y usuarios potenciales.',
        pt: 'Experiência web de banco empresarial para fluxos financeiros seguros, com 1.7M+ clientes e potenciais usuários.'
      },
      tags: ['Work', 'Web', 'Angular', 'TypeScript', 'Java', 'Banking']
    },
    {
      projectName: 'Hospital Nossa Senhora das Neves',
      link: 'https://hnsn.com.br',
      imgLink: './../assets/projects/hnsn.png',
      description: {
        en: 'Healthcare web presence shaped around service discovery, institutional content, and patient-facing access.',
        es: 'Presencia web de salud organizada alrededor de servicios, contenido institucional y acceso para pacientes.',
        pt: 'Presença web de saúde organizada em torno de serviços, conteúdo institucional e acesso para pacientes.'
      },
      tags: ['Work', 'Web', 'SPA', 'Vue.js', 'TypeScript']
    },
     {
      projectName: 'Samsung Sidia (Internal projects)',
      link: 'https://news.samsung.com/br/tag/sidia',
      imgLink: './../assets/projects/sidia.png',
      description: {
        en: 'Internal tools and product initiatives for research, operations, and engineering teams, serving 20K+ internal users.',
        es: 'Herramientas internas e iniciativas de producto para investigación, operaciones e ingeniería, con más de 20K usuarios internos.',
        pt: 'Ferramentas internas e iniciativas de produto para pesquisa, operações e engenharia, atendendo 20K+ usuários internos.'
      },
      tags: ['Work', 'Angular', 'React', 'TypeScript']
    },
    {
      projectName: 'Usability Prioritization System (Academic project)',
      link: 'https://sol.sbc.org.br/index.php/ihc/article/view/27563',
      imgLink: './../assets/projects/paper.png',
      description: {
        en: 'Academic usability project supporting evaluation decisions with structured criteria and research context.',
        es: 'Proyecto académico de usabilidad para apoyar decisiones de evaluación con criterios estructurados.',
        pt: 'Projeto acadêmico de usabilidade para apoiar decisões de avaliação com critérios estruturados.'
      },
      tags: ['Personal', 'Academic', 'Angular', 'TypeScript', 'Firebase', 'Scientific Article']
    },
    {
      projectName: 'Coding Bits (Personal blog)',
      link: 'https://codingbits.space',
      imgLink: './../assets/projects/blog.png',
      description: {
        en: 'Personal writing space for software engineering notes, frontend architecture, and product thinking.',
        es: 'Espacio personal de escritura sobre ingeniería de software, arquitectura frontend y producto.',
        pt: 'Espaço pessoal de escrita sobre engenharia de software, arquitetura frontend e produto.'
      },
      tags: ['Personal', 'React', 'Next.js', 'TypeScript']
    }, 
    {
      projectName: 'Autism Guide Crowdsourcing Platform (Personal project)',
      link: 'https://autismguide-crowd.web.app',
      imgLink: './../assets/projects/ag.png',
      description: {
        en: 'Crowdsourcing application for collecting and organizing autism-related accessibility guidelines.',
        es: 'Aplicación colaborativa para recopilar y organizar guías de accesibilidad relacionadas con autismo.',
        pt: 'Aplicação colaborativa para coletar e organizar diretrizes de acessibilidade relacionadas ao autismo.'
      },
      tags: ['Personal', 'Angular', 'TypeScript', 'Firebase']
    }
  ];

  constructor(public i18n: I18nService) {}

  get filterTags(): string[] {
    return ['Work', 'Personal'];
  }

  get filteredProjects(): Project[] {
    if (this.selectedTag === 'all') return this.projects;

    return this.projects.filter(project =>
      project.tags.some(tag => this.normalizeTag(tag) === this.selectedTag)
    );
  }

  projectDescription(project: Project): string {
    return project.description[this.i18n.activeLang()];
  }

  selectTag(tag: string): void {
    const normalizedTag = this.normalizeTag(tag);
    this.selectedTag = this.selectedTag === normalizedTag ? 'all' : normalizedTag;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTag === this.normalizeTag(tag);
  }

  displayTag(tag: string): string {
    const normalizedTag = this.normalizeTag(tag);
    const portfolioTags = this.i18n.t().portfolio.tags;

    if (normalizedTag === 'work') return portfolioTags.work;
    if (normalizedTag === 'personal') return portfolioTags.personal;
    if (normalizedTag === 'academic') return portfolioTags.academic;
    return tag;
  }

  private normalizeTag(tag: string): string {
    return tag.trim().toLowerCase();
  }
}
