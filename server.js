const { isEmptyValue } = require("./src/helper");
const express = require("express");
const app = express();
const port = 3001;

// const mockData = [{ id: "fileid1" }, { id: "fileid2" }, { id: "fileid3" }];
// const mockData = ["fileid1", "fileid2", "fileid3"];
const mockData = ["fileid1", "fileid2"];
// const mockData = ["fileid1"];

app.get("/file-batch-api", (req, res) => {
  // const ids = req?.query?.ids;
  const ids = req && req.query && req.query.ids;

  if (isEmptyValue(ids)) res.send(mockData);

  const filteredIds = mockData.filter((id) => ids.includes(id));
  if (isEmptyValue(filteredIds))
    res.status(404).json({ error: "Id(s) Not found" });

  return res.send({ items: filteredIds });
});

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
