const router = require("express").Router();
import verify from "../middleware/verifyToken";

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "my first post",
      description: "learning nodejs was fun"
    }
  });
});

module.exports = router;
