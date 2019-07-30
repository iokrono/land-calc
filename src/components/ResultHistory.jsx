import Container from "react-bootstrap/Container";
import React from 'react';
import calculator from "../service/area-calculator";
import "./ResultHistory.css";
import {FormattedMessage} from "react-intl";
import {useFormatMessage} from "@comparaonline/react-intl-hooks";

const formatFormula = (value, t) => calculator.formatValues(value.calcValues, t) + ' = ' +
    calculator.formatValue({
        value: value.currentResult,
        type: 'm2'
    }, t);

const ResultHistory = (props) => {

    const t = useFormatMessage();

    const handleSelectItem = (index) => {
        props.selectItem(index);
    };

    return (
        <Container>
            <h2>
                <FormattedMessage
                    id="components.ResultHistory.history"
                    defaultMessage="History"
                />
            </h2>
            <ul>
                {
                    props.history.length ?
                        props.history.map((value, index) =>
                            (<li
                                key={`history-${index}`}
                                data-toggle="tooltip"
                                data-html="true"
                                title={t('components.ResultHistory.results.select')}
                                onClick={() => handleSelectItem(index)}
                            >
                                {formatFormula(value, t)}
                            </li>)
                        ) : t('components.ResultHistory.results.no-history')
                }
            </ul>
        </Container>
    );
};

export default ResultHistory;
