'use client';
import { useEffect, useState } from 'react';

export default function PassBadge() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(document.cookie.split('; ').some(c => c.startsWith('weekly_pass=1')));
  }, []);

  if (!active) return null;
  return <span className="text-xs px-2 py-1 rounded-full border bg-white/70">Weekly Pass active</span>;
}
