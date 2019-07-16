import React from 'react';
import CalcFormRow from "./CalcFormRow";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'

const CalcForm = (props) => {

    const handleClearForm = (event) => {
        event.preventDefault();
        props.clearForm(event);
    };

    return (
        <Form onSubmit={handleClearForm}>
            <Container>
                {props.calcValues.map((calcValue, index) =>
                    <CalcFormRow
                        key={`row-${index}`}
                        index={index}
                        calcValue={calcValue}
                        updateRow={props.rowInputChange}
                        removeRow={props.calcValues.length > 1 && props.removeRow}
                    />
                )}
                <Row className="mt-2">
                    <Col sm={1}>
                        <Button
                            className="btn-info"
                            onClick={props.addNewRow}
                        >
                            <i className="fas fa-plus"></i>
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="submit"
                            className="btn-success"
                        >
                            Obriši
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};

export default CalcForm;
