import { useEffect, useState } from 'react';

export default function Counter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 1600;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return <span>{display.toLocaleString('en-IN')}{suffix}</span>;
}