import express from 'express';
import cors from 'cors';
import ENV from '@cereal/env';


const app = express();

app.use(express.json());
app.use(cors());


app.get("/sussy", (req, res) => {

});


app.listen(ENV.API_PORT, () => {
  console.log(`Server is listening on port ${ENV.API_PORT}`);
});