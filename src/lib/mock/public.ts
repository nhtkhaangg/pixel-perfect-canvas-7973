export type PackageType = "MEMBERSHIP" | "PT";

export type GymPackage = {
  id: string;
  name: string;
  type: PackageType;
  price: number;
  durationDays: number;
  totalSessions: number | null;
  description: string;
  perks: string[];
  featured?: boolean;
};

export const packages: GymPackage[] = [
  {
    id: "flex-monthly",
    name: "Flex Monthly",
    type: "MEMBERSHIP",
    price: 29,
    durationDays: 30,
    totalSessions: null,
    description: "Off-peak gym floor access for people who train on their own schedule.",
    perks: ["Gym floor 10am–4pm", "Locker access", "1 intro session", "Member app"],
  },
  {
    id: "standard-monthly",
    name: "Standard Monthly",
    type: "MEMBERSHIP",
    price: 49,
    durationDays: 30,
    totalSessions: null,
    description: "Full-hours access plus unlimited group classes at your home branch.",
    perks: ["Gym floor 5am–11pm", "Unlimited group classes", "Sauna & recovery zone", "Guest pass each month"],
    featured: true,
  },
  {
    id: "all-access-quarter",
    name: "All-Access Quarterly",
    type: "MEMBERSHIP",
    price: 239,
    durationDays: 90,
    totalSessions: null,
    description: "Every branch, every class, plus a quarterly body-composition scan.",
    perks: ["All 4 branches", "Unlimited classes", "Quarterly InBody scan", "Towel service", "Priority booking"],
  },
  {
    id: "annual-standard",
    name: "Standard Annual",
    type: "MEMBERSHIP",
    price: 499,
    durationDays: 365,
    totalSessions: null,
    description: "Twelve months of Standard access with two months effectively free.",
    perks: ["Everything in Standard", "2 freeze months", "Free merch pack", "Price lock"],
  },
  {
    id: "pt-starter-8",
    name: "PT Starter 8",
    type: "PT",
    price: 360,
    durationDays: 45,
    totalSessions: 8,
    description: "Eight one-on-one sessions to learn the fundamentals and build a plan.",
    perks: ["Movement assessment", "Custom programme", "Nutrition basics", "Progress check-ins"],
  },
  {
    id: "pt-transform-24",
    name: "PT Transform 24",
    type: "PT",
    price: 960,
    durationDays: 90,
    totalSessions: 24,
    description: "A 12-week coached block with twice-weekly sessions and full tracking.",
    perks: ["2 sessions per week", "Weekly meal review", "Monthly body scan", "Chat support"],
    featured: true,
  },
  {
    id: "pt-elite-48",
    name: "PT Elite 48",
    type: "PT",
    price: 1780,
    durationDays: 180,
    totalSessions: 48,
    description: "Six months of high-touch coaching for athletes and serious goals.",
    perks: ["Periodised programme", "Competition prep", "Recovery protocols", "Unlimited chat"],
  },
];

export type Trainer = {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  ratingAvg: number;
  reviewCount: number;
  certificates: string[];
  branch: string;
  tags: string[];
};

export const trainers: Trainer[] = [
  {
    id: "maya-nguyen",
    name: "Maya Nguyen",
    specialization: "Strength & Powerlifting",
    experienceYears: 9,
    bio: "Former national-level powerlifter who helps beginners and intermediates build real, measurable strength with safe technique and simple programmes.",
    ratingAvg: 4.9,
    reviewCount: 128,
    certificates: ["NSCA-CSCS", "USAPL Club Coach", "Precision Nutrition L1"],
    branch: "Downtown",
    tags: ["Strength", "Technique", "Women's lifting"],
  },
  {
    id: "daniel-okafor",
    name: "Daniel Okafor",
    specialization: "Fat Loss & Conditioning",
    experienceYears: 7,
    bio: "Daniel blends metabolic conditioning with sustainable nutrition habits. His clients average 6 kg of fat loss over a 12-week block.",
    ratingAvg: 4.8,
    reviewCount: 96,
    certificates: ["ACE-CPT", "Kettlebell Athletics L2", "CPR/AED"],
    branch: "Riverside",
    tags: ["HIIT", "Weight loss", "Kettlebells"],
  },
  {
    id: "lena-fischer",
    name: "Lena Fischer",
    specialization: "Mobility & Rehab",
    experienceYears: 11,
    bio: "Physiotherapy-trained coach focused on pain-free movement, injury return and mobility for desk workers and older adults.",
    ratingAvg: 4.95,
    reviewCount: 142,
    certificates: ["BSc Physiotherapy", "FRC Mobility Specialist", "Pilates Mat Instructor"],
    branch: "Downtown",
    tags: ["Mobility", "Injury recovery", "Pilates"],
  },
  {
    id: "marco-silva",
    name: "Marco Silva",
    specialization: "Hypertrophy & Bodybuilding",
    experienceYears: 6,
    bio: "Competitive physique athlete who coaches evidence-based muscle building, contest prep and body recomposition.",
    ratingAvg: 4.7,
    reviewCount: 74,
    certificates: ["NASM-CPT", "IFBB Pro Card", "ISSA Nutrition"],
    branch: "Northgate",
    tags: ["Muscle gain", "Contest prep", "Nutrition"],
  },
  {
    id: "aisha-rahman",
    name: "Aisha Rahman",
    specialization: "Endurance & Running",
    experienceYears: 8,
    bio: "Marathoner and triathlon coach who builds engines — from first 5k to sub-3 marathon — with strength work to keep you injury-free.",
    ratingAvg: 4.85,
    reviewCount: 88,
    certificates: ["UESCA Running Coach", "TrainingPeaks L2", "NASM-CES"],
    branch: "Riverside",
    tags: ["Running", "Triathlon", "Endurance"],
  },
  {
    id: "tom-becker",
    name: "Tom Becker",
    specialization: "Functional & Senior Fitness",
    experienceYears: 14,
    bio: "Tom has spent 14 years helping clients 50+ stay strong, balanced and independent through functional training.",
    ratingAvg: 4.9,
    reviewCount: 110,
    certificates: ["ACSM-EP", "Senior Fitness Specialist", "TRX STC"],
    branch: "Eastside",
    tags: ["Balance", "Healthy aging", "Functional"],
  },
];

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: "Training" | "Nutrition" | "Recovery" | "Community";
  author: string;
  date: string;
  readMinutes: number;
  body: string[];
};

export const articles: Article[] = [
  {
    id: "beginner-strength-guide",
    title: "The beginner's guide to your first 12 weeks of strength training",
    excerpt: "Three lifts, three days, and a simple progression rule. Here's the plan our coaches give every new member.",
    category: "Training",
    author: "Maya Nguyen",
    date: "2026-09-18",
    readMinutes: 7,
    body: [
      "Starting a strength programme is less about finding the perfect plan and more about showing up consistently. Our coaches recommend three full-body sessions a week built around a squat, a hinge and a press.",
      "Use a simple linear progression: add 2.5 kg to upper-body lifts and 5 kg to lower-body lifts each session while every rep looks the same. When you stall twice in a row, drop the weight 10% and build back up.",
      "Accessory work matters, but keep it short. Two or three exercises for your back, core and single-leg strength are enough in the first 12 weeks.",
      "Finally, track everything. The member app logs your sets automatically when you train with the GymFit programme, so you can see exactly how far you've come.",
    ],
  },
  {
    id: "protein-myths",
    title: "Five protein myths that are slowing your progress",
    excerpt: "No, your body can't only absorb 30 g at once. We break down what the research actually says.",
    category: "Nutrition",
    author: "Daniel Okafor",
    date: "2026-09-10",
    readMinutes: 5,
    body: [
      "Protein is the most talked-about nutrient in the gym, and also the most misunderstood.",
      "Most active adults do well with 1.6–2.2 g of protein per kilogram of body weight per day. Spreading it across three or four meals is helpful, but total daily intake matters most.",
      "Plant proteins work too — just combine sources and aim slightly higher on total intake. And high protein intake is safe for people with healthy kidneys.",
    ],
  },
  {
    id: "sleep-and-recovery",
    title: "Sleep is the best recovery tool you're not using",
    excerpt: "A practical checklist to get more deep sleep — and why it matters more than any supplement.",
    category: "Recovery",
    author: "Lena Fischer",
    date: "2026-08-29",
    readMinutes: 6,
    body: [
      "Muscle is built while you rest, and most of that repair happens during deep sleep.",
      "Keep a consistent wake time, even at weekends. Get daylight within an hour of waking, and keep your bedroom cool, dark and quiet.",
      "Cut caffeine after 2pm and avoid hard training within two hours of bedtime if you notice it keeps you up.",
    ],
  },
  {
    id: "riverside-opening",
    title: "Riverside branch turns one: what's new this autumn",
    excerpt: "A new turf lane, two extra squat racks and a Saturday run club. Join the anniversary week.",
    category: "Community",
    author: "GymFit Team",
    date: "2026-08-20",
    readMinutes: 3,
    body: [
      "It's been a year since Riverside opened its doors, and more than 1,400 members now call it home.",
      "To celebrate, we've added a 20-metre turf lane, two new squat racks and a free Saturday run club led by coach Aisha Rahman.",
      "Anniversary week runs 1–7 October with free guest passes and open classes for everyone.",
    ],
  },
  {
    id: "hiit-vs-steady-state",
    title: "HIIT vs steady-state cardio: which burns more fat?",
    excerpt: "The honest answer depends on your schedule, your recovery and what you'll actually stick to.",
    category: "Training",
    author: "Aisha Rahman",
    date: "2026-08-12",
    readMinutes: 6,
    body: [
      "HIIT burns more calories per minute, but steady-state cardio is easier to recover from and to do more often.",
      "For most members, a mix works best: one or two short interval sessions plus two easy 30–45 minute sessions each week.",
      "Pick the option you enjoy — adherence beats optimisation every time.",
    ],
  },
  {
    id: "desk-mobility",
    title: "A 10-minute mobility routine for desk workers",
    excerpt: "Hips, thoracic spine and shoulders — the three areas that suffer most from sitting all day.",
    category: "Recovery",
    author: "Lena Fischer",
    date: "2026-07-30",
    readMinutes: 4,
    body: [
      "Sitting for eight hours shortens your hip flexors and rounds your upper back. Ten minutes a day helps undo it.",
      "Do 60 seconds each of: couch stretch (per side), cat-cow, thread the needle (per side), wall slides and deep squat hold.",
      "Pair it with a walk at lunch and you'll feel the difference within two weeks.",
    ],
  },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  branch: string;
  title: string;
  body: string;
  memberSince: string;
};

export const reviews: Review[] = [
  { id: "r1", author: "Sophie L.", rating: 5, date: "2026-09-20", branch: "Downtown", title: "Best coaching I've had", body: "Maya completely fixed my squat in three sessions. The gym is spotless and never feels overcrowded, even at 6pm.", memberSince: "2024" },
  { id: "r2", author: "James K.", rating: 5, date: "2026-09-15", branch: "Riverside", title: "Classes are genuinely fun", body: "The conditioning classes are hard but well-run. Booking through the app takes seconds.", memberSince: "2025" },
  { id: "r3", author: "Priya S.", rating: 4, date: "2026-09-08", branch: "Northgate", title: "Great equipment, busy at peak", body: "Loads of racks and plates. Can get busy around 5:30pm but staff keep things moving.", memberSince: "2023" },
  { id: "r4", author: "Carlos M.", rating: 5, date: "2026-08-30", branch: "Eastside", title: "Perfect for my dad", body: "Tom's senior fitness sessions have made a huge difference to my father's balance and confidence.", memberSince: "2025" },
  { id: "r5", author: "Emily R.", rating: 4, date: "2026-08-22", branch: "Downtown", title: "Love the recovery zone", body: "Sauna and cold plunge after training are a treat. Would love longer weekend hours.", memberSince: "2024" },
  { id: "r6", author: "Hiro T.", rating: 5, date: "2026-08-14", branch: "Riverside", title: "Ran my first marathon", body: "Aisha's plan got me from 10k to marathon in six months with zero injuries. Can't recommend enough.", memberSince: "2025" },
  { id: "r7", author: "Grace O.", rating: 3, date: "2026-08-02", branch: "Northgate", title: "Good but parking is tricky", body: "The gym itself is great, but finding parking in the evening can take a while.", memberSince: "2026" },
  { id: "r8", author: "Ben W.", rating: 5, date: "2026-07-25", branch: "Downtown", title: "Friendly front desk", body: "Staff remember your name and check-in is instant with the QR code. Feels like a community.", memberSince: "2022" },
];

export const gymInfo = {
  name: "GymFit",
  tagline: "Train with purpose, track every rep",
  phone: "+1 (415) 555-0142",
  email: "hello@gymfit.example",
  stats: [
    { label: "Active members", value: "6,200+" },
    { label: "Certified trainers", value: "38" },
    { label: "Classes per week", value: "64" },
    { label: "Average rating", value: "4.8" },
  ],
  branches: [
    { name: "Downtown", address: "120 Market St, San Francisco, CA", hours: "Mon–Fri 5:00–23:00 · Sat–Sun 7:00–21:00", sizeSqm: 2400 },
    { name: "Riverside", address: "48 Embarcadero Way, San Francisco, CA", hours: "Mon–Fri 5:30–22:30 · Sat–Sun 7:00–20:00", sizeSqm: 1900 },
    { name: "Northgate", address: "900 Van Ness Ave, San Francisco, CA", hours: "Mon–Fri 6:00–22:00 · Sat–Sun 8:00–20:00", sizeSqm: 1600 },
    { name: "Eastside", address: "305 Mission Bay Blvd, San Francisco, CA", hours: "Mon–Sun 6:00–22:00", sizeSqm: 1400 },
  ],
  amenities: [
    "Free weights & 24 squat racks",
    "Cardio deck with 60 machines",
    "Group studio & spin room",
    "Sauna, steam & cold plunge",
    "Turf sled lane",
    "Towel service & lockers",
    "Kids' corner (Downtown)",
    "Free parking (Eastside)",
  ],
  faqs: [
    { q: "Can I try before joining?", a: "Yes — every visitor gets a free day pass. Just bring a photo ID to the front desk." },
    { q: "Can I freeze my membership?", a: "Monthly plans can be frozen for up to 30 days per year. Annual plans include two freeze months." },
    { q: "Is there a joining fee?", a: "No joining fee on any plan. You only pay for the package you choose." },
    { q: "How do I book personal training?", a: "Buy a PT package, then book sessions with your chosen trainer from the member app." },
  ],
};

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
