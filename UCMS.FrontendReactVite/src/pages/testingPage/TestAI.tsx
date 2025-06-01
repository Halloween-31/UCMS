import OpenAI from "openai";

const TestAI: React.FC = () => {

    const client = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
    });

    client.responses.create({
        model: "gpt-3.5-turbo",
        input: "Write a one-sentence bedtime story about a unicorn."
    }).then((response) => {
        console.log(response.output_text);
    });


    return (
        <>

        </>
    );
};

export default TestAI;