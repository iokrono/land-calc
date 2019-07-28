import React from 'react';
import calculator from "../service/area-calculator";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'

const calcTypes = Object.keys(calculator.types).map(val => {
    return {
        label: calculator.types[val].friendlyName,
        value: val
    };
});

const CalcFormRow = React.memo((props) => {

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
                    placeholder="Površina"
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
                            key={calcType.value}
                            value={calcType.value}>
                            {calcType.label}
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
                                value={calcType.value}
                                variant="light"
                                key={calcType.value}
                            >
                                {calcType.label}
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
