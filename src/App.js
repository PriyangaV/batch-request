import React from "react";

import { client } from "./apiClient";
import { modifyFinalData } from "./helper";

const apiClient = client();
const batchUrl = "/file-batch-api";

async function runTest() {
  apiClient
    // .get(batchUrl, { params: { ids: [{ id: "fileid2" }] } })
    .get(batchUrl, { params: { ids: ["fileid2"] } })
    .then(({ data: { items } }) => console.log(items))
    .catch(console.error);

  apiClient
    // .get(batchUrl, { params: { ids: [{ id: "fileid1" }, { id: "fileid2" }] } })
    .get(batchUrl, { params: { ids: ["fileid1", "fileid2"] } })
    // .then(({ data: { items } }) => console.log(modifyFinalData(items)))
    .then(({ data: { items } }) => console.log(items))
    .catch(console.error);

  // rejection
  apiClient
    // .get(batchUrl, { params: { ids: [{ id: "fileid3" }] } })
    .get(batchUrl, { params: { ids: ["fileid3"] } })
    .then(({ data: { items } }) => console.log(items))
    .catch(console.error);
}

// Only MockData Server Call for Rejection Test()
async function shouldRejectCall() {
  // rejection
  apiClient
    // .get(batchUrl, { params: { ids: [{ id: "fileid4" }, { id: "fileid5" }] } })
    .get(batchUrl, { params: { ids: ["fileid4", "fileid5"] } })
    .then(({ data: { items } }) => console.log(modifyFinalData(items)))
    .catch(console.error);
}

function App() {
  return (
    <div className='App'>
      <button onClick={() => runTest()}>Run Test</button>
      <br />
      <br />
      {/* <button onClick={() => shouldRejectCall()}>Mock Rejection Test</button> */}
    </div>
  );
}

export default App;
