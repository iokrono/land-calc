import {addLocaleData, IntlProvider} from "react-intl";
import {InjectIntlContext} from "@comparaonline/react-intl-hooks";
import React, {useState} from "react";

import en from "react-intl/locale-data/en";
import hr from "react-intl/locale-data/hr";
import messages_en from "../translations/en.json";
import messages_hr from "../translations/hr.json";

const messages = {
    "en": messages_en,
    "hr": messages_hr,
};
const languages = Object.keys(messages);
const language = navigator.language.split(/[-_]/)[0];  // language without region code

addLocaleData([...en, ...hr]);

const Context = React.createContext({});

const IntlConfig = (props) => {

    const {children} = props;

    const changeLanguage = (lang) => {
        setSelectedLanguage({
            ...selectedLanguage,
            name: lang,
            messages: messages[lang],
        });
    };

    const [selectedLanguage, setSelectedLanguage] = useState({
        name: language,
        messages: messages[language],
        languages,
        changeLanguage
    });

    return (
        <Context.Provider value={selectedLanguage}>
            <IntlProvider
                key={selectedLanguage.name}
                defaultLocale={language}
                locale={selectedLanguage.name}
                messages={selectedLanguage.messages}>
                <InjectIntlContext>
                    {children}
                </InjectIntlContext>
            </IntlProvider>
        </Context.Provider>
    );
};

export {IntlConfig, Context as IntlContext};
