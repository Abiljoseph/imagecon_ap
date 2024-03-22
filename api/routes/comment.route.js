import express from "express";
import {
  UpdateComment,
  createComment,
  deleteComment,
  filterComments,
  getComments,
  getCommentsByLimitAndFilter,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", createComment);
router.delete("/delete/:id", deleteComment);
router.put("/comment/:id", UpdateComment);
router.get("/comments", filterComments);
// router.get("/", getComments);
router.get("/all", getComments);
router.get("/", getCommentsByLimitAndFilter);

export default router;
