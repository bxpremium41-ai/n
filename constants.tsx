import React from 'react';
import { Course, Feature, Testimonial, FaqItem, PricingPlan } from './types';
import { Download, BookOpen, Infinity, LifeBuoy, Users } from 'lucide-react';

/* 
  -----------------------------------------------------------------------
  DATA SOURCE: INTERIOR DESIGN BOOKS
  -----------------------------------------------------------------------
*/

const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const RAW_BOOKS: Course[] = [
  {
    id: '1',
    title: 'Living Room Design Book',
    software: '145 Pages',
    description: 'The heart of the home is usually the most cluttered. I teach you how to create conversation circles, master rug sizing, and lighting layers that actually work.',
    imageUrl: getDriveUrl('1YYJxA6NPSH23Oe3Nal_3QlW_DG0-mqKJ'),
    color: 'from-orange-400 to-amber-300',
    students: '12.5k',
    learningPoints: [
      'The "Rug Rule" 90% of people break',
      'Lighting layering for mood vs. function',
      'Selecting the perfect sofa scale'
    ],
    workflowImpact: 'Stop making living rooms that look like furniture showrooms. Make them liveable.'
  },
  {
    id: '2',
    title: 'Kitchen Design Book',
    software: '180 Pages',
    description: 'Function meets envy. We go deep on the "Working Triangle," cabinet finishes that don\'t date, and island dimensions that allow flow.',
    imageUrl: getDriveUrl('1AlxdHun9I2AO639g4Q0YJv_BOzb9sbZe'),
    color: 'from-slate-600 to-slate-400',
    students: '10.2k',
    learningPoints: [
      'The Golden Triangle rule explained',
      'Materials that survive red wine spills',
      'Hidden storage hacks for small spaces'
    ],
    workflowImpact: 'Design kitchens that people actually want to cook in, not just look at.'
  },
  {
    id: '3',
    title: 'Bedroom Design Book',
    software: '120 Pages',
    description: 'Your sanctuary. I show you how to use texture and color psychology to lower heart rates. It\'s not just a bed in a room; it\'s a retreat.',
    imageUrl: getDriveUrl('12APuUeW_CUcJxCYDG-R0PhmtwpKmWqs8'),
    color: 'from-stone-500 to-stone-400',
    students: '15k',
    learningPoints: [
      'Color psychology for deep sleep',
      'Bedding textures that feel expensive',
      'Blackout solutions that look chic'
    ],
    workflowImpact: 'Create spaces where your clients (or you) can actually disconnect from the world.'
  },
  {
    id: '4',
    title: 'Washroom Design Book',
    software: '95 Pages',
    description: 'Yes, bathrooms matter. Stop treating them like utility closets. We cover tile transitions, vanity lighting, and how to make 40sqft feel like a spa.',
    imageUrl: getDriveUrl('17CCyJ7HJhtPg3XPS8y9wf7SOG_kVMgf8'),
    color: 'from-teal-500 to-emerald-400',
    students: '9.8k',
    learningPoints: [
      'Tile layouts that expand space',
      'The science of flattering vanity lighting',
      'Fixture mixing: Brass vs. Chrome'
    ],
    workflowImpact: 'Turn the most expensive room per sqft into the most impressive one.'
  },
  {
    id: '5',
    title: 'Study Design Book',
    software: '110 Pages',
    description: 'Work from home is here to stay. Learn to design ergonomic, distraction-free zones that look good on a Zoom call.',
    imageUrl: getDriveUrl('1dzA2UnKUd_S37XMjh53ZiuhviZAivH1B'),
    color: 'from-blue-900 to-blue-700',
    students: '11k',
    learningPoints: [
      'Video-call background styling',
      'Ergonomics without the ugly chair',
      'Cable management mastery'
    ],
    workflowImpact: 'Productivity is designed. Build spaces that encourage deep work.'
  },
  {
    id: '6',
    title: 'Elevations Design Book',
    software: '160 Pages',
    description: 'Curb appeal is the first impression. We talk paint palettes, landscaping integration, and front door theory.',
    imageUrl: getDriveUrl('1_TGYyThr32ciEl7C7obqHnwq1_WOR8N2'),
    color: 'from-green-600 to-lime-500',
    students: '8.5k',
    learningPoints: [
      'Choosing exterior paint that lasts',
      'Lighting the path: Safety vs. Style',
      'Entryway styling that welcomes'
    ],
    workflowImpact: 'Increase property value before anyone even steps inside the house.'
  }
];

export const COURSES = RAW_BOOKS;

export const ROWS = [
  { 
    title: "Social Spaces", 
    courses: [
      COURSES.find(c => c.id === '1')!,
      COURSES.find(c => c.id === '2')!,
      COURSES.find(c => c.id === '6')!
    ] 
  },
  { 
    title: "Private Sanctuaries", 
    courses: [
      COURSES.find(c => c.id === '3')!,
      COURSES.find(c => c.id === '4')!,
      COURSES.find(c => c.id === '5')!
    ] 
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lifetime-basic',
    duration: 'The Digital Collection',
    period: 'One-time payment',
    price: '$49',
    originalPrice: '$199',
    label: 'BEST SELLER',
    features: ['All 6 eBooks (PDF)', 'Mobile Optimized', 'High-Res Image Bank', 'Instant Download', 'Lifetime Updates'],
    accentColor: 'border-brand-success shadow-glow-success'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Download className="w-8 h-8" />,
    title: 'Instant PDF Download',
    description: 'Get the files immediately after purchase. No shipping, no waiting.',
  },
  {
    icon: <Infinity className="w-8 h-8" />,
    title: 'Lifetime Updates',
    description: 'If I update a chapter or add a trend, you get the new file for free.',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: '800+ Pages',
    description: 'Zero fluff. Just actionable design theory, dimensions, and guides.',
  },
  {
    icon: <LifeBuoy className="w-8 h-8" />,
    title: 'Design Support',
    description: 'Reply to your purchase email with questions. I actually answer.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Reader Community',
    description: 'Join 50k+ other designers in our monthly newsletter.',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dumas Bastein',
    role: 'Photographer',
    location: 'Paris, France',
    verified: true,
    content: 'What a shame... I built my last house WITHOUT having read this book. I deeply regret it... All error made with my current house are highlighted by this book - So next house will be perfect. The book is such EASY-TO-READ book, anybody can understand the concepts, the figures and patterns. Congratulations Avada for this amazing book'
  },
  {
    name: 'Wiktoria Maria',
    role: 'Creator/writer/researcher',
    location: 'Berlin, Germany',
    verified: true,
    content: 'I am in the process of building my dream house and I am already using your ebook as guidance. What an amazing detailed book.'
  },
  {
    name: 'Nina Dobal',
    role: 'Interior Designer',
    location: 'New York, USA',
    verified: true,
    content: 'I have had such a wonderful experience learning with the Avadaspace. As someone who has had a chance to do similar book prior, I would say that this has been a very eye opening and informative experience compared to some others. Additional I have had the opportunity to interact and be guided by real life designers, who\'s advice on each part of design has been very impactful.'
  },
  {
    name: 'Arag Nizami',
    role: 'Architect',
    location: 'Dubai, UAE',
    verified: true,
    content: 'I am so glad I chose these book. I have a degree in Textiles and background in Fashion apparel and am looking to get more into the home industry. I find the content relevant, thorough, tailored well to students and novices. I am learning a great deal of applicable information.'
  },
  {
    name: 'Liam O’Sullivan',
    role: 'Homeowner',
    location: 'London, UK',
    verified: true,
    content: 'The Living Room book saved me at least $2,000 in furniture mistakes. I was about to buy a sectional that was way too big for my traffic flow. The clearance diagrams are incredibly helpful.'
  },
  {
    name: 'Emma Watson',
    role: 'Design Student',
    location: 'Sydney, Australia',
    verified: true,
    content: 'They don\'t teach these specific dimensions in university. This is the practical handbook every student needs for their first internship. It makes technical drawings so much easier.'
  },
  {
    name: 'Michael Chen',
    role: 'Real Estate Developer',
    location: 'Toronto, Canada',
    verified: true,
    content: 'We use the Exterior Appeal book as a checklist for our staging teams. Curb appeal is science, and this book breaks it down perfectly. ROI is massive.'
  },
  {
    name: 'Sophia Lorenze',
    role: 'Interior Stylist',
    location: 'Milan, Italy',
    verified: true,
    content: 'The lighting layering section in the Bedroom book is masterclass level. I\'ve shared it with my entire team. It transformed how we think about sanctuaries.'
  },
  {
    name: 'James Sterling',
    role: 'DIY Enthusiast',
    location: 'Austin, Texas',
    verified: true,
    content: 'I’ve always struggled with kitchens. This book made the plumbing and electrical mapping understandable for a layman. My contractor was impressed I knew the "Triangle Rule".'
  },
  {
    name: 'Mia Khalifa',
    role: 'Creative Director',
    location: 'Beirut, Lebanon',
    verified: true,
    content: 'The focus on "Study Havens" is so timely. I redesigned my home office based on the cable management and background styling tips. Zoom calls look professional now!'
  },
  {
    name: 'Ethan Hunt',
    role: 'Project Manager',
    location: 'Singapore',
    verified: true,
    content: 'Quick, actionable, and visual. I keep the PDFs on my iPad on-site. When a sub-contractor asks about a clearance, I just show them the diagram. No arguments.'
  },
  {
    name: 'Isabella Rossi',
    role: 'Architectural Consultant',
    location: 'Rome, Italy',
    verified: true,
    content: 'Finally, a resource that skips the fluffy "inspiration" and gives you the hard numbers. The sun-path and windrose sections in Exteriors are vital for sustainable design.'
  },
  {
    name: 'Noah Jackson',
    role: 'Building Contractor',
    location: 'Chicago, USA',
    verified: true,
    content: 'I recommend this to all my clients. It helps them understand why I can’t just "squeeze in" a double vanity without proper plumbing zones. It saves me hours of explaining.'
  },
  {
    name: 'Olivia Martinez',
    role: 'Renovator',
    location: 'Madrid, Spain',
    verified: true,
    content: 'The Washroom Spa book turned our tiny 35sqft bathroom into something that feels like a luxury hotel. Tile transitions are the secret, just like the book says.'
  },
  {
    name: 'William Bennett',
    role: 'Furniture Designer',
    location: 'Stockholm, Sweden',
    verified: true,
    content: 'The ergonomics sections are spot on. It\'s clear these were written by someone who actually builds and lives in these spaces. A true masterclass in functional design.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this a physical book or digital?",
    answer: "These are premium digital guidebooks (PDFs). This allows us to include high-resolution zoomable images and update them instantly when design trends shift. You can read them on any tablet, phone, or laptop."
  },
  {
    question: "I'm a complete beginner. Is this too technical?",
    answer: "Not at all. I wrote these as if I'm talking to a friend over coffee. No jargon, just plain English and clear diagrams explaining why some rooms feel good and others feel wrong."
  },
  {
    question: "Can I print them out?",
    answer: "Absolutely. The PDFs are formatted for standard A4 printing if you prefer holding paper. Many students print the checklists to take to the hardware store."
  },
  {
    question: "What if I only want one book?",
    answer: "Right now, we only sell the complete bundle. To be honest, design is holistic. You can't fix the living room without understanding how it flows into the kitchen."
  },
  {
    question: "Do you cover specific styles (Modern, Boho, etc)?",
    answer: "We focus on *principles*—lighting, scale, flow, and material selection. These apply whether you love Minimalist Scandinavian or Maximalist Bohemian styles."
  },
  {
    question: "Is there a refund policy?",
    answer: "We have a 30-day satisfaction guarantee. If you read the books and don't feel like you learned how to improve your space, just email us."
  }
];