export interface Project {
  id: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  image: string;
  liveUrl?: string;
  tags: string[];
  highlights: string[];
  demoType: 'biometric' | 'wireshark' | 'cad' | 'workmint' | 'attendly';
  metrics: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  technologies: string[];
  domain: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; note: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: 'EC-Council Certified Candidate (Currently Learning)' | 'Currently Learning' | 'In Progress' | 'Certified';
  period: string;
  description: string;
  image: string;
  skillsLearned: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Aakash Gupta',
    title: 'Full-Stack Software Engineer & Cybersecurity Practitioner',
    headline: 'Engineering scalable cloud web applications, telecom network diagnostics & offensive/defensive security architectures',
    location: 'Delhi NCR, India',
    phone: '+91 7303267461',
    email: 'aakashgupta2054@gmail.com',
    github: 'https://github.com/aakashgupta2054',
    githubUser: 'aakashgupta2054',
    instagram: 'https://instagram.com/aakashgupta2054',
    instagramUser: 'aakashgupta2054',
    avatar: '/src/assets/images/hero_akash_cyber_1792272091341.jpg',
    objective:
      'Full-Stack Software Developer with a B.Tech in Computer Science and hands-on experience across Python/Django, modern web architectures, network operations, customer communication, and mechanical design. EC-Council Certified Candidate (Currently Learning CEH v12) mastering penetration testing, network defense, and application security. Skilled in building reliable production web applications, progressive web apps (PWAs), and scalable automation with Google AI Studio.',
    education: {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Sanskriti University',
      period: '2019 - 2023',
      grade: 'First Division (68%)',
    },
    certification: {
      id: 'cert-ceh',
      title: 'Certified Ethical Hacker (CEH v12)',
      issuer: 'EC-Council',
      status: 'EC-Council Certified Candidate (Currently Learning)' as const,
      period: 'EC-Council Certified Candidate (Currently Learning)',
      description:
        'EC-Council Certified Candidate currently learning ethical hacking methodologies and defensive security, covering network penetration testing, Wireshark packet stream security analysis, web application vulnerabilities (OWASP Top 10), footprinting, perimeter defense, and vulnerability triage.',
      image: '/src/assets/images/cert_ceh_cybersecurity_1792273372442.jpg',
      skillsLearned: [
        'Ethical Hacking & Penetration Testing',
        'Wireshark Deep Packet Inspection',
        'Vulnerability Assessment & OWASP Top 10',
        'Network Defense & Incident Response',
        'Firewall & IDS/IPS Configuration',
        'Threat Modeling & Secure Code Practices',
      ],
    },
    languages: ['English', 'Hindi'],
    kpis: [
      { value: 'Production', label: 'Deployed Apps', detail: 'WorkMint & Attendly live on Vercel' },
      { value: 'CEH Track', label: 'EC-Council', detail: 'EC-Council Candidate (Currently Learning)' },
      { value: 'Tier-1', label: 'Network Operations', detail: 'Reliance Jio LAN/WAN & Wireshark triage' },
      { value: 'Full-Stack', label: 'Python & React', detail: 'Django, PWAs, Biometrics & SQLite/MySQL' },
    ],
  },

  projects: [
    {
      id: 'workmint-saas',
      title: 'WorkMint — Attendance & Payroll Management SaaS',
      role: 'Full-Stack Creator & Lead Engineer',
      organization: 'Independent Production Project',
      period: 'Live Application',
      description:
        'A comprehensive workforce platform featuring employee attendance tracking, automated payroll calculations, shift calendar scheduling, offline caching with cloud synchronization, and real-time management analytics.',
      image: '/src/assets/images/project_workmint_1792273373820.jpg',
      liveUrl: 'https://workmints.vercel.app/',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Cloud Sync', 'Payroll Engine', 'PWA Offline'],
      demoType: 'workmint',
      metrics: [
        { label: 'Status', value: 'Live on Vercel' },
        { label: 'Cloud Sync', value: 'Instant & Offline' },
        { label: 'Modules', value: 'Attendance & Payroll' },
      ],
      highlights: [
        'Built full shift management calendar supporting day, evening, and night workforce scheduling.',
        'Engineered payroll calculation engine computing salaries, deductions, taxes, and net disbursements.',
        'Implemented cloud synchronization with offline queueing for uninterrupted field usage.',
        'Designed high-contrast cyber dark dashboard with punctuality rate graphs and staff attendance logs.',
      ],
    },
    {
      id: 'attendly-pwa',
      title: 'Attendly — Modern Attendance Tracker PWA',
      role: 'Full-Stack Developer & Creator',
      organization: 'Independent Production Project',
      period: 'Live Application',
      description:
        'A sleek mobile-first Progressive Web App (PWA) designed for tracking student and subject attendance with interactive calendar grids, customized percentage target dials, and performance analytics.',
      image: '/src/assets/images/project_attendly_1792273371586.jpg',
      liveUrl: 'https://attendly-bay.vercel.app/',
      tags: ['PWA', 'React', 'Mobile First', 'Calendar Matrix', 'Target Dials', 'Local/Cloud Store'],
      demoType: 'attendly',
      metrics: [
        { label: 'Platform', value: 'PWA Web & Mobile' },
        { label: 'Status', value: 'Live on Vercel' },
        { label: 'Analytics', value: 'Goal Target Dials' },
      ],
      highlights: [
        'Crafted responsive calendar grid interface with instant present/absent state toggles.',
        'Configured percentage goal dials helping students maintain 75%+ or 90%+ attendance thresholds.',
        'Engineered installable PWA manifest with mobile app icon support and app-shell caching.',
        'Delivered class-by-class attendance breakdown with automated weekly performance metrics.',
      ],
    },
    {
      id: 'school-management-system',
      title: 'School Management Web Application with Biometrics',
      role: 'Full-Stack Software Engineer',
      organization: 'View My Records',
      period: 'Sep 2023 - Feb 2024',
      description:
        'Engineered an enterprise-grade School Management Web Application using Python, Django, SQLite, and AJAX. Designed an anti-proxy attendance system integrating camera face verification and geolocation tracking, coupled with automated examination grading and export systems.',
      image: '/src/assets/images/project_school_ai_1792272092079.jpg',
      tags: ['Python', 'Django', 'SQLite', 'Face Verification', 'Geolocation', 'AJAX', 'jQuery'],
      demoType: 'biometric',
      metrics: [
        { label: 'Proxy Rate', value: '0%' },
        { label: 'Export Support', value: 'PDF & Excel' },
        { label: 'Architecture', value: 'Django + AJAX' },
      ],
      highlights: [
        'Built camera-based biometric face verification combined with location coordinate checks to eliminate proxy attendance.',
        'Engineered automated Examination & Result Module for rapid marks calculation, grading, and dynamic report card generation.',
        'Implemented instant PDF and Excel exports for bulk attendance records and academic performance analytics.',
        'Integrated a full-featured Helpdesk ticket system within Django for multi-tier support workflows.',
      ],
    },
    {
      id: 'network-operations-wireshark',
      title: 'Telecom Network Operations & Wireshark Diagnostics',
      role: 'Assistant Manager (SDA Engineer)',
      organization: 'Reliance Jio Infocomm Ltd',
      period: 'Feb 2024 - Aug 2025',
      description:
        'Conducted deep LAN/WAN troubleshooting and high-stakes network diagnostics for enterprise and residential internet infrastructure. Performed deep packet inspections using Wireshark to isolate transmission bottlenecks and ensure zero-downtime SLA compliance.',
      image: '/src/assets/images/project_wireshark_telemetry_1792272093518.jpg',
      tags: ['LAN/WAN', 'Wireshark', 'Packet Analysis', 'Network Routing', 'BI Tools', 'SharePoint'],
      demoType: 'wireshark',
      metrics: [
        { label: 'Network Scope', value: 'LAN & WAN' },
        { label: 'Analysis Tool', value: 'Wireshark' },
        { label: 'SDA Operations', value: 'Mysore Region' },
      ],
      highlights: [
        'Performed packet-level traffic captures and deep protocol analysis in Wireshark to resolve stubborn TCP retransmission and DNS drops.',
        'Conducted physical and logical site readiness surveys prior to FTTH/enterprise network deployment.',
        'Dispatched on-ground field engineers, monitored issue resolution lifecycles, and maintained daily status BI trackers.',
        'Handled high-priority customer calls and authored executive email briefs for cross-functional alignment.',
      ],
    },
    {
      id: 'railway-cad-engineering',
      title: 'Indian Railway Engine 2D/3D CAD Modeling',
      role: 'Mechanical Design Engineer',
      organization: 'Saficon Fab System Pvt Ltd',
      period: 'Sep 2025 - Sep 2026',
      description:
        'Drafted manufacturing-grade 2D component drawings and high-fidelity 3D CAD assemblies for Indian Railway locomotive engines utilizing AutoCAD and SolidWorks, adhering strictly to national railway safety tolerances.',
      image: '/src/assets/images/project_cad_railway_1792272092788.jpg',
      tags: ['AutoCAD', 'SolidWorks', '3D Modeling', 'Indian Railways', 'Manufacturing Specs'],
      demoType: 'cad',
      metrics: [
        { label: 'Standard', value: 'Indian Railway' },
        { label: 'Drafting Tools', value: 'AutoCAD / SolidWorks' },
        { label: 'Precision', value: 'Manufacturing Ready' },
      ],
      highlights: [
        'Designed detailed 2D engineering schematics and 3D parametric CAD models of heavy locomotive engine assemblies.',
        'Ensured full compliance with Indian Railway mechanical tolerances and fabrication standards.',
        'Authored professional technical documentation and managed technical coordination with external vendors and client teams.',
      ],
    },
  ] as Project[],

  experiences: [
    {
      id: 'exp-fullstack',
      role: 'Full-Stack Software Engineer & App Creator',
      company: 'Production Web Applications (WorkMint & Attendly)',
      location: 'India',
      period: '2024 - Present',
      domain: 'SaaS Architecture & PWA Engineering',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'PWA', 'Cloud Sync', 'Offline Storage'],
      highlights: [
        'Architected and deployed WorkMint (workmints.vercel.app), a cloud-synced workforce attendance and payroll management SaaS.',
        'Designed and published Attendly (attendly-bay.vercel.app), a responsive PWA attendance tracker with calendar matrix and goal tracking.',
        'Implemented modern offline-first data caching and optimized Lighthouse performance metrics.',
      ],
    },
    {
      id: 'exp-saficon',
      role: 'Mechanical Design Engineer',
      company: 'Saficon Fab System Pvt Ltd',
      location: 'India',
      period: 'Sep 2025 - Sep 2026',
      domain: 'Industrial CAD & Precision Engineering',
      technologies: ['AutoCAD', 'SolidWorks', '3D Modeling', 'Manufacturing Specs', 'Technical Communication'],
      highlights: [
        'Prepared 2D drawings and 3D models of Indian Railway engine parts using AutoCAD and SolidWorks.',
        'Developed accurate, manufacturing-ready part drawings meeting railway specifications and standards.',
        'Wrote clear professional emails and handled customer calls to share updates and resolve queries.',
      ],
    },
    {
      id: 'exp-jio',
      role: 'Assistant Manager (SDA Engineer)',
      company: 'Reliance Jio Infocomm Ltd',
      location: 'Mysore, India',
      period: 'Feb 2024 - Aug 2025',
      domain: 'Telecommunications & Network Infrastructure',
      technologies: ['Wireshark', 'LAN/WAN', 'TCP/IP', 'Excel & BI Tools', 'SharePoint', 'Field Ops Dispatch'],
      highlights: [
        'Performed network troubleshooting for LAN/WAN connectivity issues, ensuring stable and reliable internet delivery.',
        'Used Wireshark for packet-level analysis to diagnose and resolve network connectivity problems.',
        'Coordinated with cross-functional teams to ensure smooth delivery of new internet connections.',
        'Conducted site surveys and inspections to assess network readiness before deployment.',
        'Maintained accurate daily reports and trackers using Excel and BI tools.',
        'Handled customer calls and wrote professional emails to customers, sales teams and internal departments for updates and issue resolution.',
        'Dispatched field engineers for technical support and ensured timely closure of issues.',
        'Utilized SharePoint for documentation and project status updates; escalated delays and provided progress reports to stakeholders.',
      ],
    },
    {
      id: 'exp-vmr',
      role: 'Software Engineer',
      company: 'View My Records',
      location: 'Bangalore, India',
      period: 'Sep 2023 - Feb 2024',
      domain: 'Web Application Development & AI',
      technologies: ['Python', 'Django', 'SQLite', 'JavaScript', 'jQuery', 'AJAX', 'Biometrics API', 'HTML/CSS'],
      highlights: [
        'Designed and developed a School Management Web Application using Python, Django, SQLite, HTML, CSS, jQuery and AJAX.',
        'Built an Attendance Module with face verification via camera and location tracking to prevent proxy attendance.',
        'Implemented Examination and Result Module for marks entry, automated result generation and report cards.',
        'Enabled PDF/Excel export of results, attendance and performance reports.',
        'Developed an integrated Helpdesk System in Django for support ticket management.',
      ],
    },
  ] as Experience[],

  skillCategories: [
    {
      title: 'Full-Stack Software Development',
      skills: [
        { name: 'React & TypeScript', level: 92, note: 'Production SPAs, hooks, state machines, component architecture' },
        { name: 'Python & Django', level: 90, note: 'MVC architecture, ORM, REST endpoints, backend automation' },
        { name: 'PWA Engineering', level: 88, note: 'Offline service workers, web manifests, responsive mobile UX' },
        { name: 'JavaScript (ES6+)', level: 88, note: 'DOM pipelines, asynchronous hydration, modern syntax' },
        { name: 'HTML5 & Tailwind CSS', level: 94, note: 'Cyber aesthetic layouts, semantic markup, responsive design' },
        { name: 'Google AI Studio', level: 90, note: 'Prompt architecture, rapid multimodal prototyping, AI acceleration' },
      ],
    },
    {
      title: 'Cybersecurity & Ethical Hacking (CEH Track)',
      skills: [
        { name: 'CEH by EC-Council', level: 85, note: 'Active learning: penetration testing, network reconnaissance, attack vectors' },
        { name: 'Wireshark Packet Analysis', level: 92, note: 'Deep packet inspection, pcap traffic analysis, TCP handshake anomaly triage' },
        { name: 'Network Defense & Firewalls', level: 86, note: 'Port scanning defenses, IDS/IPS concepts, traffic filtering' },
        { name: 'Web App Security (OWASP)', level: 84, note: 'CSRF, XSS prevention, SQL injection defense, authentication security' },
      ],
    },
    {
      title: 'Databases & Cloud Deployments',
      skills: [
        { name: 'Vercel Deployment', level: 92, note: 'CI/CD pipeline, edge functions, production DNS routing' },
        { name: 'SQLite', level: 90, note: 'Relational schema design, lightweight embedded databases' },
        { name: 'MySQL', level: 85, note: 'Relational queries, index optimization, multi-table joins' },
        { name: 'Cloud Sync & Offline Store', level: 88, note: 'Client-side IndexedDB/localStorage sync queue' },
      ],
    },
    {
      title: 'Networking & Telecommunications',
      skills: [
        { name: 'LAN/WAN Operations', level: 90, note: 'Routing, subnetting, switch configuration, line loss triage' },
        { name: 'Network Connectivity', level: 91, note: 'DNS resolution, gateway pings, ISP uptime troubleshooting' },
        { name: 'Telecom Field Operations', level: 88, note: 'Dispatching field engineers, site survey assessments' },
      ],
    },
    {
      title: 'CAD & Engineering Modeling',
      skills: [
        { name: 'AutoCAD', level: 85, note: '2D mechanical drafting, railway component dimensioning' },
        { name: 'SolidWorks', level: 84, note: '3D parametric solid modeling, assembly constraints' },
        { name: 'Engineering Specs', level: 87, note: 'Indian Railway standards, tolerance calculations' },
      ],
    },
    {
      title: 'Professional Communication & Operations',
      skills: [
        { name: 'Executive Email Writing', level: 95, note: 'High-clarity stakeholder briefs, customer issue resolutions' },
        { name: 'Customer Call Handling', level: 92, note: 'Technical escalation resolution, client de-escalation' },
        { name: 'Cross-functional Collaboration', level: 93, note: 'Coordinating field technicians, developers & management' },
        { name: 'SharePoint & BI Reporting', level: 88, note: 'Operational trackers, trend analysis, management dashboards' },
      ],
    },
  ] as SkillCategory[],
};
