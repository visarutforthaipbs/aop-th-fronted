"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import th from "@/locales/th";
import en from "@/locales/en";

const TRANSLATIONS = { th, en };
const DATE_LOCALES = { th: "th-TH", en: "en-US" };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("th");

  useEffect(() => {
    const saved = localStorage.getItem("aop_lang");
    if (saved === "en" || saved === "th") setLangState(saved);
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem("aop_lang", l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}

/**
 * Convenience hook: returns translation object, date locale, and booleans.
 */
export function useTranslation() {
  const { lang, setLang } = useLanguage();
  return {
    lang,
    setLang,
    t: TRANSLATIONS[lang] || TRANSLATIONS.th,
    dateLocale: DATE_LOCALES[lang] || "th-TH",
    isEn: lang === "en",
    isTh: lang === "th",
  };
}
