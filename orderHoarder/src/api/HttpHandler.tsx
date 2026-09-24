const API_BASE_URL = "https://sparkinterview-apim.azure-api.net/InterviewAPI/";
const API_SUBSCRIPTION_KEY = "f252dddeba574e619df3ee4381780d7e"; 

export async function HttpPost(urlStub :string, postData :any) {
    console.log('HttpPost called with urlStub:', urlStub);
    console.log('HttpPost called with postData:', postData);
    const postResponse = await fetch(
        `${API_BASE_URL}${urlStub}`,
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Ocp-Apim-Subscription-Key': 'API_SUBSCRIPTION_KEY'
            },
            body: JSON.stringify(postData)
        }
    );
    const returnData = await postResponse.json();
    return returnData;
}

export async function HttpGet(urlStub :string) {
    console.log('HttpGet called with urlStub:', urlStub);

    const getResponse = await fetch(
        `${API_BASE_URL}${urlStub}`,
        {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
                'Ocp-Apim-Subscription-Key': 'API_SUBSCRIPTION_KEY'
            },
        }
    );
    const returnData = await getResponse.json();
    return returnData;
}

