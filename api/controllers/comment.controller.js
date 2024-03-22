import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(errorHandler(402, "Comment not found!"));
  }

  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const UpdateComment = async (req, res, next) => {
  const comment = await Listing.findById(req.params.id);

  if (!comment) {
    return next(errorHandler(402, "Comment not found!"));
  }

  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(401, "Error occuring"));
  }

  try {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(updateComment);
  } catch (error) {
    next(error);
  }
};

export const getCommentsById = async (req, res, next) => {
  try {
    const comments = await Comment.findById(req.params.id);
    if (!comments) {
      return next(errorHandler(401, "Comment not found"));
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      return next(errorHandler(401, "Comment not found"));
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByLimitAndFilter = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const page = parseInt(req.query.page) || 1; // Default page is 1

    const skip = (page - 1) * limit;

    const comments = await Comment.find().skip(skip).limit(limit);

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const filterComments = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || " ";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const comments = await Comment.find({
      name: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
