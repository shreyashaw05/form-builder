import React, { useEffect } from 'react'
import Cloze from './Cloze';
import Comprehension from './Comprehension';
import Categorize from './Categorize';
const FormBuilder = () => {
    const [questionSequence, setQuestionSequence] = React.useState<string[]>([]);
    useEffect(() => {
        console.log("Current question sequence:", questionSequence);
    }, [questionSequence]);

    const renderQuestion = () => {
        return questionSequence.map((questionType, index) => {
            switch (questionType) {
                case "categorization":
                    return <Categorize key={index} />;
                case "cloze":
                    return <Cloze key={index} />;
                case "comprehension":
                    return <Comprehension key={index} />;
                default:
                    return null;
            }
        });
    }

  return (
    <div>
        <h1>Lets Coutomize the form </h1>
        <button onClick={()=> setQuestionSequence(prev=>[...prev, "categorization"])} className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">category</button>
        <button onClick={()=> setQuestionSequence(prev=>[...prev, "cloze"])}  className="bg-purple-500 text-white px-4 py-2 rounded mr-2 hover:bg-purple-600">cloze</button>
        <button onClick={()=> setQuestionSequence(prev=>[...prev, "comprehension"])}  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">comprehension</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">submit</button>

        {
            renderQuestion()
        }
    </div>
  )
}

export default FormBuilder