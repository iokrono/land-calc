import Container from "react-bootstrap/Container";
import React from 'react';
import calculator from "../service/area-calculator";
import "./ResultHistory.css";

const formatFormula = (value) => calculator.formatValues(value.calcValues) + ' = ' + calculator.formatValue({
    value: value.currentResult,
    type: 'm2'
});

const ResultHistory = (props) => {

    const handleSelectItem = (index) => {
        props.selectItem(index);
    };

    return (
        <Container>
            <h2>Povijest</h2>
            <ul>
                {
                    props.history.length ?
                        props.history.map((value, index) =>
                            (<li
                                key={`history-${index}`}
                                data-toggle="tooltip"
                                data-html="true"
                                title="ODaberite rezultat"
                                onClick={() => handleSelectItem(index)}
                            >
                                {formatFormula(value)}
                            </li>)
                        ) : 'Nema povijesti'
                }
            </ul>
        </Container>
    );
};

export default ResultHistory;
