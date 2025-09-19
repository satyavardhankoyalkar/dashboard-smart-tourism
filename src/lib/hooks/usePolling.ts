"use client";

import { useEffect, useRef, useState } from "react";

export function usePolling<T>(
  fetcher: () => Promise<T>,
  intervalMs: number,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function tick() {
      try {
        const result = await fetcher();
        if (!isCancelled) setData(result);
        setError(null);
      } catch (err) {
        if (!isCancelled) setError(err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    tick();
    // @ts-expect-error setInterval typing in DOM
    timerRef.current = window.setInterval(tick, intervalMs);
    return () => {
      isCancelled = true;
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [fetcher, intervalMs]);

  return { data, isLoading, error } as const;
}


