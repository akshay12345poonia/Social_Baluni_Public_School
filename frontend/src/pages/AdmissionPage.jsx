import { useState } from 'react';
import { FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';
import api from '../api/axios';
import { SITE } from '../data/site';

const CLASSES = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI (Science)', 'XI (Commerce)', 'XII'];
const INITIAL_FORM = {
  studentName: '',
  dateOfBirth: '',
  classApplying: '',
  parentName: '',
  email: '',
  phone: '',
  previousSchool: '',
  address: '',
};

const inputClass = 'w-full rounded-xl border border-gray-200 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20';

export default function AdmissionPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [applicationNo, setApplicationNo] = useState('');
  const [error, setError] = useState('');

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const application = { ...form };
      if (!application.dateOfBirth) delete application.dateOfBirth;
      const response = await api.post('/admissions', application);
      setApplicationNo(response.data.data.applicationNo);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (requestError) {
      setStatus('error');
      setError(requestError.response?.data?.message || 'We could not submit your application. Please try again or contact admissions.');
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-ink via-[#38202c] to-brand-maroon py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Admissions</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-6xl">A strong start for every ambition.</h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/80">Apply to Social Baluni Public School, Dehradun. Submit the form and keep your application number to follow up with our admissions team.</p>
        </div>
      </section>
      <section className="bg-brand-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-3xl bg-white p-7 shadow-card md:p-9">
            <FaClipboardCheck className="text-3xl text-brand-maroon" />
            <h2 className="mt-4 font-display text-2xl font-bold">What happens next?</h2>
            <ol className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
              <li><strong className="text-brand-ink">1. Submit your application.</strong><br />Our team will review the details you provide.</li>
              <li><strong className="text-brand-ink">2. Save your application number.</strong><br />Use it when you contact the admissions office.</li>
              <li><strong className="text-brand-ink">3. Talk with our team.</strong><br />We will help you with the next steps and campus visit.</li>
            </ol>
            <div className="mt-8 border-t border-gray-100 pt-6 text-sm">
              <p className="font-semibold">Admissions helpline</p>
              {SITE.phones.map((phone) => <a key={phone} className="mt-2 block text-brand-maroon hover:underline" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>)}
            </div>
          </aside>
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <FaCheckCircle className="text-5xl text-brand-green" />
                <h2 className="mt-5 font-display text-3xl font-bold">Application received</h2>
                <p className="mt-3 text-gray-600">Please save this application number for your records:</p>
                <p className="mt-3 rounded-xl bg-brand-cream px-5 py-3 font-bold text-brand-maroon">{applicationNo}</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-semibold text-brand-maroon hover:underline">Submit another application</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-bold">Student application</h2>
                  <p className="mt-2 text-sm text-gray-600">Fields marked with * are required.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium">Student name *<input required name="studentName" autoComplete="name" value={form.studentName} onChange={update} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm font-medium">Class applying for *<select required name="classApplying" value={form.classApplying} onChange={update} className={`${inputClass} mt-2`}><option value="">Select a class</option>{CLASSES.map((level) => <option key={level}>{level}</option>)}</select></label>
                  <label className="text-sm font-medium">Parent / guardian name<input name="parentName" autoComplete="family-name" value={form.parentName} onChange={update} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm font-medium">Date of birth<input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={update} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm font-medium">Email address *<input required type="email" name="email" autoComplete="email" value={form.email} onChange={update} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm font-medium">Phone number *<input required type="tel" name="phone" autoComplete="tel" pattern="[0-9+ -]{10,15}" value={form.phone} onChange={update} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm font-medium sm:col-span-2">Previous school<input name="previousSchool" value={form.previousSchool} onChange={update} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm font-medium sm:col-span-2">Home address<textarea name="address" rows="3" value={form.address} onChange={update} className={`${inputClass} mt-2`} /></label>
                </div>
                {status === 'error' && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <button disabled={status === 'loading'} className="w-full rounded-xl bg-brand-maroon px-6 py-3.5 font-semibold text-white transition hover:bg-brand-maroon-dark disabled:cursor-wait disabled:opacity-60">
                  {status === 'loading' ? 'Submitting application…' : 'Submit application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
