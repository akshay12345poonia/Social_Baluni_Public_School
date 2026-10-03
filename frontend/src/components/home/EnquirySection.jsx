import { useState } from 'react';
import { FaPhoneAlt, FaCalendarCheck, FaUserPlus, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';
import api from '../../api/axios';
import { SITE } from '../../data/site';

const STEPS = [
  { icon: FaUserPlus, title: '1. Enquire', desc: 'Fill the form or call the admissions cell.' },
  { icon: FaCalendarCheck, title: '2. Visit & Assess', desc: 'Campus tour + interaction/entrance assessment.' },
  { icon: FaClipboardCheck, title: '3. Apply & Track', desc: 'Submit the online application, track it by number.' },
];

const CLASSES = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI (Science)', 'XI (Commerce)', 'XII'];

export default function EnquirySection() {
  const [form, setForm] = useState({ studentName: '', parentName: '', email: '', phone: '', classApplying: '', message: '' });
  const [status, setStatus] = useState('idle');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/enquiries', form);
      setStatus('success');
      setForm({ studentName: '', parentName: '', email: '', phone: '', classApplying: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const input = 'w-full rounded-xl border border-gray-200 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20';

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-maroon">Admissions Open 2025–26</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Begin Your Child's Journey at SBPS</h2>
          <p className="mt-4 max-w-lg leading-relaxed text-gray-600">
            One campus, three pathways — CBSE schooling, defence excellence and IIT/NEET preparation.
            Our admissions team responds within 24 hours.
          </p>

          <div className="mt-8 space-y-5">
            {STEPS.map((s) => (
              <div key={s.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-maroon text-white"><s.icon /></div>
                <div>
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-brand-cream p-5 text-sm">
            <p className="flex items-center gap-2 font-semibold"><FaPhoneAlt className="text-brand-maroon" /> Admissions Helpline</p>
            <p className="mt-2 text-gray-600">{SITE.phones.join(' • ')}</p>
            <p className="mt-1 text-gray-600">{SITE.emails.join(' • ')}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-brand-maroon to-brand-maroon-dark p-8 shadow-card md:p-10">
          {status === 'success' ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center text-white">
              <FaCheckCircle className="mb-4 text-5xl text-brand-gold" />
              <h3 className="font-display text-2xl font-bold">Enquiry Received!</h3>
              <p className="mt-2 text-gray-200">Our admissions team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-white">Admission Enquiry</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Student Name *" value={form.studentName} onChange={set('studentName')} className={input} />
                <input placeholder="Parent Name" value={form.parentName} onChange={set('parentName')} className={input} />
              </div>
              <input required type="email" placeholder="Email ID *" value={form.email} onChange={set('email')} className={input} />
              <input required type="tel" pattern="[0-9+ -]{10,15}" placeholder="Mobile No. *" value={form.phone} onChange={set('phone')} className={input} />
              <select required value={form.classApplying} onChange={set('classApplying')} className={input}>
                <option value="">Select Class *</option>
                {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea rows="3" placeholder="Your Message" value={form.message} onChange={set('message')} className={input} />
              <button disabled={status === 'loading'} className="w-full rounded-xl bg-brand-gold py-3.5 font-bold text-brand-ink transition hover:bg-brand-gold-dark disabled:opacity-60">
                {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
              </button>
              {status === 'error' && <p className="text-sm text-red-300">Something went wrong. Please call the helpline directly.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}