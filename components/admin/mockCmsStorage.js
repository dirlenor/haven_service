"use client";

import { mockCmsSeed } from "./mockCmsSeed";

const STORAGE_KEY = "mock-cms-data";

export const loadMockCmsData = () => {
  if (typeof window === "undefined") {
    return mockCmsSeed;
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return mockCmsSeed;
    }
    const parsed = JSON.parse(stored);
    if (!parsed?.services || !parsed?.articles) {
      return mockCmsSeed;
    }
    return parsed;
  } catch {
    return mockCmsSeed;
  }
};

export const saveMockCmsData = (next) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

