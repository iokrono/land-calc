import React from 'react';
import Calculator from "./components/Calculator";
import SwitchLanguage from "./components/SwitchLanguage";
import {IntlConfig} from "./components/IntlConfig";
import {FormattedMessage} from "react-intl";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";


const App = () => {

    return (
        <IntlConfig>
            <Form className="switch-language">
                <Form.Row>
                    <Form.Label column sm={10}>
                        <FormattedMessage
                            id="components.App.select-language"
                            defaultMessage="Select language"
                        />
                    </Form.Label>
                    <Col sm={1}>
                        <SwitchLanguage/>
                    </Col>
                </Form.Row>
            </Form>
            <Calculator/>
        </IntlConfig>
    );
};

export default App;
