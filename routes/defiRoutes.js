const express = require("express")
const router = express.Router()
const {
    viewOneProtocol,
    viewFilteredProtocols,
    addProtocol,
    deleteProtocol,
    updateEntireProtocol,
    updateSingleInfo,
} = require("../controllers/defiController")

router.route("/").get(viewFilteredProtocols).post(addProtocol)
router
    .route("/:id")
    .delete(deleteProtocol)
    .put(updateEntireProtocol)
    .patch(updateSingleInfo)
    .get(viewOneProtocol)

module.exports = router
