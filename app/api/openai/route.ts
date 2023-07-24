import { Configuration, OpenAIApi } from "openai";
/**
 * This is a type that defines a type ConverSationStyle using the export keyword.
 * The type is a union of four string literal types: "FUNNY", "NEUTRAL", "SAD", and "ANGRY".
 * This means that a variable of type ConverSationStyle can only have one of these four values.
 */

export type ConverSationStyle = "GENERAL" | "HOUSING" | "CHILDREN_YOUTH_FAMILIES" | "SENIOR_SERVICES";

export interface IChatGPTPayload {
  prompt: string;
  converSationStyle: ConverSationStyle;
}

/**
 * Set the personality of AI depending on the ConverSationStyle.
 **/
const mapStyle = (style: ConverSationStyle) => {
  switch (style) {
    case "GENERAL":
      return `You are a friendly AI Assistant for Catholic charities of the Archdiocese of Chicago with a strong sense of empathy, and your primary goal is help people find more information about catholic charities of the archdiocese of chicago. 
      As such, you will provide information on how to contact the right part of the organization and provide more info about the services. You anticipate people will speak english or spanish. Write responses at a third grade reading level. Give bullet points in responses when it makes sense to.`;
    case "HOUSING":
      return `You are a friendly AI Assistant for Catholic charities of the Archdiocese of Chicago with a strong sense of empathy, and your primary goal is help people find more information about catholic charities of the archdiocese of chicago's housing services. 
      As such, you will provide information on how to contact the right part of the organization and provide more info about the services. You anticipate people will speak english or spanish.`;
    case "CHILDREN_YOUTH_FAMILIES":
      return `You are a friendly AI Assistant for Catholic charities of the Archdiocese of Chicago with a strong sense of empathy, and your primary goal is help people find more information about catholic charities of the archdiocese of chicago's children youth and families services. 
      As such, you will provide information on how to contact the right part of the organization and provide more info about the services. You anticipate people will speak english or spanish.`;
    case "SENIOR_SERVICES":
      return `You are a friendly AI Assistant for Catholic charities of the Archdiocese of Chicago with a strong sense of empathy, and your primary goal is help people find more information about catholic charities of the archdiocese of chicago's senior services. 
      As such, you will provide information on how to contact the right part of the organization and provide more info about the services. You anticipate people will speak english or spanish.`;
  }
};

/**
 * A simple function that makes a request to the Azure Open AI API.
 */
const simpleOpenAIRequest = async (payload: IChatGPTPayload) => {
  // create a new configuration object with the base path set to the Azure OpenAI endpoint
  const configuration = new Configuration({
    basePath: process.env.AZURE_OPEN_AI_BASE, //https://YOUR_AZURE_OPENAI_NAME.openai.azure.com/openai/deployments/YOUR_AZURE_OPENAI_DEPLOYMENT_NAME
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion(
    {
      model: "gpt-35-turbo", // gpt-35-turbo is the model name which is set as part of the deployment on Azure Open AI
      temperature: 1, // set the temperature to 1 to avoid the AI from repeating itself
      messages: [
        {
          role: "system",
          content: mapStyle(payload.converSationStyle), // set the personality of the AI
        },
        {
          role: "user",
          content: payload.prompt, // set the prompt to the user's input
        },
      ],
      stream: false, // set stream to false to get the full response. If set to true, the response will be streamed back to the client using Server Sent Events.
      // This demo does not use Server Sent Events, so we set stream to false.
    },
    {
      headers: {
        "api-key": process.env.AZURE_OPEN_AI_KEY, // set the api-key header to the Azure Open AI key
      },
      params: {
        "api-version": "2023-03-15-preview", // set the api-version to the latest version
      },
    }
  );

  return completion.data.choices[0].message?.content; // return the response from the AI, make sure to handle error cases
};

/**
 * Main entry point for the API.
 **/

export async function POST(request: Request) {
  // read the request body as JSON
  const body = (await request.json()) as IChatGPTPayload;

  const response = await simpleOpenAIRequest(body);
  return new Response(response);
}
