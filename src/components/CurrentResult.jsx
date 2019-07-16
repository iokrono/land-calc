import Container from "react-bootstrap/Container";
import React from 'react';
import calculator from "../service/area-calculator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const typeKeys = Object.keys(calculator.types);

const CurrentResult = (props) => {

    const formatResult = (type) => {
        return calculator.formatValue({
            value: calculator.calcFromM2(
                {
                    value: props.currentResult,
                    type
                }),
            type
        });
    };

    const formatFormula = () => calculator.formatValues(props.calcValues) + ' = ';

    return (
        <Container>
            Rezultat: {
            props.currentResult ? (
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Row>
                        <Col>{formatFormula()}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs lg="1">
                        </Col>
                        <Col md="auto">
                            {
                                typeKeys.map((key, index) =>
                                    <Row key={`results-${index}`}>
                                        <Col>{formatResult(key)}</Col>
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
