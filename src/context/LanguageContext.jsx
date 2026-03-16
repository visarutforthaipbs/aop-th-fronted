"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({ lang: "th", setLang: () => { } });

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState("th");

    useEffect(() => {
        const saved = localStorage.getItem("aop_lang");
        if (saved === "en" || saved === "th") setLangState(saved);
    }, []);

    const setLang = (l) => {
        setLangState(l);
        localStorage.setItem("aop_lang", l);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
