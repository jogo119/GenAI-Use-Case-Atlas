'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'genai-use-case-compare';

const readIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeIds = (ids: string[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

export const useCompareStore = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    setCompareIds(readIds());
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id].slice(0, 4);
      writeIds(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    writeIds([]);
    setCompareIds([]);
  }, []);

  return { compareIds, toggleCompare, clearCompare };
};
