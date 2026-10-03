import { useEffect, useState } from 'react';
import api from '../api/axios';
import Hero from '../components/home/Hero';
import NoticeTicker from '../components/home/NoticeTicker';
import StatsBar from '../components/home/StatsBar';
import ThreePillars from '../components/home/ThreePillars';
import NewsAndEvents from '../components/home/NewsAndEvents';
import ProgramsSection from '../components/home/ProgramsSection';
import SportsHub from '../components/home/SportsHub';
import AchievementsWall from '../components/home/AchievementsWall';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';
import EnquirySection from '../components/home/EnquirySection';

export default function Home() {
  const [data, setData] = useState(null);
  const [apiUnavailable, setApiUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    api.get('/home')
      .then((res) => {
        if (active) setData(res.data.data);
      })
      .catch((error) => {
        console.error('Unable to load homepage data:', error);
        if (active) setApiUnavailable(true);
      });
    return () => { active = false; };
  }, []);

  return (
    <>
      {apiUnavailable && <div role="status" className="bg-amber-50 px-6 py-2 text-center text-sm text-amber-900">Some live school information is temporarily unavailable. Showing the latest available content.</div>}
      <Hero banners={data?.banners} />
      <NoticeTicker notices={data?.notices} />
      <StatsBar stats={data?.stats} />
      <ThreePillars />
      <NewsAndEvents news={data?.news} events={data?.events} />
      <ProgramsSection programs={data?.programs} />
      <SportsHub sports={data?.sports} />
      <AchievementsWall achievements={data?.achievements} />
      <GalleryPreview />
      <Testimonials testimonials={data?.testimonials} />
      <EnquirySection />
    </>
  );
}