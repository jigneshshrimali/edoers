/**
 * EDOERS Dynamic SEO & GEO Metadata Manager
 * Dynamically updates document title, meta description, Open Graph cards, Twitter cards,
 * canonical URLs, and JSON-LD structured data for every page view and case study detail page.
 */

import { ALL_PROJECTS } from './portfolio-data.js';

const BASE_URL = window.location.origin || 'https://edoers.com';

const DEFAULT_SEO = {
  title: 'EDOERS — End-to-end Digital Solutions Built for Impact',
  description: 'We design, develop, deploy and evolve intelligent digital products and platforms that drive innovation, efficiency and scalable growth.',
  keywords: 'EDOERS, software agency, AI agents, SaaS engineering, enterprise cloud, UI UX design, Ahmedabad India',
  ogImage: `${BASE_URL}/assets/og-preview.png`
};

const PAGE_METADATA = {
  home: {
    title: 'EDOERS — End-to-end Digital Solutions Built for Impact',
    description: 'Headquartered in Ahmedabad, EDOERS is an elite technology agency engineering AI agents, SaaS platforms, cloud infrastructure, and enterprise software.',
    keywords: 'EDOERS, digital solutions, AI automation, SaaS development, enterprise software, cloud devops, Ahmedabad tech firm',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  portfolio: {
    title: 'Featured Case Studies & Software Engineering Portfolio | EDOERS',
    description: 'Explore our portfolio of high-throughput fintech platforms, HIPAA-compliant medtech hubs, autonomous AI agents, and custom design systems.',
    keywords: 'EDOERS portfolio, case studies, software projects, fintech engineering, AI agents showcase, web app portfolio',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  services: {
    title: 'End-to-End Technology & Engineering Capabilities | EDOERS',
    description: 'Discover EDOERS capabilities: Autonomous AI Agents, SaaS Product Engineering, Enterprise Modernization, Cloud DevOps, Data Warehousing, and UI/UX Strategy.',
    keywords: 'AI agent development, SaaS engineering, cloud devops services, enterprise modernization, UI UX design agency',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  'service-detail': {
    title: 'AI & Cloud System Architecture Services | EDOERS',
    description: 'Deep-dive into EDOERS autonomous AI agent engineering, multi-agent orchestrations, cloud microservices, and high-concurrency event pipelines.',
    keywords: 'AI architecture services, microservice orchestration, agentic AI development, enterprise cloud migration',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  solutions: {
    title: 'Industry Vertical Solutions — Fintech, Medtech, Supply Chain | EDOERS',
    description: 'Tailored compliance-ready software architectures for Fintech, Healthcare, Supply Chain Telematics, EdTech, and E-Commerce.',
    keywords: 'Fintech platform development, HIPAA portal development, fleet telematics software, LMS virtual campus',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  about: {
    title: 'About Us & Engineering Leadership | EDOERS Tech Agency',
    description: 'Learn about EDOERS technology leadership, our 150+ globally delivered enterprise software milestones, and our headquarters in Ahmedabad, India.',
    keywords: 'About EDOERS, software team Ahmedabad, technology leadership, IT company prahlad nagar',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  careers: {
    title: 'Careers & Engineering Job Openings in Ahmedabad | EDOERS',
    description: 'Join our elite engineering team. We are hiring Full Stack Engineers, AI Automation Specialists, DevOps Architects, and UI/UX Designers.',
    keywords: 'EDOERS careers, software developer jobs ahmedabad, react node js jobs, AI engineer hiring',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  blog: {
    title: 'Engineering Perspectives, AI Architecture & Insights | EDOERS',
    description: 'In-depth technical articles, microservice architectural guides, and design thoughts written directly by EDOERS software architects.',
    keywords: 'AI agent architecture blog, microservice 99.99 uptime guide, UI UX design systems article, cloud cost optimization',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  contact: {
    title: 'Contact EDOERS | Start Your Next Software Engineering Sprint',
    description: 'Schedule a technical consultation with EDOERS software architects. Office located at Skyline Tower, Prahlad Nagar, Ahmedabad.',
    keywords: 'Contact EDOERS, hire software developers ahmedabad, tech consultation, project inquiry',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  },
  calculator: {
    title: 'Interactive Software Development ROI & Cost Calculator | EDOERS',
    description: 'Calculate instant cost estimates, team composition, and ROI timeline for your software engineering project or AI transformation.',
    keywords: 'Software development ROI calculator, app development cost estimator, AI project pricing model',
    ogImage: `${BASE_URL}/assets/og-preview.png`
  }
};

/**
 * Update document title, meta tags, Open Graph tags, Twitter cards, canonical link, and JSON-LD schema
 * @param {string} viewName - Current active view ID (e.g. 'home', 'services', 'portfolio-detail')
 * @param {string} [projectId] - Project ID if viewing a portfolio detail page
 */
export function updateSEO(viewName = 'home', projectId = null) {
  let meta = PAGE_METADATA[viewName] || DEFAULT_SEO;
  let currentUrl = `${BASE_URL}/#${viewName}`;

  // Handle dynamic Portfolio Detail view SEO
  if (viewName === 'portfolio-detail' || (viewName === 'portfolio' && projectId)) {
    const targetId = projectId || 'nexora-banking';
    const project = ALL_PROJECTS.find(p => p.id === targetId);
    if (project) {
      meta = {
        title: `${project.title} — Case Study & Architecture | EDOERS`,
        description: `${project.tagline} Engineered with ${project.techStack.slice(0, 3).join(', ')}. ${project.overview.slice(0, 130)}...`,
        keywords: `${project.title}, ${project.clientCategory}, ${project.techStack.join(', ')}, EDOERS case study`,
        ogImage: project.heroBannerImg || DEFAULT_SEO.ogImage
      };
      currentUrl = `${BASE_URL}/#portfolio-detail?id=${targetId}`;
    }
  }

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Helper function to set or create meta tags
  const setMeta = (selector, content) => {
    if (!content) return;
    let el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    } else {
      el = document.createElement('meta');
      if (selector.includes('property=')) {
        const prop = selector.match(/property="([^"]+)"/)?.[1];
        if (prop) el.setAttribute('property', prop);
      } else if (selector.includes('name=')) {
        const name = selector.match(/name="([^"]+)"/)?.[1];
        if (name) el.setAttribute('name', name);
      }
      el.setAttribute('content', content);
      document.head.appendChild(el);
    }
  };

  // Standard Meta Tags
  setMeta('meta[name="title"]', meta.title);
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[name="keywords"]', meta.keywords || DEFAULT_SEO.keywords);
  setMeta('meta[name="robots"]', 'index, follow');

  // Open Graph Protocol
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:url"]', currentUrl);
  setMeta('meta[property="og:image"]', meta.ogImage || DEFAULT_SEO.ogImage);
  setMeta('meta[property="og:type"]', viewName === 'blog' ? 'article' : 'website');
  setMeta('meta[property="og:site_name"]', 'EDOERS Technologies');

  // Twitter Card
  setMeta('meta[property="twitter:card"]', 'summary_large_image');
  setMeta('meta[property="twitter:title"]', meta.title);
  setMeta('meta[property="twitter:description"]', meta.description);
  setMeta('meta[property="twitter:url"]', currentUrl);
  setMeta('meta[property="twitter:image"]', meta.ogImage || DEFAULT_SEO.ogImage);

  // 3. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', currentUrl);

  // 4. Dynamically Inject / Update JSON-LD Structured Data Schema
  updateJsonLdSchema(viewName, meta, currentUrl, projectId);
}

/**
 * Generate and inject appropriate JSON-LD structured data schema based on view context
 */
function updateJsonLdSchema(viewName, meta, currentUrl, projectId) {
  let schemaScript = document.getElementById('json-ld-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'json-ld-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    'name': 'EDOERS Technologies Pvt. Ltd.',
    'url': BASE_URL,
    'logo': `${BASE_URL}/assets/logo.png`,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-98765-43210',
      'contactType': 'customer support',
      'email': 'hello@edoers.com',
      'areaServed': 'Worldwide'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Skyline Tower, Prahlad Nagar',
      'addressLocality': 'Ahmedabad',
      'addressRegion': 'Gujarat',
      'postalCode': '380015',
      'addressCountry': 'IN'
    },
    'sameAs': [
      'https://linkedin.com/company/edoers',
      'https://twitter.com/edoers',
      'https://github.com/edoers'
    ]
  };

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': currentUrl,
    'url': currentUrl,
    'name': meta.title,
    'description': meta.description,
    'isPartOf': {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      'name': 'EDOERS Technologies',
      'url': BASE_URL
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${BASE_URL}/#home`
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': viewName.replace('-', ' ').toUpperCase(),
          'item': currentUrl
        }
      ]
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, webPageSchema]
  };

  // Enhance schema for specific views
  if ((viewName === 'portfolio-detail' || viewName === 'portfolio') && projectId) {
    const project = ALL_PROJECTS.find(p => p.id === projectId);
    if (project) {
      schemaData['@graph'].push({
        '@type': 'SoftwareApplication',
        'name': project.title,
        'description': project.overview,
        'applicationCategory': project.categoryLabel || 'BusinessApplication',
        'operatingSystem': 'Web, Cloud, iOS, Android',
        'author': { '@id': `${BASE_URL}/#organization` },
        'image': project.heroBannerImg || DEFAULT_SEO.ogImage
      });
    }
  } else if (viewName === 'services' || viewName === 'service-detail') {
    schemaData['@graph'].push({
      '@type': 'Service',
      'serviceType': 'Software, AI & Cloud System Architecture',
      'provider': { '@id': `${BASE_URL}/#organization` },
      'areaServed': 'Worldwide',
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'EDOERS Engineering Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Autonomous AI Agents & Orchestration' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'SaaS Product Development' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Cloud Native & Microservices' } }
        ]
      }
    });
  } else if (viewName === 'careers') {
    schemaData['@graph'].push({
      '@type': 'ItemList',
      'name': 'Engineering Job Openings at EDOERS',
      'itemListElement': [
        { '@type': 'JobPosting', 'title': 'Senior Full Stack AI Engineer', 'jobLocation': { '@type': 'Place', 'address': 'Ahmedabad, India' } },
        { '@type': 'JobPosting', 'title': 'Lead Cloud DevOps Architect', 'jobLocation': { '@type': 'Place', 'address': 'Ahmedabad, India' } }
      ]
    });
  } else if (viewName === 'contact') {
    schemaData['@graph'].push({
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/#contact`,
      'mainEntity': organizationSchema
    });
  } else if (viewName === 'calculator') {
    schemaData['@graph'].push({
      '@type': 'WebApplication',
      'name': 'EDOERS Software Development ROI Calculator',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All'
    });
  }

  schemaScript.textContent = JSON.stringify(schemaData, null, 2);
}

