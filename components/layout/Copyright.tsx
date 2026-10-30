"use client";

import { useEffect, useState } from "react";

export function Copyright() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    const update = () => setYear(new Date().getFullYear());
    const timeout = window.setTimeout(update, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return <p>© {year} B&JEvents. All rights reserved.</p>;
}
