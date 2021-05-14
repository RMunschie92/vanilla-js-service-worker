// Version 3
console.log('We are a service worker');

try {
  importScripts("events.js");
}
catch (e) {
  console.error(e);
}

// Called everytime that web app, PWA, iframe, or whatever else your program is, 
// makes a network request.
self.addEventListener('fetch', event => {
  console.log(`Fetch ${event.request.url}`);
  const parsedUrl = new URL(event.request.url);

  if (event.request.method == "POST") {
    const clonedRequest = event.request.clone();
    return;
  }

  // If URL is the home page
  if (parsedUrl.pathname == "/") {
    return;
  }
  // under /api
  if (parsedUrl.pathname.match(/^\/api\/*/)) {
    const object = {
      temp: 56
    }
    const jsonResponse = new Response(JSON.stringify(object), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-type": "application/json"
      }
    });
    event.respondWith(jsonResponse);
  }

  const body = `
    <!doctype html>
    <title>Service Worker HTML Generation</title>
    <h1>
      The URL is ${event.request.url}
    </h1>
    <ul>
      <li>Cache: ${event.request.cache}</li>
      <li>Credentials: ${event.request.credential}</li>
      <li>Destination: ${event.request.destination}</li>
      <li>Method: ${event.request.method}</li>
      <li>Referrer: ${event.request.referrer}</li>
    </ul>
  `;
  const response = new Response(body, 
  {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-type": "text/html"
    }
  });
  event.respondWith(response);

  // event.respondWith(new Promise( (resolve, reject) => {
  //   fetch("/").then(response => { // "/" refers to fetching the root folder.
  //     // You can only "use" the response object once, so if you want to log it
  //     // out before you resolve it, you have to use the clone() method.
  //     const clonedResponse = response.clone();
  //     resolve(response)
  //   })
  // }));
});