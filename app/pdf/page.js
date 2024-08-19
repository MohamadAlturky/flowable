// "use client"
// import CustomViewer from "../../components/pdfViewer"


// const App = () => {
//   let process_description = "sdsad"
//   let messages = [
//     {
//       "role":"user",
//       "content":"Lorem ipsum dolor sit amet, sssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss consectetur adipiscing elit."
//     },
//     {
//       "role":"user",
//       "content":"Lorem ipsum dolor sit amet, sssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss consectetur adipiscing elit."
//     },
//     {
//       "role":"user",
//       "content":"Lorem ipsum dolor sit amet, sssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss consectetur adipiscing elit."
//     },
//   ];

//   return (
//     <CustomViewer messages={messages} process_description={process_description}></CustomViewer>
//   );
// };

// export default App;
import React from 'react';

// Function to parse the text and return an array of objects
function parseText(text) {
    const parts = text.split(/(\*\*.*?\*\*)/); // Split by the **bold** markers
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return { bold: true, text: part.slice(2, -2), key: index };
        }
        return { bold: false, text: part, key: index };
    });
}

// Component that handles the rendering of the parsed text
const ReportComponent = () => {
    const inputText = `
    **BPMN Diagram Report: Online Shopping Process**
    **Start Event**: 
    - 'Login to Account' - Initiates the purchasing process.
    **Parallel Gateway**: 
    - 'Split' - Branches the process into two parallel paths for selecting items and setting 
    payment method.
    **Parallel Activities**: 
    - 'Select Items' - User selects items to purchase.
    - 'Set Payment Method' - User sets a payment method.
    **Sequence Flow**: 
    - After 'Select Items', a new activity 'Choose Free Reward' is added, as it depends 
    on the selected items.
    - 'Choose Free Reward' is independent of the 'Set Payment Method' activity. 
    - 'Set Payment Method' leads to an Exclusive Gateway that determines if the user 
    pays immediately or completes an installment agreement.
    **Exclusive Gateway**: 
    - 'Payment Method Decision' - Routes the process based on whether the user pays 
    or completes an installment agreement.
    **Sequence Flow**: 
    - After 'Payment Method Decision', the process merges into a single path for delivery and potential returns.
    **Activities**: 
    - 'Pay' or 'Complete Installment Agreement' - Depending on the payment method 
    chosen.
    - 'Deliver Items' - Items are shipped to the user.
    - 'Return Items (for Exchange)' - User has the option to return items, leading to a 
    new delivery.
    **Event**: 
    - 'End Event: Order Completed' - Marks the completion of the purchasing process.
    This report captures the key elements and sequence of the online shopping process as described. The receiving team can use this report to create a BPMN diagram representing the process.
    `;

    const parsedText = parseText(inputText);

    return (
        <div>
            <h1>Report</h1>
            <p>
                {parsedText.map(part =>
                    part.bold ? (
                        <BoldTextComponent key={part.key} text={part.text} />
                    ) : (
                        <span key={part.key}>{part.text}</span>
                    )
                )}
            </p>
        </div>
    );
};

// Component to render bold text
const BoldTextComponent = ({ text }) => {
    return <b>{text}</b>;
};

export default ReportComponent;
