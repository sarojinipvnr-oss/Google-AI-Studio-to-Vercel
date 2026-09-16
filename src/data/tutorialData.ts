import { TutorialStep, PromptTemplate, TroubleshootingIssue, ChecklistItem, TerminalCommand } from '../types';

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'ai-studio',
    stepNumber: 1,
    title: 'Build with Google AI Studio',
    shortTitle: '1. AI Studio Prompting',
    tagline: 'Leverage Gemini 2.5/3 to craft complete web architectures from natural language.',
    duration: '5 mins',
    badge: 'AI Prompting',
    icon: 'Sparkles',
    summary: 'Master prompt engineering for web development: structure layouts, state requirements, and design tokens using Google AI Studio.'
  },
  {
    id: 'clean-code',
    stepNumber: 2,
    title: 'Generate Production-Ready Code',
    shortTitle: '2. Production Code',
    tagline: 'Structure semantic HTML5, modern Tailwind CSS, and resilient JavaScript.',
    duration: '4 mins',
    badge: 'Code Quality',
    icon: 'Code2',
    summary: 'Audit code for production standards: clean package scripts, relative asset paths, zero console warnings, and security-hardened keys.'
  },
  {
    id: 'github-push',
    stepNumber: 3,
    title: 'Push Project to GitHub',
    shortTitle: '3. Push to GitHub',
    tagline: 'Initialize Git, configure .gitignore, create a remote repo, and push your branch.',
    duration: '4 mins',
    badge: 'Version Control',
    icon: 'GitBranch',
    summary: 'Step-by-step terminal execution from git init to origin main, ensuring node_modules and env secrets are safely excluded.'
  },
  {
    id: 'vercel-connect',
    stepNumber: 4,
    title: 'Connect GitHub with Vercel',
    shortTitle: '4. Connect Vercel',
    tagline: 'Link your GitHub account to Vercel and import your repository in 1 click.',
    duration: '3 mins',
    badge: 'Cloud Linking',
    icon: 'CloudLightning',
    summary: 'Authorize Vercel, select the repository, verify the Vite/React preset, and configure environment variables securely.'
  },
  {
    id: 'free-deploy',
    stepNumber: 5,
    title: 'Deploy Your Website for Free',
    shortTitle: '5. Free Deployment',
    tagline: 'Launch globally on Vercel’s Edge Network with free SSL and zero server management.',
    duration: '2 mins',
    badge: 'Global Launch',
    icon: 'Rocket',
    summary: 'Hit deploy, inspect edge build logs, verify your .vercel.app domain, and link a custom domain with automated Let\'s Encrypt SSL.'
  },
  {
    id: 'automatic-cicd',
    stepNumber: 6,
    title: 'Update with Automatic Deployments',
    shortTitle: '6. Auto CI/CD',
    tagline: 'Push code changes to GitHub to instantly trigger zero-downtime updates.',
    duration: '3 mins',
    badge: 'Automated CI/CD',
    icon: 'RefreshCw',
    summary: 'Experience seamless CI/CD: branch previews for staging, automatic pull request preview links, and instant production rollbacks.'
  },
  {
    id: 'troubleshooting',
    stepNumber: 7,
    title: 'Common Deployment Issues & Fixes',
    shortTitle: '7. Troubleshooting',
    tagline: 'Instant solutions for SPA 404s, missing environment variables, and build errors.',
    duration: '6 mins',
    badge: 'Deployment Doctor',
    icon: 'ShieldAlert',
    summary: 'Diagnose and resolve the top 7 deployment blockers: vercel.json rewrites, build script missing dependencies, case sensitivity, and more.'
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'portfolio',
    title: 'Modern Developer Portfolio & Case Studies',
    category: 'Portfolio',
    description: 'Clean, minimalist developer portfolio with project showcases, experience timeline, tech badges, and contact modal.',
    tags: ['Tailwind CSS', 'Responsive', 'Light/Dark Theme', 'Projects Grid'],
    features: ['Sticky navigation with smooth scroll', 'Interactive project cards with modal previews', 'Skills pill matrix', 'Contact form with client-side validation'],
    promptText: `Act as a senior frontend engineer. Build a production-ready developer portfolio website using React and Tailwind CSS.
Requirements:
1. Navigation: Sticky blurred header with Logo, Projects, Experience, About, and 'Get in Touch' button.
2. Hero: High-impact display headline ('Building resilient web systems'), subtitle, status indicator ('Available for contracts'), and social links (GitHub, LinkedIn, X).
3. Projects Showcase: 4 curated projects with tag badges, live demo link, github repo link, and interactive preview modal.
4. Experience Timeline: Interactive work history showing role, company, metrics achieved, and stack used.
5. Tech Stack: Categorized skill chips (Languages, Frameworks, Cloud/DevOps).
6. Performance: 100% responsive, accessible WCAG AA contrast, clean semantic HTML5 markup, zero external dependencies that require API keys.`
  },
  {
    id: 'saas-landing',
    title: 'High-Converting SaaS Product Landing Page',
    category: 'SaaS Landing',
    description: 'Conversion-focused SaaS landing page with hero CTA, interactive feature tabs, pricing calculator, and FAQ accordion.',
    tags: ['SaaS', 'B2B', 'Pricing Table', 'Testimonials'],
    features: ['Announcement banner', 'Feature comparison matrix', 'Monthly/Annual billing toggle', 'Interactive FAQ accordion'],
    promptText: `Create a modern, high-converting SaaS landing page for an AI productivity tool called 'NexusFlow'.
Requirements:
1. Header: Sleek navbar with product features dropdown, pricing, customer stories, and dual CTAs ('Sign In' & 'Start Free Trial').
2. Hero Section: Compelling value proposition, dynamic pill badge ('New: v2.0 Released'), dual action buttons, and a mock dashboard preview graphic.
3. Social Proof: Animated ticker with trusted company logos and a 4.9/5 star rating banner.
4. Feature Deep Dive: 3 interactive tabs highlighting Automated Workflows, Real-time Collaboration, and Enterprise Security with preview stats.
5. Pricing Tier: Interactive Monthly vs Annual switcher (saving 20%), 3 tiered cards (Starter, Pro [Popular badge], Enterprise) with feature lists.
6. FAQ Section: Expandable accordion answering the 5 most common customer objections.
7. Footer: Organized 4-column links, newsletter signup, and copyright.`
  },
  {
    id: 'agency',
    title: 'Creative Digital Agency & Studio Showcase',
    category: 'Agency',
    description: 'Boutique design agency website with bold editorial typography, filterable client portfolio, and interactive service menu.',
    tags: ['Creative', 'Editorial Typography', 'Case Studies', 'Interactive'],
    features: ['Filterable portfolio grid', 'Client review carousel', 'Interactive scope/budget estimator', 'Full-bleed imagery'],
    promptText: `Build an editorial, high-end digital agency website called 'Kroma Studio'.
Requirements:
1. Aesthetic: Sophisticated minimalist aesthetic, warm slate neutrals, generous negative space, refined typography hierarchy.
2. Hero: Massive bold typography headline ('We craft digital products that redefine industry benchmarks') with a dynamic reel trigger.
3. Services Section: 4 core disciplines (Brand Strategy, Product Design, Full-Stack Engineering, AI Integration) with accordion details.
4. Filterable Works: Filter by 'All', 'Fintech', 'Health', 'AI', 'Consumer' with smooth state filtering and hover state reveals.
5. Client Testimonials: High-impact quotes with client name, photo avatar, and company metric (e.g., '+340% conversion growth').
6. Contact Drawer: Interactive project brief builder where clients select budget range, timeline, and deliverables.`
  },
  {
    id: 'dashboard',
    title: 'Web Analytics & Metrics Dashboard',
    category: 'Dashboard',
    description: 'Responsive operational dashboard with real-time stat cards, chart visualizers, transaction table, and search filters.',
    tags: ['Analytics', 'Charts', 'Filterable Table', 'Data Grid'],
    features: ['Quick metric cards with trend %', 'Time range filter (7D, 30D, 90D)', 'Searchable data table', 'Export CSV simulated trigger'],
    promptText: `Build a clean, responsive Analytics Dashboard web application using React and Tailwind CSS.
Requirements:
1. Layout: Collapsible sidebar navigation, top app bar with global search, notifications bell, and user avatar profile menu.
2. Top KPI Cards: 4 stat cards (Total Visitors, Conversion Rate, Monthly Recurring Revenue, Active Sessions) with percentage change pills (green positive / red negative).
3. Visual Charts: Interactive bar/line chart showing traffic over the past 30 days with time range selector buttons.
4. Data Table: Recent activity transactions with columns for Customer, Event, Date, Status pill (Completed, Pending, Failed), and Amount.
5. Functionality: Working search input that filters table rows, sortable table headers, and responsive mobile layout.`
  }
];

export const GIT_TERMINAL_STEPS: TerminalCommand[] = [
  {
    command: 'git init',
    output: 'Initialized empty Git repository in /project/.git/',
    explanation: 'Initializes a new Git tracking repository in your project folder.'
  },
  {
    command: 'git status',
    output: 'On branch main\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\t.gitignore\n\tpackage.json\n\tsrc/\n\tindex.html',
    explanation: 'Checks which files have been modified or are ready to be staged.'
  },
  {
    command: 'git add .',
    output: '',
    explanation: 'Stages all project files for the initial commit, respecting your .gitignore.'
  },
  {
    command: 'git commit -m "feat: initial website generated via Google AI Studio"',
    output: '[main (root-commit) a1b2c3d] feat: initial website generated via Google AI Studio\n 8 files changed, 420 insertions(+)\n create mode 100644 package.json\n create mode 100644 src/App.tsx',
    explanation: 'Saves your staged snapshot into local version history with a clear commit message.'
  },
  {
    command: 'git branch -M main',
    output: '',
    explanation: 'Ensures your primary branch is renamed to "main" (the standard default on GitHub).'
  },
  {
    command: 'git remote add origin https://github.com/YOUR_USERNAME/my-ai-website.git',
    output: '',
    explanation: 'Connects your local Git repo to the remote repository you created on GitHub.'
  },
  {
    command: 'git push -u origin main',
    output: 'Enumerating objects: 12, done.\nCounting objects: 100% (12/12), done.\nCompressing objects: 100% (10/10), done.\nWriting objects: 100% (12/12), 4.2 KiB | 4.2 MiB/s, done.\nTo https://github.com/YOUR_USERNAME/my-ai-website.git\n * [new branch]      main -> main\nBranch \'main\' set up to track remote branch \'main\' from \'origin\'.',
    explanation: 'Uploads your code to GitHub and configures default upstream tracking.'
  }
];

export const TROUBLESHOOTING_ISSUES: TroubleshootingIssue[] = [
  {
    id: 'spa-404-refresh',
    title: '404 Not Found on Route Refresh (SPA Routing)',
    category: 'Routing',
    symptom: 'The home page works, but refreshing any deep route like /about or /dashboard shows a Vercel 404 error.',
    cause: 'Vercel static hosting looks for actual files on disk (like /about/index.html). In a Single Page App (Vite/React), all routes must be rewritten to /index.html so the client router can handle them.',
    solution: 'Create a "vercel.json" configuration file in your project root with the SPA rewrite rule shown below, commit it, and push to GitHub.',
    fileName: 'vercel.json',
    codeSnippet: `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`,
    tags: ['404', 'SPA', 'React Router', 'vercel.json', 'Routing']
  },
  {
    id: 'vite-not-found',
    title: 'Build Failed: "vite: command not found"',
    category: 'Build',
    symptom: 'Vercel build logs show "sh: vite: command not found" or "npm run build exited with code 127".',
    cause: 'The "vite" dependency was placed in the wrong section or node_modules was not restored because package-lock.json had mismatching package definitions.',
    solution: 'Verify that "vite" is inside "devDependencies" or "dependencies" in package.json, and run "npm install" locally before committing package.json and package-lock.json.',
    fileName: 'package.json',
    codeSnippet: `"devDependencies": {
  "@vitejs/plugin-react": "^5.0.4",
  "typescript": "~5.8.2",
  "vite": "^6.2.3"
}`,
    tags: ['vite', 'build error', 'exit 127', 'package.json']
  },
  {
    id: 'env-var-missing',
    title: 'Blank Page / Missing Environment Variables in Client',
    category: 'Environment',
    symptom: 'Features fail with "undefined" or blank screen on the deployed URL, but work locally.',
    cause: 'In Vite, client-side environment variables MUST start with the "VITE_" prefix (e.g., VITE_APP_TITLE). Non-prefixed variables are stripped during build for security.',
    solution: 'Rename your public client variables to have the VITE_ prefix. Also add them to the Vercel Dashboard under Project Settings > Environment Variables.',
    fileName: '.env.example',
    codeSnippet: `# Correct (Vite client-accessible):
VITE_PUBLIC_API_URL="https://api.example.com"
VITE_SITE_NAME="My AI Website"

# Server-only (Do not expose to client bundle):
GEMINI_API_KEY="your-secret-key"`,
    tags: ['env', 'VITE_', 'API Key', 'undefined']
  },
  {
    id: 'case-sensitivity-linux',
    title: 'Module Not Found: Case Sensitivity Difference',
    category: 'Build',
    symptom: 'Build passes locally on macOS or Windows, but fails on Vercel with "Cannot find module ./components/header".',
    cause: 'macOS and Windows have case-insensitive file systems by default, while Vercel runs on Linux which is strictly case-sensitive (Header.tsx is different from header.tsx).',
    solution: 'Ensure your import statement matches the exact case on disk. If the file is Header.tsx, import from "./components/Header".',
    fileName: 'src/App.tsx',
    codeSnippet: `// ❌ Wrong (fails on Linux / Vercel):
import Header from './components/header';

//  Correct (exact case match):
import Header from './components/Header';`,
    tags: ['case sensitive', 'linux', 'module not found']
  },
  {
    id: 'git-remote-exists',
    title: 'Git Error: "fatal: remote origin already exists"',
    category: 'Git',
    symptom: 'Running "git remote add origin ..." gives fatal: remote origin already exists.',
    cause: 'A remote named "origin" was previously linked to this local folder.',
    solution: 'Update the existing remote URL using "git remote set-url origin <NEW_URL>" or verify with "git remote -v".',
    fileName: 'Terminal command',
    codeSnippet: `# Verify current remote:
git remote -v

# Update to your new repo:
git remote set-url origin https://github.com/YOUR_USERNAME/my-ai-website.git`,
    tags: ['git', 'remote origin', 'fatal error']
  },
  {
    id: 'output-directory-mismatch',
    title: '404 After Successful Build: Output Directory Mismatch',
    category: 'Vercel',
    symptom: 'Vercel build completes successfully in 15 seconds, but opening the deployed website shows a 404 or directory listing.',
    cause: 'Vercel is expecting the output in the wrong folder (e.g., looking for "build" instead of "dist", or looking for root index.html).',
    solution: 'In Vercel Project Settings > General > Build & Development Settings, verify that Output Directory is set to "dist" (for Vite) or "build" (for Create React App).',
    fileName: 'Project Settings',
    codeSnippet: `Build Command: npm run build
Output Directory: dist
Install Command: npm install`,
    tags: ['dist', 'output directory', 'build settings', '404']
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'check-1',
    category: 'AI Studio',
    title: 'Craft detailed prompt with layout & state requirements',
    description: 'Specify typography, responsive design, color tokens, and required functional interactions in Google AI Studio.',
    completed: true
  },
  {
    id: 'check-2',
    category: 'AI Studio',
    title: 'Iterate & test interactive components in AI Studio preview',
    description: 'Verify modals, buttons, forms, and responsive mobile views before exporting code.',
    completed: true
  },
  {
    id: 'check-3',
    category: 'Code Prep',
    title: 'Ensure package.json has working "build" and "dev" scripts',
    description: 'Build script should run "vite build" outputting to the "dist" folder.',
    completed: false
  },
  {
    id: 'check-4',
    category: 'Code Prep',
    title: 'Include a strict .gitignore file',
    description: 'Prevent node_modules, .env, and dist from being committed into Git.',
    completed: false
  },
  {
    id: 'check-5',
    category: 'GitHub',
    title: 'Initialize local Git repository and commit files',
    description: 'Run git init, git add ., and create your initial commit.',
    completed: false
  },
  {
    id: 'check-6',
    category: 'GitHub',
    title: 'Create a new repository on GitHub and push main branch',
    description: 'Add remote origin and execute git push -u origin main.',
    completed: false
  },
  {
    id: 'check-7',
    category: 'Vercel',
    title: 'Sign in to Vercel and Import Git Repository',
    description: 'Authorize GitHub access and select your new website repository.',
    completed: false
  },
  {
    id: 'check-8',
    category: 'Vercel',
    title: 'Verify Vite framework preset & environment variables',
    description: 'Check that output directory is "dist" and add any needed VITE_ variables.',
    completed: false
  },
  {
    id: 'check-9',
    category: 'Vercel',
    title: 'Deploy and test live production URL on desktop & mobile',
    description: 'Verify edge SSL certificate and test all navigation links on the .vercel.app domain.',
    completed: false
  },
  {
    id: 'check-10',
    category: 'Post-Launch',
    title: 'Test automatic CI/CD deployment via test commit',
    description: 'Push a quick text tweak to GitHub and watch Vercel deploy the update in under 30 seconds.',
    completed: false
  }
];

export const VERCEL_JSON_TEMPLATE = `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}`;

export const GITIGNORE_TEMPLATE = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production build output
dist/
build/
out/

# Environment variables & secrets
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor & OS files
.DS_Store
Thumbs.db
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
`;
