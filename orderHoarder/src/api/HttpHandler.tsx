const API_BASE_URL = "https://sparkinterview-apim.azure-api.net/InterviewAPI/";
const API_SUBSCRIPTION_KEY = "f252dddeba574e619df3ee4381780d7e"; 

export async function HttpPost(urlStub :string, postData :any[]) {
    console.log('HttpPost called with urlStub:', urlStub);
    console.log('HttpPost called with stringigfied postData:', JSON.stringify(postData));

    const completeUrl = `${API_BASE_URL}${urlStub}`;
    const postResponse = await fetch(
        completeUrl,
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Ocp-Apim-Subscription-Key': API_SUBSCRIPTION_KEY
            },
            body: JSON.stringify(postData)
        }
    );
    const returnData = await postResponse.json();
    return returnData;
}

export async function HttpGet(urlStub :string, getData :any[]) {
    console.log('HttpGet called with urlStub:', urlStub);

    const url = new URL( `${API_BASE_URL}${urlStub}`);
    url.search = new URLSearchParams(getData[0]).toString();

    console.log('HttpGet called with url:', url.toString());
    console.log('HttpGet called with search:', url.search);

    const getResponse = await fetch(
       url,
        {
            method: 'GET', 
            headers: {
                'Accept': '*/*', 
                'Ocp-Apim-Subscription-Key': API_SUBSCRIPTION_KEY
            },
        }
    );

    const returnData = await getResponse.json();
    return returnData;
}

