import Container from "react-bootstrap/Container";
import React from 'react';
import calculator from "../service/area-calculator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormattedMessage} from "react-intl";
import {useFormatMessage} from "@comparaonline/react-intl-hooks";

const typeKeys = Object.keys(calculator.types);

const formatResult = (type, props, t) => {
    return calculator.formatValue({
        value: calculator.calcFromM2(
            {
                value: props.currentResult,
                type
            }),
        type
    }, t);
};

const formatFormula = (props, t) => calculator.formatValues(props.calcValues, t) + ' = ';

const CurrentResult = (props) => {

    const t = useFormatMessage();

    return (
        <Container>
            <FormattedMessage
                id="components.CurrentResult.result"
                defaultMessage="Result"
            />:
            {
                props.currentResult ? (
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <Row>
                            <Col>{formatFormula(props, t)}</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs lg="1">
                            </Col>
                            <Col md="auto">
                                {
                                    typeKeys.map((key, index) =>
                                        <Row key={`results-${index}`}>
                                            <Col>{formatResult(key, props, t)}</Col>
                                        </Row>
                                    )
                                }
                            </Col>
                            <Col xs lg="1">
                            </Col>
                        </Row>
                    </div>
                ) : '-'}
        </Container>
    );
};

export default CurrentResult;
