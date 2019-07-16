import React, {useCallback, useEffect, useState} from 'react';
import CalcForm from "./components/CalcForm";
import CurrentResult from "./components/CurrentResult";
import ResultHistory from "./components/ResultHistory";
import calculator from "./service/area-calculator";
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import update from "immutability-helper";

const App = () => {

    const initialFormState = {type: Object.keys(calculator.types)[0], quantity: ''};

    const [calcValues, setCalcValues] = useState([initialFormState]);
    const [history, setHistory] = useState([]);
    const [currentResult, setCurrentResult] = useState(0);

    useEffect(() => {
        const result = calculator.calcToM2(calcValues);
        setCurrentResult(result);
    }, [calcValues]);

    const handleAddNewRow = () => {
        setCalcValues(update(calcValues, {$push: [initialFormState]}));
    };
    const handleRemoveRow = (index) => {
        if (calcValues.length > 1)
            setCalcValues(
                update(calcValues, {$splice: [[index, 1]]})
            );
    };

    const handleRowInputChange = (index, key, value) => {
        setCalcValues(
            update(calcValues, {
                    [index]: {[key]: {$set: value}}
                }
            )
        );
    };

    const handleClearForm = (event) => {
        if (currentResult) {
            setHistory([
                {
                    calcValues,
                    currentResult
                },
                ...history
            ]);
        }
        setCalcValues([initialFormState]);
    };

    const handleSelectItem = useCallback((index) => {
        const selected = history[index];
        setCalcValues(selected.calcValues);
    }, [history]);

    return (
        <Jumbotron>
            <h1>Kalkulator - Preračunajte površine</h1>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <CalcForm
                        calcValues={calcValues}
                        addNewRow={handleAddNewRow}
                        removeRow={handleRemoveRow}
                        rowInputChange={handleRowInputChange}
                        clearForm={handleClearForm}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <CurrentResult
                        calcValues={calcValues}
                        currentResult={currentResult}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <ResultHistory
                        history={history}
                        selectItem={handleSelectItem}
                    />
                </ListGroup.Item>
            </ListGroup>
        </Jumbotron>
    );
};

export default App;
