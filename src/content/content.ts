import type { ProductionItem, LeadershipItem, TechProject, SkillNode } from '../types';

export const productionsData: ProductionItem[] = [
  {
    id: 'rakta-karabi',
    title: {
      en: 'Rakta Karabi (Red Oleanders)',
      bn: 'রক্তকরবী (রবীন্দ্রনাথ ঠাকুর)'
    },
    playwright: {
      en: 'Rabindranath Tagore',
      bn: 'রবীন্দ্রনাথ ঠাকুর'
    },
    role: {
      en: 'The Professor (অধ্যাপক) · Script Editing · Production Finance',
      bn: 'অধ্যাপক · নাট্যরূপ ও পাঠ সম্পাদনা · প্রযোজনা অর্থব্যবস্থাপনা'
    },
    venue: {
      en: 'Zahir Raihan Auditorium, Jahangirnagar University',
      bn: 'জহির রায়হান অডিটোরিয়াম, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়'
    },
    year: '2024',
    category: 'theatre',
    imagePlaceholderColor: '#B3122D',
    badge: {
      en: 'Signature Classical Production',
      bn: 'মৌলিক ধ্রুপদী প্রযোজনা'
    },
    synopsis: {
      en: 'A profound exploration of greed, mechanized oppression in the subterranean city of Yakshapuri, and the triumph of life force symbolised by Nandini. The Professor acts as the conscience and voice of philosophical enquiry inside the prison-like gold mine.',
      bn: 'যক্ষপুরীর অন্ধকারের মধ্যে যান্ত্রিক শোষণ ও অর্থলিপ্সার বিরুদ্ধে জীবনের অনন্ত শক্তির প্রতীক নন্দিনী। অধ্যাপক চরিত্রটি যক্ষপুরীর জটিল ব্যবস্থার ভেতর দাঁড়িয়ে সত্যের অন্বেষণ ও বিবেকের প্রতিধ্বনি।'
    },
    contributions: {
      en: [
        'Portrayed the pivotal role of "The Professor" with nuanced dramatic cadence and philosophical depth.',
        'Collaborated on rigorous textual editing and modernization of archaic passages for contemporary resonance.',
        'Structured the production budget, tracked departmental allocations, and handled venue operations.'
      ],
      bn: [
        'গভীর দার্শনিক অভিব্যক্তি এবং বাচনিক উৎকর্ষে "অধ্যাপক" চরিত্রটির জীবন্ত রূপদান।',
        'রবীন্দ্র-টেক্সটের গভীরতা অক্ষুণ্ণ রেখে সমসাময়িক প্রেক্ষাপটে নাট্যরূপ ও পাঠ সম্পাদনায় সক্রিয় ভূমিকা।',
        'প্রযোজনার বাজেট পরিকল্পনা, হিসাবরক্ষণ ও মঞ্চায়ন সমন্বয় সফলভাবে পরিচালনা।'
      ]
    },
    quote: {
      en: '"I look into books to know the truth, but Nandini brings the truth written upon the sky."',
      bn: '"আমি পুঁথির ভিতর দিয়ে সত্যকে খুঁজতে গেছি, কিন্তু নন্দিনী সত্যকে আকাশের মতো প্রত্যক্ষ করে এনেছে।"'
    }
  },
  {
    id: 'aar-koto-din',
    title: {
      en: 'Aar Koto Din (How Many More Days)',
      bn: 'আর কত দিন (জহির রায়হান)'
    },
    playwright: {
      en: 'Zahir Raihan',
      bn: 'জহির রায়হান'
    },
    role: {
      en: 'Ensemble Lead & Dramaturgical Assistant',
      bn: 'প্রধান চরিত্র সমন্বয় ও নাট্যতাত্ত্বিক সহায়তা'
    },
    venue: {
      en: 'Department Studio Theatre, Jahangirnagar University',
      bn: 'নাট্যকলা স্টুডিও থিয়েটার, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়'
    },
    year: '2023',
    category: 'theatre',
    imagePlaceholderColor: '#4A1521',
    badge: {
      en: 'Anti-War Allegory',
      bn: 'যুদ্ধবিরোধী রূপক প্রযোজনা'
    },
    synopsis: {
      en: 'Zahir Raihan\'s harrowing anti-war allegorical masterpiece reflecting human suffering under genocidal atrocities across the world. Adapted using physical theatre and lighting shadows to convey historical trauma.',
      bn: 'বিশ্বজুড়ে যুদ্ধ ও গণহত্যার নির্মম শিকার মানুষের আর্তনাদ নিয়ে জহির রায়হানের অমর যুদ্ধবিরোধী উপন্যাস। শরীরী অভিনয় ও ছায়ামঞ্চের আলো-আঁধারির সাহায্যে ঐতিহাসিক ট্র্যাজেডি উন্মোচন।'
    },
    contributions: {
      en: [
        'Executed intense physical theatre choreography representing oppressed populations across historical eras.',
        'Synthesised archival audio textures and historical projection sequences.',
        'Led vocal rehearsals and synchronization of ensemble chorus movements.'
      ],
      bn: [
        'ঐতিহাসিক দমনপীড়ন ও মুক্তিকামী মানুষের অনুভূতি ফুটিয়ে তুলতে শরীরী অভিনয়ের নিবিড় প্রয়োগ।',
        'ঐতিহাসিক প্রক্ষেপণ ও নেপথ্য শব্দপরিকল্পনায় যৌথ গবেষণা ও বাস্তবায়ন।',
        'দলের যৌথ স্বর ও শারীরিক ছন্দের মহড়া পরিচালনা ও সমন্বয়।'
      ]
    },
    quote: {
      en: '"When the guns fall silent, who will count the tears written into dust?"',
      bn: '"কবে শেষ হবে এই ধ্বংসের খেলা? রক্তে লেখা এই আর্তনাদের শেষ কোথায়?"'
    }
  },
  {
    id: 'shilpakala-productions',
    title: {
      en: 'National Theatre Repertory Experience',
      bn: 'বাংলাদেশ শিল্পকলা একাডেমি নাট্যোৎসব অভিজ্ঞতা'
    },
    playwright: {
      en: 'National Festival Collaborations',
      bn: 'জাতীয় নাট্যোৎসব মঞ্চায়ন'
    },
    role: {
      en: 'Performer & Technical Stage Crew',
      bn: 'মঞ্চাভিনেতা ও কারিগরি মঞ্চ দল'
    },
    venue: {
      en: 'National Theatre Hall, Bangladesh Shilpakala Academy, Dhaka',
      bn: 'জাতীয় নাট্যশালা, বাংলাদেশ শিল্পকলা একাডেমি, ঢাকা'
    },
    year: '2023 - 2025',
    category: 'theatre',
    imagePlaceholderColor: '#8C1D40',
    badge: {
      en: 'National Stage Presence',
      bn: 'জাতীয় মঞ্চ অভিজ্ঞতা'
    },
    synopsis: {
      en: 'Intensive participation in national theatre festivals at Bangladesh\'s apex cultural institution. Worked alongside veteran directors, professional lighting designers, and sound scenographers.',
      bn: 'দেশের শীর্ষ সাংস্কৃতিক প্রতিষ্ঠান বাংলাদেশ শিল্পকলা একাডেমির জাতীয় নাট্যশালায় বিভিন্ন জাতীয় ও আন্তর্জাতিক নাট্যোৎসবে সফল অংশগ্রহণ। বিশিষ্ট নাট্যব্যক্তিত্বদের সাথে মঞ্চাভিনয় ও কারিগরি মেলবন্ধন।'
    },
    contributions: {
      en: [
        'Operated on large-scale proscenium fly systems, motorized stage flats, and intelligent lighting rigs.',
        'Assisted guest scenographers with set drafting and quick-turnaround backstage changes.',
        'Cultivated a deep understanding of professional stage discipline and audience acoustics.'
      ],
      bn: [
        'বৃহৎ প্রোসেনিয়াম মঞ্চের ফ্লাই সিস্টেম, সুপরিকল্পিত মঞ্চকাঠামো ও লাইটিং রিগ পরিচালনায় সহায়তা।',
        'মঞ্চসজ্জা নির্মাণ ও দ্রুত দৃশ্য পরিবর্তনের পেশাদার নেপথ্য ব্যবস্থাপনা।',
        'পেশাদার নাট্যমঞ্চের শৃঙ্খলা ও শব্দতত্ত্ব সম্পর্কে বাস্তব অভিজ্ঞতা অর্জন।'
      ]
    }
  },
  {
    id: 'chemistry-lab-miniature',
    title: {
      en: '1:12 Miniature Stage Set: Vintage Chemistry Laboratory',
      bn: '১:১২ স্কেল ক্ষুদ্রাকৃতির মঞ্চ মডেল: ভিন্টেজ রসায়ন গবেষণাগার'
    },
    playwright: {
      en: 'Original Scenographic Design',
      bn: 'মৌলিক মঞ্চ স্থাপত্য ও দৃশ্যপরিকল্পনা'
    },
    role: {
      en: 'Lead Scenographer & Scale Modeller',
      bn: 'প্রধান দৃশ্যপরিকল্পক ও স্কেল মডেল কারিগর'
    },
    venue: {
      en: 'Scenography Studio & Exhibition, JU Drama Dept',
      bn: 'দৃশ্যশিল্প স্টুডিও ও প্রদর্শনী, নাট্যকলা বিভাগ, জাবি'
    },
    year: '2024',
    category: 'set-design',
    has3DViewer: true,
    imagePlaceholderColor: '#C9A24B',
    badge: {
      en: 'Signature Showpiece · 3D Interactive Model',
      bn: 'স্বাক্ষর প্রদর্শনী · থ্রিডি ইন্টারঅ্যাক্টিভ মডেল'
    },
    synopsis: {
      en: 'An architectural 1:12 scale stage model depicting an early 20th-century European alchemy/chemistry laboratory. Features weathered timber floorboards, distressed brick walls, antique fume extraction hood, retort flasks, specimen racks, and a blackboard with reaction equations.',
      bn: 'বিংশ শতাব্দীর প্রথমার্ধের এক জটিল রসায়ন পরীক্ষাগার অবলম্বনে নির্মিত ১:১২ স্কেলের নিখুঁত মঞ্চ নকশা। কাঠের তক্তা, পোড়া ইটের দেয়াল, প্রাচীন ফিউম হুড, রিটর্ট ফ্লাস্ক, রাসায়নিক টেস্ট টিউব ও চকবোর্ডের নিখুঁত প্রতিরূপ।'
    },
    contributions: {
      en: [
        'Constructed physical scale miniature using balsa wood, etched brass, acrylic glass, and miniature LEDs for ambient practical lighting.',
        'Digitized and modeled every component in 3D (Blender) with PBR textures and exploded-view kinematics.',
        'Awarded high distinction in Academic Stage Scenography & Theory assessment.'
      ],
      bn: [
        'বালসা কাঠ, ব্রাস মেটাল ও অ্যাক্রিলিক ব্যবহার করে হাতে তৈরি নিখুঁত স্কেল মডেল।',
        'ব্লেন্ডারে প্রতিটি উপাদানের ত্রিমাত্রিক রেন্ডার ও এক্সপ্লোডেড ভিউ আর্কিটেকচার তৈরি।',
        'নাট্যকলা বিভাগের মঞ্চসজ্জা ও নাট্যতত্ত্ব মূল্যায়নে সর্বোচ্চ প্রশংসা অর্জন।'
      ]
    }
  }
];

export const leadershipData: LeadershipItem[] = [
  {
    id: 'tsc-newspaper',
    title: {
      en: 'President, Campus Newspaper',
      bn: 'সভাপতি, টিএসসি-অনুমোদিত সংবাদপত্র'
    },
    organization: {
      en: 'Teacher-Student Centre (TSC), Jahangirnagar University',
      bn: 'ছাত্র-শিক্ষক কেন্দ্র (টিএসসি), জাহাঙ্গীরনগর বিশ্ববিদ্যালয়'
    },
    role: {
      en: 'President & Editor-in-Chief',
      bn: 'সভাপতি ও প্রধান সম্পাদক'
    },
    period: '2023 - Present',
    description: {
      en: 'Directing the editorial policy, investigative reporting, digital publication, and print distribution for Jahangirnagar University\'s prominent TSC-affiliated media organization.',
      bn: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের ঐতিহ্যবাহী টিএসসি-অনুমোদিত সংবাদপত্রের সার্বিক নেতৃত্ব, বস্তুনিষ্ঠ সাংবাদিকতা, প্রিন্ট ও ডিজিটাল প্রকাশনার পরিকল্পনা ও সমন্বয়।'
    },
    metrics: [
      {
        label: { en: 'Readership Reached', bn: 'পাঠক সংযোগ' },
        value: 18000,
        suffix: '+'
      },
      {
        label: { en: 'Investigative Issues Published', bn: 'প্রকাশিত সংখ্যা' },
        value: 14,
        suffix: ' Issues'
      },
      {
        label: { en: 'Staff Journalists & Writers', bn: 'প্রতিবেদক ও লেখক' },
        value: 35,
        suffix: '+'
      }
    ],
    responsibilities: {
      en: [
        'Formulated ethical reporting guidelines, verifying source integrity on university administrative matters.',
        'Mentored junior journalists in news writing, photojournalism, and layout design.',
        'Modernized workflow with digital newsdesk pipelines, cloud storage, and automated social distribution.'
      ],
      bn: [
        'দায়িত্বশীল ও অনুসন্ধানী সাংবাদিকতার নীতিমালা প্রণয়ন এবং সংবাদের নির্ভরযোগ্যতা নিশ্চিতকরণ।',
        'তরুণ সংবাদকর্মী ও লেখকদের ফিচার লেখা, সম্পাদনা ও লেআউট ডিজাইনের প্রশিক্ষণ প্রদান।',
        'ডিজিটাল নিউজডেস্ক ব্যবস্থা চালু করে প্রতিবেদন সংগ্রহ ও দ্রুত প্রকাশের আধুনিক রূপরেখা বাস্তবায়ন।'
      ]
    }
  },
  {
    id: 'jucsu-run',
    title: {
      en: 'JUCSU Run 2026 & Batch Day Festival',
      bn: 'জাকসু রান ২০২৬ ও ব্যাচ ডে ফেস্টিভ্যাল'
    },
    organization: {
      en: 'Jahangirnagar University Central Students\' Union & 52nd Batch Committee',
      bn: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ও ৫২তম ব্যাচ কেন্দ্রীয় উৎসব কমিটি'
    },
    role: {
      en: 'Chief Event Convener & Logistics Lead',
      bn: 'প্রধান ইভেন্ট আহ্বায়ক ও লজিস্টিকস সমন্বয়ক'
    },
    period: '2025 - 2026',
    description: {
      en: 'Led the cross-campus organization of the flagship marathon and cultural festival, coordinating between university authorities, medical teams, corporate sponsors, and thousands of student participants.',
      bn: 'ক্যাম্পাসব্যাপী মেগা ম্যারাথন ও সাংস্কৃতিক উৎসবের নেতৃত্ব; বিশ্ববিদ্যালয় প্রশাসন, অ্যাম্বুলেন্স টিম, করপোরেট স্পন্সর এবং হাজারো শিক্ষার্থীদের মধ্যে কার্যকর সমন্বয়।'
    },
    metrics: [
      {
        label: { en: 'Active Runners & Participants', bn: 'অংশগ্রহণকারী রানার' },
        value: 2500,
        suffix: '+'
      },
      {
        label: { en: 'Corporate & Brand Sponsors', bn: 'করপোরেট স্পন্সর' },
        value: 12,
        suffix: ' Brands'
      },
      {
        label: { en: 'Volunteer Operations Force', bn: 'স্বেচ্ছাসেবক দল' },
        value: 85,
        suffix: ' Members'
      }
    ],
    responsibilities: {
      en: [
        'Engineered the 7.5 km campus route safety protocol, medical stations, and water hydrations.',
        'Secured title sponsorships and negotiated contracts with outdoor apparel and nutrition partners.',
        'Directed stage management and sound setup for the post-run cultural festival.'
      ],
      bn: [
        '৭.৫ কিমি ক্যাম্পাস ম্যারাথন রুটের নিরাপত্তা, মেডিকেল বুথ ও হাইড্রেসন পয়েন্ট নিশ্চিতকরণ।',
        'শীর্ষস্থানীয় ব্র্যান্ডের সাথে আলোচনা করে প্রয়োজনীয় অর্থায়ন ও মার্চেন্ডাইজ স্পনসরশিপ সংগ্রহ।',
        'রানের সমাপনী মঞ্চে বর্ণাঢ্য সাংস্কৃতিক পরিবেশনার সাউন্ড ও মঞ্চ সমন্বয় সফলভাবে সম্পন্ন।'
      ]
    }
  }
];

export const techProjectsData: TechProject[] = [
  {
    id: 'theatre-rehearsal-os',
    title: {
      en: 'Theatre Rehearsal Management System',
      bn: 'থিয়েটার রিহার্সাল ম্যানেজমেন্ট সিস্টেম'
    },
    category: {
      en: 'Production Operations & Web App',
      bn: 'নাট্য প্রযোজনা ও ওয়েব প্ল্যাটফর্ম'
    },
    problem: {
      en: 'Rehearsal scheduling across 20+ university actors is plagued by conflicting academic classes, missed call-sheets, manual paper notes, and disorganized scene trackers.',
      bn: '২০ জনের অধিক অভিনেতা-অভিনেত্রীদের ক্লাসের সময়সূচি ও মহড়ার সময় সমন্বয় করতে গিয়ে প্রতিনিয়ত শিডিউল বিপর্যয় ও দৃশ্যভিত্তিক মহড়ার হিসাব এলোমেলো হয়ে যেত।'
    },
    approach: {
      en: 'Engineered an interactive web application with dynamic calendar matrix, automatic SMS/email call notifications, scene-by-scene actor requirement matrix, and real-time rehearsal log notes.',
      bn: 'রিয়্যাক্ট ও সুপারবেস দিয়ে একটি পূর্ণাঙ্গ ওয়েব অ্যাপ তৈরি; যেখানে ক্যালেন্ডার ম্যাট্রিক্স, স্বয়ংক্রিয় কল-শিট নোটিফিকেশন এবং দৃশ্যভিত্তিক অভিনেতাদের উপস্থিতির ট্র্যাকিং রাখা যায়।'
    },
    stack: ['React.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vite', 'Web Push'],
    result: {
      en: 'Reduced rehearsal scheduling conflicts by 75% and shortened call-sheet dissemination from 4 hours to instantaneous push dispatch.',
      bn: 'মহড়ার সময়সূচি সংক্রান্ত ভুলত্রুটি ৭৫% কমে যায় এবং মহড়া শুরুর আগে সবাইকে সময়মতো নোটিফিকেশন পৌঁছে দেওয়া সম্ভব হয়।'
    },
    status: 'deployed',
    github: 'https://github.com/atiquzzaman-shiblu/theatre-rehearsal-os',
    link: '#'
  },
  {
    id: 'ju-bus-gps',
    title: {
      en: 'JU Campus Transit GPS Tracker (Architecture Phase)',
      bn: 'জাবি ক্যাম্পাস বাস জিপিএস ট্র্যাকার'
    },
    category: {
      en: 'Campus Utility & IoT Mapping',
      bn: 'ক্যাম্পাস পরিবহন ও আইওটি ম্যাপিং'
    },
    problem: {
      en: 'Commuting students across Jahangirnagar University spend 30-45 minutes waiting at bus stops due to lack of real-time visibility into transit bus locations on Dhaka highways.',
      bn: 'ঢাকা-আরিচা মহাসড়কে জাবির বাসের সঠিক অবস্থান না জানার কারণে শত শত শিক্ষার্থীকে প্রতিদিন দীর্ঘক্ষণ স্ট্যান্ডে অপেক্ষা করতে হয়।'
    },
    approach: {
      en: 'Designing a lightweight progressive web application combining driver GPS pings via mobile telemetry, route ETA calculations, and Leaflet map rendering with offline PWA caching.',
      bn: 'বাসের লাইভ লোকেশন মোবাইল টেলিম্যাট্রিক্স ও লাইটওয়েট রিয়েলটাইম ডেটাবেসের মাধ্যমে ট্র্যাক করে ম্যাপে রিয়েলটাইম প্রদর্শন করার প্রযুক্তি নকশা।'
    },
    stack: ['React', 'Leaflet.js', 'WebSockets / Supabase Realtime', 'Progressive Web App (PWA)', 'Tailwind CSS'],
    result: {
      en: 'System architecture finalized; hardware GPS module test prototypes achieving 98.5% location packet delivery on test university routes.',
      bn: 'সিস্টেম আর্কিটেকচার ও প্রোটোটাইপ সম্পন্ন; প্রাথমিক ট্রায়ালে ৯৮.৫% নির্ভুল লোকেশন আপডেট নিশ্চিত হয়েছে।'
    },
    status: 'in-progress',
    github: 'https://github.com/atiquzzaman-shiblu/ju-bus-gps-tracker',
    link: '#'
  },
  {
    id: 'event-automation-workflows',
    title: {
      en: 'Autonomous Workflow Engine (n8n / Make / Apps Script)',
      bn: 'স্বয়ংক্রিয় ওয়ার্কফ্লো ইঞ্জিন (n8n / Make / Apps Script)'
    },
    category: {
      en: 'Process Automation & API Integrations',
      bn: 'প্রসেস অটোমেশন ও এপিআই সংহতকরণ'
    },
    problem: {
      en: 'Manual ticketing, payment verification, certificate generation, and spreadsheet data entry for 2,500+ attendees consumed hundreds of manual volunteer hours.',
      bn: '২৫০০+ অংশগ্রহণকারীর রেজিস্ট্রেশন যাচাই, ডিজিটাল সার্টিফিকেট তৈরি এবং তথ্য সংরক্ষণ করতে শত শত ঘণ্টার মানবশ্রম অপচয় হতো।'
    },
    approach: {
      en: 'Architected automated pipelines chaining Google Sheets, Make.com, n8n webhooks, transactional email APIs, and PDF certificate generation triggers.',
      bn: 'গুগল শিট, মেক ডটকম, এনএইটন (n8n) ওয়েবহুক এবং অটোমেটেড পিডিএফ জেনারেশনের সমন্বয়ে সম্পূর্ণ স্বয়ংক্রিয় পাইপলাইন তৈরি।'
    },
    stack: ['Make.com', 'n8n', 'Google Apps Script', 'REST APIs', 'Cloudflare Workers', 'JSON Schema'],
    result: {
      en: 'Automated 100% of event receipts, dynamic QR barcode admissions, and PDF certificates, saving over 120 volunteer hours per event cycle.',
      bn: 'স্বয়ংক্রিয়ভাবে কিউআর কোড টিকিট এবং ভেরিফাইড সার্টিফিকেট বিতরণ সম্পন্ন হয়েছে, যা প্রতিটি ইভেন্টে ১২০+ কর্মঘণ্টা সাশ্রয় করেছে।'
    },
    status: 'live',
    link: '#'
  }
];

export const skillNodesData: SkillNode[] = [
  // Theatre Skills
  { id: 'acting', name: 'Method & Physical Acting', category: 'theatre', level: 92, usedIn: { en: 'Rakta Karabi, Aar Koto Din', bn: 'রক্তকরবী, আর কত দিন' }, position: [-2.2, 1.2, 0.4] },
  { id: 'dramaturgy', name: 'Dramaturgy & Text Analysis', category: 'theatre', level: 88, usedIn: { en: 'Departmental Academic Productions', bn: 'বিভাগীয় প্রযোজনা ও গবেষণা' }, position: [-1.6, 2.0, -0.6] },
  { id: 'scenography', name: 'Stage & Scenographic Design', category: 'theatre', level: 90, usedIn: { en: '1:12 Chemistry Lab Set Model', bn: '১:১২ রসায়ন ল্যাব মঞ্চ মডেল' }, position: [-2.8, -0.4, 0.2] },
  { id: 'lighting', name: 'Theatrical Stage Lighting', category: 'theatre', level: 84, usedIn: { en: 'Shilpakala Academy Stage Crew', bn: 'শিল্পকলা একাডেমি স্টেজ রিগ' }, position: [-1.4, -1.2, -0.4] },
  { id: 'script-editing', name: 'Script Editing & Adaptation', category: 'theatre', level: 86, usedIn: { en: 'Tagore & Contemporary Adaptations', bn: 'নাট্যপাঠ সম্পাদনা' }, position: [-3.2, 0.8, -0.2] },

  // Leadership Skills
  { id: 'editorial', name: 'Editorial Leadership & Journalism', category: 'leadership', level: 94, usedIn: { en: 'TSC-Affiliated Newspaper', bn: 'টিএসসি অনুমোদিত সংবাদপত্র' }, position: [0.2, 2.3, 0.8] },
  { id: 'event-production', name: 'Mega Event Management', category: 'leadership', level: 95, usedIn: { en: 'JUCSU Run 2026 (2,500+ Runners)', bn: 'জাকসু রান ও ব্যাচ ফেস্টিভ্যাল' }, position: [0.0, 1.1, -0.8] },
  { id: 'sponsorship', name: 'Sponsorship & Corporate Outreach', category: 'leadership', level: 89, usedIn: { en: '12+ Brand Partnerships', bn: '১২+ করপোরেট স্পন্সর চুক্তি' }, position: [0.6, -0.5, 0.9] },
  { id: 'team-coordination', name: 'Cross-Functional Team Direction', category: 'leadership', level: 92, usedIn: { en: '85+ Member Volunteer Squad', bn: '৮৫ সদস্যের ভলান্টিয়ার টিম' }, position: [-0.4, -1.8, 0.3] },
  { id: 'crisis-management', name: 'Crowd & Operations Logistics', category: 'leadership', level: 87, usedIn: { en: 'Campus Route Safety Protocols', bn: 'ম্যারাথন নিরাপত্তা পরিকল্পনা' }, position: [0.8, -1.5, -0.7] },

  // Tech Skills
  { id: 'react', name: 'React.js & TypeScript', category: 'tech', level: 86, usedIn: { en: 'Rehearsal OS, Bus Tracker UI', bn: 'থিয়েটার রিহার্সাল ও বাস ট্র্যাকার' }, position: [2.1, 1.5, 0.5] },
  { id: 'threejs', name: '3D Web & Three.js / WebGL', category: 'tech', level: 82, usedIn: { en: 'The Stage Interactive Portfolio', bn: 'দ্য স্টেজ থ্রিডি পোর্টফোলিও' }, position: [1.8, 2.2, -0.5] },
  { id: 'automations', name: 'Automation (Make / n8n / APIs)', category: 'tech', level: 91, usedIn: { en: 'Event Pipeline Automations', bn: 'ইভেন্ট অটোমেশন পাইপলাইন' }, position: [2.8, 0.2, 0.6] },
  { id: 'supabase', name: 'Supabase & Backend Architecture', category: 'tech', level: 85, usedIn: { en: 'Cloud Database & Auth', bn: 'ক্লাউড ডেটাবেস ও অথেন্টিকেশন' }, position: [1.6, -0.8, -0.6] },
  { id: 'design-cad', name: 'Blender & 3D Architectural CAD', category: 'tech', level: 88, usedIn: { en: 'Miniature Set Modeling & Drafting', bn: 'মঞ্চ আর্কিটেকচারাল থ্রিডি মডেল' }, position: [2.6, -1.4, 0.2] }
];

export const academicVisionContent = {
  quote: {
    en: '"Theatre is the laboratory of the human soul; technology is the lens through which we amplify its voice."',
    bn: '"থিয়েটার মানুষের আত্মিক উপলব্ধির পরীক্ষাগার; আর প্রযুক্তি হলো সেই মাধ্যম যা তার বক্তব্যকে বৃহত্তর প্রেক্ষাপটে প্রস্ফুটিত করে।"'
  },
  goal: {
    en: "Master's in Theatre Studies & Performance Practice",
    bn: "মাস্টার্স ইন থিয়েটার স্টাডিজ ও পারফরম্যান্স প্র্যাকটিস"
  },
  institutions: [
    {
      name: { en: 'Trinity College Dublin', bn: 'ট্রিনিটি কলেজ ডাবলিন' },
      country: { en: 'Ireland 🇮🇪', bn: 'আয়ারল্যান্ড 🇮🇪' },
      department: { en: 'The Lir Academy / School of Creative Arts', bn: 'দ্য লির একাডেমি / স্কুল অব ক্রিয়েটিভ আর্টস' },
      focus: {
        en: 'Contemporary dramaturgy, proscenium scenography, and the synthesis of classical theatrical forms with computational staging.',
        bn: 'সমকালীন নাট্যতত্ত্ব, দৃশ্যশিল্প এবং সনাতন থিয়েটারের সাথে আধুনিক ডিজিটাল প্রযুক্তির মেলবন্ধন।'
      }
    },
    {
      name: { en: 'University of Galway', bn: 'ইউনিভার্সিটি অব গ্যালওয়ে' },
      country: { en: 'Ireland 🇮🇪', bn: 'আয়ারল্যান্ড 🇮🇪' },
      department: { en: 'O\'Donoghue Centre for Drama, Theatre and Performance', bn: 'ও\'ডনাহু সেন্টার ফর ড্রামা, থিয়েটার অ্যান্ড পারফরম্যান্স' },
      focus: {
        en: 'Archival dramaturgy, Irish-Bengali anti-colonial dramatic parallels (Tagore / Yeats / Synge), and physical ensemble direction.',
        bn: 'ঔপনিবেশিকতাবিরোধী নাট্যতত্ত্ব (রবীন্দ্রনাথ ও ইয়েটস-এর আন্তঃসম্পর্ক), শারীরিক থিয়েটার ও মহাফেজখানা ভিত্তিক গবেষণা।'
      }
    }
  ],
  researchStatement: {
    en: 'My intended graduate research investigates the intersection between dramatic dramaturgy and spatial digital scenography — bridging traditional Bengali folk and classical texts (such as Rabindranath Tagore) with responsive stage technologies. Having lived between the sensory craft of the rehearsal hall, newsroom editorial rigor, and algorithmic web automation, my aspiration is to build intercultural bridges between Dhaka and Ireland\'s legendary dramatic tradition.',
    bn: 'আমার উচ্চশিক্ষার মূল লক্ষ্য বাংলা ধ্রুপদী ও লোকনাট্য ঐতিহ্যের (বিশেষ করে রবীন্দ্রনাথ ঠাকুরের নাট্যদর্শন) সাথে আধুনিক ত্রিমাত্রিক দৃশ্যশিল্প ও ডিজিটাল স্পেশাল আর্কিটেকচারের সেতুবন্ধন রচনা করা। নাট্যমঞ্চের সৃজনশীলতা, সাংবাদিকতার দায়িত্বশীলতা এবং ওয়েব অটোমেশনের কারিগরি দক্ষতাকে কাজে লাগিয়ে আয়ারল্যান্ডের সমৃদ্ধ নাট্যসংস্কৃতি ও বাংলাদেশের থিয়েটারের মধ্যে আন্তঃসাংস্কৃতিক নাট্যগবেষণা এগিয়ে নিতে চাই।'
  }
};
