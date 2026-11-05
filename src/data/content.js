export const profile = {
  firstName: 'Sri Vishnu',
  lastName: 'Paruchuru',
  role: 'B.Tech Computer Science & Engineering',
  location: 'Bengaluru, India',
  tagline: 'BUILDING DIGITAL SOLUTIONS FOR REAL-WORLD PROBLEMS.',
  email: 'srivishnuparuchuru@gmail.com',
  phone: '9063641710',
  linkedin: 'https://linkedin.com/in/srivishnu17',
  github: 'https://github.com/srivishnuu17',
  bio: 'I am a B.Tech Computer Science & Engineering student at JAIN (Deemed-to-be University), Bengaluru, focused on building practical digital solutions through programming, web development, and data-driven thinking.',
  identities: ['Computer Science', 'Developer', 'Builder'],
}

export const skills = {
  Languages: ['C', 'Python', 'Java'],
  Tools: ['Codex', 'Antigravity'],
  'Frameworks & Backend': ['Supabase', 'FastAPI'],
  Deployment: ['Vercel'],
}

export const techNodes = [
  { name: 'C', category: 'Language', context: 'Programming fundamentals and systems thinking' },
  { name: 'Python', category: 'Language', context: 'Scripting, backend development, and problem solving' },
  { name: 'Java', category: 'Language', context: 'Object-oriented programming' },
  { name: 'Codex', category: 'Tool', context: 'AI-assisted coding and development workflow' },
  { name: 'Antigravity', category: 'Tool', context: 'AI-powered development environment' },
  { name: 'Supabase', category: 'Frameworks & Backend', context: 'Backend services and application data' },
  { name: 'FastAPI', category: 'Frameworks & Backend', context: 'Building Python APIs' },
  { name: 'Vercel', category: 'Deployment', context: 'Deploying projects to the web' },
]

export const projects = [
  {
    id: '01',
    code: 'MEALLOCK',
    title: 'MealLock',
    subtitle: 'Food Waste Reduction Platform',
    description:
      'A web platform designed to reduce food wastage in PGs and hostels through meal planning and resident participation.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
    features: [
      'Manager dashboard',
      'Tenant dashboard',
      'Meal planning',
      'Complaint registration',
      'Resident participation',
      'Application data management',
      'Live deployment',
    ],
    flow: ['Food Waste', 'Meal Planning', 'Resident Participation', 'Data', 'Action'],
    problem: 'Food wastage in PGs and hostels',
    solution: 'Meal planning + resident participation',
    technology: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
  },
  {
    id: '02',
    code: 'PYTHON',
    title: 'Python Programming',
    subtitle: 'Language Fundamentals & Problem Solving',
    description:
      'A growing collection of Python projects covering control flow, functions, and data structures while developing practical problem-solving habits.',
    stack: ['Python'],
    features: ['Control flow', 'Functions', 'Data structures', 'Problem solving', 'Python learning projects'],
  },
  {
    id: '03',
    code: 'HARDWARE',
    title: 'Arduino & Electronics',
    subtitle: 'Where Software Meets Circuits',
    description:
      'Hands-on experiments connecting code with hardware through sensors, actuators, and logic running on real circuits.',
    stack: ['Arduino IDE', 'C', 'Electronics'],
    features: ['Sensors', 'LEDs', 'Buzzers', 'Motors', 'Arduino IDE'],
  },
  {
    id: '04',
    code: 'DATA',
    title: 'Data & Statistics',
    subtitle: 'Turning Numbers Into Insight',
    description:
      'Coursework and exploratory analysis using statistical methods and Python to understand patterns and communicate findings clearly.',
    stack: ['Python', 'Statistics'],
    features: ['Statistical analysis', 'Data-oriented coursework', 'Python-based analysis', 'Data visualization'],
  },
  {
    id: '05',
    code: 'HACKATHONS',
    title: 'Hackathons',
    subtitle: 'Rapid Problem Solving',
    description:
      'Hackathon-oriented exploration of practical solutions spanning technology and agriculture-focused problem areas.',
    stack: ['Rapid Prototyping', 'Team Collaboration'],
    features: ['Technology domain solutions', 'Agriculture domain solutions', 'Time-boxed building'],
  },
]

export const education = {
  degree: 'B.Tech Computer Science & Engineering',
  university: 'JAIN (Deemed-to-be University), Bengaluru',
  period: '2025 – Present',
  cgpa: 8.2,
  cgpaMax: 10,
  classXII: 83.5,
  classX: 93.5,
  coursework: [
    'Programming in C/Python',
    'Object-Oriented Programming',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Statistics',
    'Electronics & Electrical Engineering',
  ],
}

export const journeySteps = [
  '2025',
  'B.Tech CSE',
  'Programming',
  'Web Development',
  'Full-Stack Projects',
  'Data & Statistics',
  'Arduino / Electronics',
  'Hackathon Exploration',
]

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
