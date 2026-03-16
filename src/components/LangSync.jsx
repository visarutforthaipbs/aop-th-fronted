"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Syncs the <html lang="..."> attribute with the current language state
export default function LangSync() {
    const { lang } = useLanguage();

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return null;
}
