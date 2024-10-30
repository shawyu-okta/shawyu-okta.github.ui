const originalTime = new Date().getTime();
let lastTime = originalTime;

const main = () => {
  let requestCount = 0;
  const outputElement = document.getElementById("output");
  const makeRequest = async () => {
    const url = "https://httpbin.org/post";
    const response = await fetch(url, { mode: "cors", method: "post" });
    const time = new Date().getTime();

    if (response.ok) {
      requestCount++;
      const responseJson = await response.json();
      const outputLine = `Response success [${response.status}] n=${requestCount}, time=${time}, delta=${time - lastTime}`;
      console.warn(outputLine);
      const newLine = document.createElement("div");
      const newContent = document.createTextNode(outputLine);
      newLine.appendChild(newContent);

      lastTime = time;
      setTimeout(makeRequest, 2000);
      outputElement.appendChild(newLine);
    } else {
      lastTime = time;
      setTimeout(makeRequest, 2000);
      throw new Error('HTTP error! Status: ' + response.status);
    }
  };

  setTimeout(() => {
    makeRequest();
  }, 2000);
};