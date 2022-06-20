import nc from "next-connect";

export const endointWrapper = () => nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.end("Internal server Error.");
  },
  onNoMatch: (req, res) => {
    res.statusCode = 404;
    res.end(`Method: ${req.method} not found.`);
  },
});