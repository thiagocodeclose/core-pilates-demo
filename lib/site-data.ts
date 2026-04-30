export const siteData = {
  gym: {
    name: 'Core Method',
    tagline: 'Precision Pilates',
    location: 'San Francisco, CA',
    address: '318 Hayes St, San Francisco, CA 94102',
    phone: '(415) 555-0162',
    email: 'hello@coremethod.com',
  },
  stats: [
    { value: '15+', label: 'Years in Practice' },
    { value: '8', label: 'Certified Instructors' },
    { value: '20', label: 'Reformer Studios' },
    { value: '7AM–7PM', label: 'Studio Hours' },
  ],
  classes: [
    { name: 'Reformer Fundamentals', level: 'Beginner', duration: '55 min', desc: 'Introduction to the Pilates reformer. Learn proper setup, spring resistance, and foundational movements with close instructor attention.' },
    { name: 'Reformer Flow', level: 'Intermediate', duration: '55 min', desc: 'A smooth, continuous sequence on the reformer emphasising breath coordination, spinal articulation, and functional stability.' },
    { name: 'Mat Pilates', level: 'All Levels', duration: '50 min', desc: 'Classical Pilates mat work — 34 exercises in the original sequence. Pure core control, no equipment required.' },
    { name: 'Tower Class', level: 'Intermediate–Advanced', duration: '55 min', desc: 'The Cadillac Tower apparatus for deep spinal mobilisation, hip work, and overhead stability patterns.' },
    { name: 'Private Session', level: 'All Levels', duration: '55 min', desc: 'One-on-one instruction on any apparatus. Fully customised to your body, your goals, and your injuries.' },
    { name: 'Pre/Post Natal', level: 'Specialised', duration: '50 min', desc: 'Modified Pilates specifically designed for pregnancy and postpartum recovery, led by a certified perinatal specialist.' },
  ],
  principles: [
    { name: 'Centering', desc: 'Every movement originates from the powerhouse — the deep core muscles of the abdomen, lower back, hips, and glutes.' },
    { name: 'Concentration', desc: 'Full mental attention on each exercise. Pilates is a practice of the mind as much as the body.' },
    { name: 'Control', desc: 'No movement is accidental. Complete muscular control over every action creates strength, not strain.' },
    { name: 'Precision', desc: 'Correct execution over repetition. One perfectly-executed movement is worth twenty sloppy ones.' },
  ],
  pricing: [
    {
      name: 'Single Session',
      price: '$50',
      period: 'per class',
      features: ['Any group class format', 'Reformer or mat', 'All levels welcome', 'Online booking'],
      highlight: false,
    },
    {
      name: 'Monthly Membership',
      price: '$220',
      period: 'per month',
      features: ['Unlimited group classes', 'Early booking access', '10% off privates', 'New client consultation', 'Progress tracking'],
      highlight: true,
    },
    {
      name: 'Private Block',
      price: '$420',
      period: '5 sessions · 3 months',
      features: ['5 private sessions', 'Customised program', 'Any apparatus', 'Flexible scheduling', 'Progress report'],
      highlight: false,
    },
  ],
};
