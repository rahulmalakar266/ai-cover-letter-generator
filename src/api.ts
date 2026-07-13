export async function generateCoverLetter(prompt: string) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "poolside/laguna-xs-2.1:free",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to generate cover letter");
    }

    const data = await response.json();

    return data.choices[0].message.content;
}