import React from 'react';
import { Course, Feature, Testimonial, FaqItem, PricingPlan } from './types';
import { Download, MonitorPlay, Infinity, LifeBuoy, Users } from 'lucide-react';

/* 
  -----------------------------------------------------------------------
  HOW TO UPDATE IMAGES:
  1. Upload your image to Google Drive.
  2. Right click -> Share -> Copy Link (Ensure access is "Anyone with the link").
  3. Paste the link into the 'imageUrl' field below.
  
  The code will automatically convert Google Drive links to work on the website.
  -----------------------------------------------------------------------
*/

const RAW_COURSES: Course[] = [
  {
    id: '5',
    title: 'V-Ray Photorealism',
    software: 'V-Ray',
    description: 'Make your 3D models look like real photos. Lighting and shadows so good, clients will think it is built.',
    // V-Ray Link (Working)
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8',
    color: 'from-yellow-500 to-orange-400',
    students: '48k',
    learningPoints: [
      'Set up realistic sunlight and night lighting',
      'Make materials look like real wood and glass',
      'Take "photographs" of your 3D house'
    ],
    workflowImpact: 'Sell your design before it exists. Clients pay faster when they see exactly what they are getting.'
  },
  {
    id: '1',
    title: 'AutoCAD Mastery',
    software: 'AutoCAD',
    description: 'The starting point for every architect. Learn to draw accurate 2D floor plans for houses and buildings.',
    // Updated AutoCAD Link
    imageUrl: 'https://drive.google.com/file/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR/view?usp=drive_link',
    color: 'from-red-500 to-red-400',
    students: '42.5k',
    learningPoints: [
      'Draw floor plans and furniture layouts easily',
      'Print your drawings to scale for construction',
      'Use shortcuts to draw 10x faster than others'
    ],
    workflowImpact: 'Stop drawing by hand. Create professional blueprints that contractors can actually build from.'
  },
  {
    id: '2',
    title: 'BIM with Revit',
    software: 'Revit',
    description: 'Build the whole 3D building on your computer. It is smart—change a wall in 3D, and the floor plan updates automatically.',
    // Updated Revit Link
    imageUrl: 'https://drive.google.com/file/d/1N_BbG9kAEwIk541Id53_RV0CWjO1jzAt/view?usp=drive_link',
    color: 'from-red-600 to-red-500',
    students: '38k',
    learningPoints: [
      'Create 3D buildings with automatic floor plans',
      'Calculate how many bricks and windows you need',
      'Work on big projects with other team members'
    ],
    workflowImpact: 'Save days of work. You do not need to redraw plans when the design changes. The software does it for you.'
  },
  {
    id: '3',
    title: 'SketchUp Pro',
    software: 'SketchUp',
    description: 'The easiest way to design 3D houses. If you can draw a box, you can design a beautiful villa with this.',
    // Updated SketchUp Link
    imageUrl: 'https://drive.google.com/file/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo/view?usp=drive_link', 
    color: 'from-blue-500 to-cyan-400',
    students: '55k',
    learningPoints: [
      'Pull simple shapes into 3D houses instantly',
      'Add furniture, colors, and textures easily',
      'Create 3D views to show your clients'
    ],
    workflowImpact: 'Impress clients instantly. Model their dream kitchen or bedroom in front of them in just minutes.'
  },
  {
    id: '4',
    title: '3ds Max Advanced',
    software: '3ds Max',
    description: 'Design fancy furniture and luxury interiors. Create soft sofas and curtains that look real enough to touch.',
    // Updated 3ds Max Link
    imageUrl: 'https://drive.google.com/file/d/1DgmIvkeC2dxGpRpzbIthHQsSdlCty2Xg/view?usp=drive_link',
    color: 'from-cyan-600 to-blue-500',
    students: '22k',
    learningPoints: [
      'Model complex shapes like twisted towers',
      'Create soft fabrics, pillows, and blankets',
      'Design high-end luxury interior spaces'
    ],
    workflowImpact: 'Design things simpler software cannot handle. Charge more for premium, high-detail luxury designs.'
  },
  {
    id: '6',
    title: 'Lumion Cinematic',
    software: 'Lumion',
    description: 'Make movies of your architecture. Add moving people, birds, and cars to make your design feel alive.',
    // Updated Lumion Link
    imageUrl: 'https://drive.google.com/file/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt/view?usp=drive_link',
    color: 'from-teal-500 to-emerald-400',
    students: '31k',
    learningPoints: [
      'Add grass, trees, and water instantly',
      'Make people walk and cars drive in your scene',
      'Create a video tour of the house'
    ],
    workflowImpact: 'Give your client a video tour. A 1-minute video sells a house better than 100 drawings.'
  },
  {
    id: '7',
    title: 'D5 Render Realtime',
    software: 'D5 Render',
    description: 'See the final result instantly while you work. No more waiting hours for the computer to finish a picture.',
    // Updated D5 Render Link
    imageUrl: 'https://drive.google.com/file/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr/view?usp=drive_link',
    color: 'from-purple-500 to-pink-500',
    students: '19k',
    learningPoints: [
      'Real-time lighting (see it as you work)',
      'Drag and drop thousands of free furniture items',
      'Make 4K images in seconds'
    ],
    workflowImpact: 'Design faster. Change the floor material and see how it looks instantly without waiting.'
  },
  {
    id: '8',
    title: 'Enscape VR',
    software: 'Enscape',
    description: 'Walk inside your design. Put on a VR headset and let your client stand in their new living room.',
    // Updated Enscape Link
    imageUrl: 'https://drive.google.com/file/d/1SmezP6LwT3yo9aE3oivpGkqS-xycSOyx/view?usp=drive_link',
    color: 'from-orange-500 to-red-500',
    students: '25k',
    learningPoints: [
      'One-click to start walking inside your model',
      'Send a web link so clients can walk around too',
      'Use Virtual Reality (VR) to impress'
    ],
    workflowImpact: 'Spot mistakes early. Walking through the house virtually helps you fix issues before construction starts.'
  },
  {
    id: '9',
    title: 'AI Architecture',
    software: 'Midjourney',
    description: 'Use AI to get 100 design ideas in 1 minute. Just type "modern villa by the beach" and see the magic.',
    // Updated AI Architecture Link
    imageUrl: 'https://drive.google.com/file/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS/view?usp=drive_link',
    color: 'from-fuchsia-600 to-purple-600',
    students: '60k',
    learningPoints: [
      'How to write text to get amazing house images',
      'Create mood boards for clients instantly',
      'Combine different styles (e.g., Classic + Modern)'
    ],
    workflowImpact: 'Never run out of ideas. Let AI generate the creative concepts so you can focus on the details.'
  },
  {
    id: '10',
    title: 'Generative Design',
    software: 'Stable Diffusion',
    description: 'Turn a rough pencil sketch into a realistic building image using AI. It is like magic for architects.',
    // Updated Generative Design Link
    imageUrl: 'https://drive.google.com/file/d/1xSzSjuL4imlbXwEYMwKw_vhuueDcFtHm/view?usp=drive_link',
    color: 'from-indigo-500 to-purple-500',
    students: '15k',
    learningPoints: [
      'Turn hand sketches into realistic renders',
      'Change specific parts of an image with AI',
      'Install AI tools on your own computer'
    ],
    workflowImpact: 'Show a client a realistic picture during the first meeting, even if you only have a napkin sketch.'
  },
  {
    id: '11',
    title: 'Unreal Engine 5',
    software: 'Unreal Engine',
    description: 'Make your house design look like a high-end video game. Let clients open doors and turn on lights.',
    // Updated Unreal Engine Link
    imageUrl: 'https://drive.google.com/file/d/14EfKoC7BfxXmYxd6t6qIE470yQaX0toW/view?usp=drive_link',
    color: 'from-gray-600 to-gray-400',
    students: '18k',
    learningPoints: [
      'Create interactive lights and doors',
      'Make realistic fire, water, and wind',
      'Package your design as a playable game'
    ],
    workflowImpact: 'Gamify your work. Give clients a controller and let them play inside their future home.'
  },
  {
    id: '12',
    title: 'Post Production',
    software: 'Photoshop',
    description: 'The final touch. Add real sky, birds, and happy people to your building pictures to make them sell.',
    // Updated Photoshop Link
    imageUrl: 'https://drive.google.com/file/d/1FkzIhdu7K5JeRFq7BM1wGV5MND_fLMKe/view?usp=drive_link',
    color: 'from-blue-800 to-blue-600',
    students: '72k',
    learningPoints: [
      'Fix lighting and colors easily',
      'Add realistic people and trees',
      'Make your portfolio look professional'
    ],
    workflowImpact: 'Make average 3D renders look like award-winning photography. This is how you win competitions.'
  }
];

// --- AUTO-FIX LOGIC ---
// This processes the course list to automatically fix Google Drive links so they display correctly.
export const COURSES = RAW_COURSES.map(course => {
  let url = course.imageUrl;
  
  // Detect Google Drive links and convert to "Direct CDN" links (lh3.googleusercontent.com)
  // This is more reliable than the standard /uc?export=view method
  if (url.includes('drive.google.com') && url.includes('/file/d/')) {
    const idMatch = url.match(/\/d\/([^/]+)/);
    if (idMatch && idMatch[1]) {
      // Use the Google CDN format for better reliability
      url = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }

  return { ...course, imageUrl: url };
});

// Defined categories as requested
export const ROWS = [
  { 
    title: "Planning", 
    courses: [
      COURSES.find(c => c.software === 'AutoCAD')!,
      COURSES.find(c => c.software === 'Revit')!
    ] 
  },
  { 
    title: "Designing", 
    courses: [
      COURSES.find(c => c.software === 'SketchUp')!,
      COURSES.find(c => c.software === '3ds Max')!,
      COURSES.find(c => c.software === 'Photoshop')!
    ] 
  },
  { 
    title: "Rendering", 
    courses: [
      COURSES.find(c => c.software === 'V-Ray')!,
      COURSES.find(c => c.software === 'Lumion')!,
      COURSES.find(c => c.software === 'D5 Render')!,
      COURSES.find(c => c.software === 'Enscape')!
    ] 
  },
  { 
    title: "AI & Interactive", 
    courses: [
      COURSES.find(c => c.software === 'Midjourney')!,
      COURSES.find(c => c.software === 'Stable Diffusion')!,
      COURSES.find(c => c.software === 'Unreal Engine')!
    ] 
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'quarterly',
    duration: '3 Months',
    period: 'Quarterly',
    price: '$49',
    originalPrice: '$199',
    label: 'POPULAR',
    features: ['Access to all courses', 'Mobile Access', 'HD Quality', 'Project Files'],
    accentColor: 'border-brand-primary'
  },
  {
    id: 'yearly',
    duration: '12 Months',
    period: 'Yearly',
    price: '$99',
    originalPrice: '$499',
    label: 'BEST VALUE',
    features: ['Lifetime Access Logic', 'Priority Support', '4K Quality', 'Portfolio Review', 'Mentorship'],
    accentColor: 'border-brand-accent shadow-glow'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Download className="w-6 h-6 text-brand-primary" />,
    title: 'Download & Watch',
    description: 'All software links provided. Learn offline.',
  },
  {
    icon: <Infinity className="w-6 h-6 text-brand-primary" />,
    title: 'Unlimited Access',
    description: 'Watch as much as you want, whenever you want.',
  },
  {
    icon: <MonitorPlay className="w-6 h-6 text-brand-primary" />,
    title: '100+ Hours',
    description: 'From basics to advanced professional workflows.',
  },
  {
    icon: <LifeBuoy className="w-6 h-6 text-brand-primary" />,
    title: '24/7 Support',
    description: 'Direct chat support for technical doubts.',
  },
    {
    icon: <Users className="w-6 h-6 text-brand-primary" />,
    title: 'Community',
    description: 'Join thousands of other architects.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Architect',
    location: 'London, UK',
    content: 'I was skeptical about online courses, but the depth here is unmatched. The Revit workflow section alone saved our firm countless hours on our latest high-rise project. The value is undeniable.'
  },
  {
    name: 'Michael Chen',
    role: '3D Visualizer',
    location: 'Toronto, Canada',
    content: 'The V-Ray and 3ds Max combo is a game-changer. I went from producing average renders to photorealistic images that my clients confuse with actual photography. It paid for itself in one project.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Interior Designer',
    location: 'Madrid, Spain',
    content: 'Accessing the library of textures and models while learning AI tools like Midjourney has completely revolutionized my concept phase. I can now present 10 variations to clients in the time it used to take for one.'
  },
  {
    name: 'David Kim',
    role: 'Architecture Student',
    location: 'Seoul, South Korea',
    content: 'As a student, university teaches theory, but Avada taught me the actual skills firms want. I landed my dream internship because I was the only one who knew Enscape VR and Parametric Design.'
  },
  {
    name: 'Priya Patel',
    role: 'Freelance Designer',
    location: 'Mumbai, India',
    content: 'The ability to download project files and follow along step-by-step is fantastic. I built my entire freelance portfolio using these courses, and now I charge 3x what I used to for 3D walkthroughs.'
  },
  {
    name: 'Lars Jensen',
    role: 'Urban Planner',
    location: 'Copenhagen, Denmark',
    content: 'The Lumion Cinematic course is world-class. Being able to animate entire city blocks with traffic and people has given my urban planning presentations a competitive edge that wins government contracts.'
  },
  {
    name: 'Isabella Rossi',
    role: 'Design Lead',
    location: 'Milan, Italy',
    content: 'We bought the team package. It is incredibly efficient for onboarding new staff. Instead of senior staff training juniors on AutoCAD standards, we just assign them these courses. It changes the game for office productivity.'
  },
  {
    name: 'Ahmed Hassan',
    role: 'Landscape Architect',
    location: 'Dubai, UAE',
    content: 'Learning how to integrate D5 Render with my existing workflow was seamless. The real-time rendering capabilities allow me to make changes during client meetings, which blows them away every time.'
  },
  {
    name: 'Sophie Dubois',
    role: 'Lighting Specialist',
    location: 'Paris, France',
    content: 'The detailed instruction on lighting in V-Ray is technical yet accessible. I finally understand global illumination and exposure control properly. My renders have a mood and atmosphere now, not just flat light.'
  },
  {
    name: 'James Wilson',
    role: 'BIM Manager',
    location: 'Sydney, Australia',
    content: 'The advanced Revit families and parameters section is something I haven\'t found anywhere else. It allowed us to automate our scheduling and quantity take-offs, reducing human error significantly.'
  },
  {
    name: 'Yuki Tanaka',
    role: 'Concept Artist',
    location: 'Tokyo, Japan',
    content: 'I use the AI Architecture course for rapid ideation. Combining Stable Diffusion with simple massing models has sped up my early design phase by 500%. It is a must-have skill for the future.'
  },
  {
    name: 'Maria Silva',
    role: 'Residential Architect',
    location: 'Rio de Janeiro, Brazil',
    content: 'For small firms, software licenses and training are expensive. This platform provides everything in one place. The SketchUp to Twinmotion workflow is perfect for quick residential client approvals.'
  },
  {
    name: 'Thomas Müller',
    role: 'Construction Manager',
    location: 'Berlin, Germany',
    content: 'Even as a builder, understanding the design software helps me communicate better with architects. The blueprint reading and BIM navigation modules are practical and directly applicable to the site.'
  },
  {
    name: 'Olivia Brown',
    role: 'Interior Decorator',
    location: 'New York, USA',
    content: 'The post-production course in Photoshop added that extra 10% of magic to my renders. Adding realistic people, imperfections, and color grading makes the spaces feel lived-in and emotional.'
  },
  {
    name: 'Wei Zhang',
    role: 'Architectural Technologist',
    location: 'Shanghai, China',
    content: 'The technical accuracy in the AutoCAD mastery course is impressive. It enforces good habits regarding layers and blocks which are essential for large-scale collaboration in big firms.'
  },
  {
    name: 'Emma Williams',
    role: 'Set Designer',
    location: 'Cape Town, South Africa',
    content: 'I use these skills for film set design. The Unreal Engine course allowed me to walk directors through virtual sets before a single hammer was swung. It saved the production thousands in changes.'
  },
  {
    name: 'Lucas Martin',
    role: 'Freelance Architect',
    location: 'Buenos Aires, Argentina',
    content: 'The ROI is insane. One single client project paid for 5 years of this subscription. If you are on the fence, just do it. The mentorship and portfolio review alone are worth the price.'
  },
   {
    name: 'Aisha Al-Fayed',
    role: 'Project Manager',
    location: 'Cairo, Egypt',
    content: 'Excellent structure. The lessons are bite-sized but packed with information, perfect for busy professionals. I listen to the theory parts during my commute and practice the exercises on weekends.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the subscription work?",
    answer: "Choose a plan (Quarterly or Yearly) and get instant unlimited access to ALL courses on the platform."
  },
  {
    question: "Can I watch on mobile?",
    answer: "Yes, our platform is fully responsive. You can learn on your phone, tablet, or laptop."
  },
  {
    question: "Are project files included?",
    answer: "Yes, all 3D models and textures used in the tutorials are available for download."
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, industry-recognized certificates are provided upon course completion."
  }
];
