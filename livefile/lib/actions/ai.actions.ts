'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseStringify } from "../utils";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_KEY as string);

export const  GenerateAIText =async(prompt:string)=> {
    try{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log("ai text is",text);
        return parseStringify(text);


    }
    catch(err){
        console.log("error while generating ai text", err)
    }

}

