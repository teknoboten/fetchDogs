
async function getDogs() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors'
    }
  })
  console.log(response.data.message)
}

getDogs();



// Access to fetch at 'https://dog.ceo/api/breeds/list/all' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
// client.js:22          GET https://dog.ceo/api/breeds/list/all net::ERR_FAILED