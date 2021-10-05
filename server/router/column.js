const express = require("express");
const columnCtrl = require("../controller/column");
const auth = require("../middleware/auth");
const columnValidator = require("../validator/column");

const router = express.Router();

// Create Column
router.post("/", auth, columnValidator.createColumn, columnCtrl.createColumn);

// Get Column
router.get(
  "/:topicId",
  auth,
  columnValidator.getColumns,
  columnCtrl.getColumns
);

// Update Column
router.put("/", auth, columnValidator.updateColumn, columnCtrl.updateColumn);

// Delete Column
router.delete(
  "/:columnId",
  auth,
  columnValidator.deleteColumn,
  columnCtrl.deleteColumn
);

module.exports = router;
