import React from 'react';
import calculator from "../service/area-calculator";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
import {useFormatMessage} from "@comparaonline/react-intl-hooks";

const calcTypes = Object.keys(calculator.types);

const CalcFormRow = React.memo((props) => {

    const t = useFormatMessage();

    const index = props.index;
    const calcValue = props.calcValue;

    const handleInputChange = (event) => {
        const {value} = event.target;
        props.updateRow(index, 'quantity', value);
    };

    const handleSelectChange = (event) => {
        if (event.target && event.target.value)
            props.updateRow(index, 'type', event.target.value);
    };

    const handleTypeChange = (event) => {
        props.updateRow(index, 'type', event);
    };

    const handleRemoveRow = () => {
        props.removeRow(index);
    };

    return (
        <Row
            noGutters={true}
            key={index}
            className="mb-1"
        >
            <Col sm={3}>
                <Form.Control
                    type="number"
                    placeholder={t('components.CalcFormRow.quantity')}
                    name={`quantity-${index}`}
                    value={calcValue.quantity}
                    onChange={handleInputChange}
                    autoFocus
                />
            </Col>
            <Col className="d-sm-none">
                <Form.Control as="select"
                              name={`type-small-${index}`}
                              value={calcValue.type}
                              onChange={handleSelectChange}>
                    {calcTypes.map((calcType) =>
                        <option
                            key={calcType}
                            value={calcType}>
                            {calculator.friendlyName(calcType, t)}
                        </option>
                    )}
                </Form.Control>
            </Col>
            <Col className="d-none d-sm-block">
                <ButtonToolbar>
                    <ToggleButtonGroup
                        type="radio"
                        name={`type-wide-${index}`}
                        value={calcValue.type}
                        onChange={handleTypeChange}
                    >
                        {calcTypes.map((calcType) =>
                            <ToggleButton
                                value={calcType}
                                variant="light"
                                key={calcType}
                            >
                                {calculator.friendlyName(calcType, t)}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                </ButtonToolbar>
            </Col>
            {props.removeRow &&
            (<Col>
                <Button
                    name={`remove-${index}`}
                    className="btn-danger"
                    onClick={handleRemoveRow}
                    key={index}
                >
                    <i className="fas fa-minus"></i>
                </Button>
            </Col>)
            }
        </Row>
    );
});

export default CalcFormRow;
