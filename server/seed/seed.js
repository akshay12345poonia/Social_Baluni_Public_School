require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const News = require('../models/News');
const Event = require('../models/Event');
const Notice = require('../models/Notice');
const Achievement = require('../models/Achievement');
const Program = require('../models/Program');
const Sport = require('../models/Sport');
const Testimonial = require('../models/Testimonial');
const Setting = require('../models/Setting');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Seeding...');

  await Promise.all([
    User.deleteMany(), News.deleteMany(), Event.deleteMany(), Notice.deleteMany(),
    Achievement.deleteMany(), Program.deleteMany(), Sport.deleteMany(),
    Testimonial.deleteMany(), Setting.deleteMany(),
  ]);

  await User.create({
    name: 'SBPS Admin',
    email: 'admin@sbpsdoon.com',
    password: 'Admin@123',
    role: 'superadmin',
  });

  await Setting.create([
    {
      key: 'home',
      value: {
        banners: [
          { image: 'https://picsum.photos/seed/sbps-campus/1600/900', title: 'Where Discipline Meets Ambition', subtitle: 'CBSE schooling integrated with IIT / NEET / NDA preparation — Nursery to Class XII.' },
          { image: 'https://picsum.photos/seed/sbps-sports/1600/900', title: '20 Balunians at the 38th National Games', subtitle: 'A sports ecosystem built on professional coaching and national-level exposure.' },
          { image: 'https://picsum.photos/seed/sbps-nda/1600/900', title: 'Congratulations — NDA Selections, Once Again', subtitle: 'Doon Baluni Defence Academy: NDA, CDS, NA, SSB, AFCAT, RIMC, Sainik School & RMS.' },
        ],
      },
    },
    {
      key: 'stats',
      value: { students: 3000, staff: 400, institutions: 3, selections: 150 },
    },
  ]);

  await News.insertMany([
    { title: '20 SBPS students selected for 38th National Games Uttarakhand', summary: 'A historic moment — twenty Balunians will represent Uttarakhand at the National Games across fencing, shooting and athletics.', category: 'sports', isFeatured: true },
    { title: 'CBSE Board Results: SBPS students shine once again', summary: '100% pass result with a surge in 90%+ scorers across Science and Commerce streams.', category: 'result', isFeatured: true },
    { title: 'NDA written + SSB success stories from Doon Baluni Defence Academy', summary: 'Our defence wing records yet another year of NDA selections with dedicated SSB interview preparation.', category: 'achievement', isFeatured: true },
    { title: 'Annual Sports Meet 2025 — registrations open', summary: 'Inter-house competitions across 16 disciplines begin next month on the main grounds.', category: 'event' },
  ]);

  const now = new Date();
  await Event.insertMany([
    { title: 'Annual Day Celebration', description: 'Cultural performances, awards and parent showcase.', startDate: new Date(now.getTime() + 15 * 864e5), isFeatured: true },
    { title: 'Inter-House Cricket Finals', description: 'Senior division finals at the main ground.', startDate: new Date(now.getTime() + 7 * 864e5), category: 'sports' },
    { title: 'Parent-Teacher Meeting (Classes VI–XII)', description: 'Discuss board readiness and integrated program performance.', startDate: new Date(now.getTime() + 22 * 864e5) },
  ]);

  await Notice.insertMany([
    { title: 'Fee Schedule 2025-26 now available for download', audience: 'parents', isActive: true },
    { title: 'NCERT books list for session 2025-26', audience: 'students', isActive: true },
    { title: 'Hostel day-boarding circular for new admissions', audience: 'parents', isActive: true },
  ]);

  await Achievement.insertMany([
    { studentName: 'Aditya Baluni', title: 'NDA 150 — Selected', type: 'nda', detail: 'Doon Baluni Defence Academy', isFeatured: true },
    { studentName: 'Riya Panwar', title: 'JEE Advanced — AIR under 1000', type: 'iit', detail: 'Integrated school program', isFeatured: true },
    { studentName: 'Kartika Dobhal', title: 'Gold Medal — State Shooting Championship', type: 'sports', event: 'Uttarakhand State Championship', isFeatured: true },
    { studentName: 'Mohit Rawat', title: 'NEET Qualifier — Govt. MBBS seat', type: 'neet', isFeatured: true },
    { studentName: 'Fencing Team (Boys)', title: 'Bronze — National Games', type: 'sports', event: '38th National Games', isFeatured: true },
    { studentName: 'Ananya Semwal', title: 'NTSE State Scholar', type: 'olympiad', isFeatured: true },
  ]);

  await Program.insertMany([
    { name: 'IIT-JEE Integrated', tagline: 'School + JEE Main & Advanced under one roof', icon: 'FaAtom', highlights: ['Daily JEE-pattern practice', 'Doubt-clearing labs', 'Baluni Classes faculty'], stats: { selections: 42 }, order: 1 },
    { name: 'NEET Integrated', tagline: 'Medical foundation with board excellence', icon: 'FaStethoscope', highlights: ['NCERT-first approach', 'Weekly medical mocks'], stats: { selections: 35 }, order: 2 },
    { name: 'NDA & Defence', tagline: 'NDA, CDS, SSB, RIMC, Sainik School & RMS preparation', icon: 'FaShieldAlt', highlights: ['SSB interview grooming', 'Physical training regime', 'Ex-defence mentors'], stats: { selections: 50 }, order: 3 },
    { name: 'NTSE & KVPY', tagline: 'Scholarship and research-oriented excellence', icon: 'FaAward', highlights: ['Olympiad enrichment', 'Mentor circles'], stats: { selections: 23 }, order: 4 },
  ]);

  await Sport.insertMany([
    { name: 'Cricket', icon: 'FaBaseballBall', description: 'Professional cricket coaching with turf wickets and age-group squads.', facilities: ['Turf pitch', 'Bowling machines', 'Coach: ex-Ranji player'], order: 1 },
    { name: 'Football', icon: 'FaFutbol', description: 'Full-size ground with structured house leagues.', facilities: ['Full-size ground', 'Goalkeeper training'], order: 2 },
    { name: 'Volleyball', icon: 'FaVolleyballBall', description: 'State-level squads for boys and girls.', facilities: ['2 courts', 'Spiking drills'], order: 3 },
    { name: 'Fencing', icon: 'FaShieldAlt', description: 'One of the few school fencing programs in Uttarakhand — National Games medalists.', facilities: ['Piste & gear', 'National coach'], order: 4 },
    { name: 'Shooting', icon: 'FaBullseye', description: '10m indoor range producing state champions.', facilities: ['10m range', 'Electronic targets'], order: 5 },
    { name: 'Boxing', icon: 'FaHandRock', description: 'Ring training with certified coaches.', facilities: ['Ring', 'Strength room'], order: 6 },
    { name: 'Athletics', icon: 'FaRunning', description: 'Track & field with specialised sprint/jump coaching.', facilities: ['200m track', 'Jump pits'], order: 7 },
    { name: 'Basketball', icon: 'FaBasketballBall', description: 'Floodlit courts and inter-school circuit participation.', facilities: ['2 floodlit courts'], order: 8 },
  ]);

  await Testimonial.insertMany([
    { name: 'Parent of Mohit Dobhal', role: 'Parent', className: 'Class VII', message: 'Child has shown remarkable improvement — the structured environment and sports exposure made all the difference.' },
    { name: 'Col. R. S. Negi (Retd.)', role: 'Parent of NDA cadet', className: 'Class XII', message: 'The discipline and physical culture here is exactly what defence aspirants need before the NDA.' },
    { name: 'Ishita Negi', role: 'Alumna', className: 'Batch 2022', message: 'The integrated JEE program saved me a year of juggling school and coaching. Faculty genuinely care.' },
  ]);

  console.log('✅ Seeding complete. Admin: admin@sbpsdoon.com / Admin@123');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((e) => { console.error(e); process.exit(1); });