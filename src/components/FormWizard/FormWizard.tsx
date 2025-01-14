import React, { CSSProperties, useState } from 'react';

interface FormWizardProps {
    children: React.ReactNode;
    onSubmit: (data: Record<string, any>) => void;
    prevButtonLabel?: string;
    nextButtonLabel?: string;
    submitButtonLabel?: string;
    previousButtonStyle?: string | CSSProperties;
    nextButtonStyle?: string | CSSProperties;
    submitButtonStyle?: string | CSSProperties;
    buttonGap?: string | number;
    prevButtonIcon?: React.ReactNode;
    nextButtonIcon?: React.ReactNode;
    submitButtonIcon?: React.ReactNode;
}

const FormWizard: React.FC<FormWizardProps> = ({
    children,
    onSubmit,
    prevButtonLabel = 'Previous',
    nextButtonLabel = 'Next',
    submitButtonLabel = 'Submit',
    previousButtonStyle,
    nextButtonStyle,
    submitButtonStyle,
    buttonGap = '1rem', // Default gap between buttons
    prevButtonIcon,
    nextButtonIcon,
    submitButtonIcon,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const steps = React.Children.toArray(children);
    const isLastStep = currentStep === steps.length - 1;

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const stepData = Object.fromEntries(data.entries());
        setFormData((prev) => ({ ...prev, ...stepData }));

        if (isLastStep) {
            onSubmit({ ...formData, ...stepData });
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <form onSubmit={handleNext} className="space-y-4">
            {steps[currentStep]}
            <div
                className="flex items-center mt-4"
                style={{
                    gap: typeof buttonGap === 'string' ? buttonGap : `${buttonGap}px`,
                }}
            >
                {/* Previous Button */}
                {currentStep > 0 && (
                    <button
                        type="button"
                        onClick={handlePrev}
                        className={
                            typeof previousButtonStyle === 'string'
                                ? previousButtonStyle
                                : "px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition m-1"
                        }
                        style={typeof previousButtonStyle === 'object' ? previousButtonStyle : undefined}
                    >
                        {prevButtonIcon && <span className="mr-2">{prevButtonIcon}</span>}
                        {prevButtonLabel}
                    </button>
                )}

                {/* Next/Submit Button */}
                <button
                    type="submit"
                    className={
                        isLastStep
                            ? typeof submitButtonStyle === 'string'
                                ? submitButtonStyle
                                : "px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition m-1"
                            : typeof nextButtonStyle === 'string'
                                ? nextButtonStyle
                                : "px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition m-1"
                    }
                    style={
                        isLastStep
                            ? typeof submitButtonStyle === 'object'
                                ? submitButtonStyle
                                : undefined
                            : typeof nextButtonStyle === 'object'
                                ? nextButtonStyle
                                : undefined
                    }
                >
                    {isLastStep && submitButtonIcon && <span className="mr-2">{submitButtonIcon}</span>}
                    {!isLastStep && nextButtonIcon && <span className="mr-2">{nextButtonIcon}</span>}
                    {isLastStep ? submitButtonLabel : nextButtonLabel}
                </button>
            </div>
        </form>
    );
};

export default FormWizard;
