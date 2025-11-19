const express = require("express");
const router = express.Router();
const linkController = require("../controllers/link.controller");

router.get("/links", linkController.getAllLinks);
router.post("/links", linkController.createLink);
router.get("/links/:code", linkController.getLinkStats);
router.delete("/links/:code", linkController.deleteLink);

module.exports = router;
