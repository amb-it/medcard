import React, {useState} from 'react';
import {IntlProvider} from 'react-intl';
import English from './translations/en.json';
import Ukrainian from "./translations/uk.json";

export const Context = React.createContext();

let lang;

let predefinedLang = localStorage.getItem('lang');
if (!predefinedLang) {
    lang = navigator.language.split(/[-_]/)[0];
    localStorage.setItem('lang', lang);
} else {
    lang = predefinedLang;
}

let translations;
if (lang==="uk") {
    translations = Ukrainian;
} else {
    translations = English;
}

const Localizer = (props) => {
    const [locale, setLocale] = useState(lang);

    const [messages, setMessages] = useState(translations);

    function selectLanguage(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (newLocale === 'uk') {
            setMessages(Ukrainian);
        } else {
            setMessages(English)
        }
        localStorage.setItem('lang', newLocale);
    }

    return (
        <Context.Provider value = {{locale, selectLanguage}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    );
}


export default Localizer;