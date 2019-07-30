import Form from "react-bootstrap/Form";
import React from "react";
import {IntlContext} from "./IntlConfig";

const SwitchLanguage = () => {

    const { name: selectedLanguage, languages, changeLanguage } = React.useContext(IntlContext);

    const handleSelectChange = (event) => {
        if (event.target && event.target.value)
            changeLanguage(event.target.value);
    };

    return (
        <Form.Control as="select"
                      name="switch-language"
                      value={selectedLanguage}
                      onChange={handleSelectChange}>
            {languages.map((lang) =>
                <option
                    key={lang}
                    value={lang}>
                    {lang}
                </option>
            )}
        </Form.Control>
    );
};

export default SwitchLanguage;
