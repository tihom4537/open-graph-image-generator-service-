import { ImageResponse } from "@vercel/og";
// import  safeLoad  from 'js-yaml';


export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const base64Param = searchParams.get("base64");

        if (!base64Param) {
            throw new Error("Base64 parameter not found");
        }

        // Decode the base64 parameter
        const decodedData = Buffer.from(base64Param, "base64").toString("utf-8");

        // Now you can use the decoded data to generate the open-graph image
        // For simplicity, I'm assuming the decoded data is the title for the image
        const title = decodedData;
        // Parse the YAML data
        

        // Access the AsyncAPI field
        // const asyncAPIVersion = parsedData.asyncapi;
        // const parsedData = JSON.parse(title);
        // console.log(asyncAPIVersion);

        const parsedData = JSON.parse(title);
var asyncapiVersion = parsedData.asyncapi || 0; // Assign default value 0 if asyncapiVersion is falsy
var docTitle = parsedData.info.title || ''; // Assign an empty string if docTitle is falsy
var numberOfServers = Object.keys(parsedData.servers).length || 0; // Assign default value 0 if numberOfServers is falsy
var numberOfMessages = Object.keys(parsedData.channels).reduce(function (accumulator, current) {
    return accumulator + Object.keys(parsedData.channels[current].messages).length;
}, 0) || 0; // Assign default value 0 if numberOfMessages is falsy
var numberOfChannels = Object.keys(parsedData.channels).length || 0; // Assign default value 0 if numberOfChannels is falsy

console.log("AsyncAPI Version:", asyncapiVersion);
console.log("Title:", docTitle);
console.log("Number of Servers:", numberOfServers);
console.log("Number of Messages:", numberOfMessages);
console.log("Number of Channels:", numberOfChannels);


        // console.log(APIVersion);
        // console.log("hi");

        // Fetch image data (replace this with your own logic)
        const imageData = await fetch(
            new URL("../../../assets/logo.jpeg", import.meta.url)
        ).then((res) => res.arrayBuffer());

        // Convert ArrayBuffer to base64 data URL
        const base64ImageData = Buffer.from(imageData).toString("base64");
        const dataUrl = `data:image/jpeg;base64,${base64ImageData}`;

        return new ImageResponse(
            <div tw=" display: flex flex-col w-full h-full items-center justify-center bg-gray-50">
            <div tw="display: flex background-color: gray-50; justify-content: center; width: full;">
            <img tw="w-50 h-50 rounded-lg" src={dataUrl} alt="AsyncAPI" />

</div>

            <div tw=" display: flex text-center">
                <h2 tw="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{docTitle}</h2>
            </div>
            <div tw=" display: flex  justify-center w-full py-4">
                {/* <span tw="text-indigo-600">"Title:" {docTitle}</span> */}
                <span>"AsyncAPI Version:" {asyncapiVersion}|</span>
                <span>"Number of Servers:" {numberOfServers}|</span>
                <span>"Number of Messages:" {numberOfMessages}|</span>
                <span>"Number of Channels:" {numberOfChannels}</span>
            </div>
           
        </div>,
        
        
        

            // {
            //     width: 2000,
            //     height: 1000,
            // },
        );
    } catch (e: any) {
        // Create a new ImageResponse with the error message
        return new ImageResponse(
            <div tw=" display: flex flex-col w-full h-full items-center justify-center bg-gray-50">
                <div tw="text-center text-red-500">Failed to load image</div>
            </div>,
            { status: 500 } // Set the status code appropriately
        );
    }
}
