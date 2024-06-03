import React, { useState } from 'react';

function withButtonLogic(WrappedComponent) {
    return function WithButtonLogic(props) {
        const [inputValue, setInputValue] = useState('');
        const [error, setCircularError] = useState(false);
        const [progress, setProgress] = useState(0);
        const [alertMessage, setAlertMessage] = useState('');
        const [alertOpen, setAlertOpen] = useState(false);

        const handleInputChange = (event) => {
            const value = event.target.value;
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
                setInputValue(value);
                setAlertOpen(false);
            } else {
                setAlertMessage('Please enter a value between 0 and 100.');
                setAlertOpen(true);
            }
        };

        const handleUpdate = () => {
            const value = parseInt(inputValue);
            if (!isNaN(value) && value >= 0 && value <= 100) {
                setProgress(value);
                setCircularError(false);
            } else {
                setCircularError(true);
            }
        };

        const handleClear = () => {
            setInputValue('');
            setProgress(0);
            setCircularError(false);
            setAlertMessage('');
            setAlertOpen(false);
        };

        return (
            <WrappedComponent
                inputValue={inputValue}
                error={error}
                progress={progress}
                alertOpen={alertOpen}
                alertMessage={alertMessage}
                onInputChange={handleInputChange}
                onUpdate={handleUpdate}
                onClear={handleClear}
                setAlertOpen={setAlertOpen}

                {...props} 
            />
        );
    };
}

export default withButtonLogic;
