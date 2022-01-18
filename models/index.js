import User from "./User.js";
import Post from "./Post.js";
import Comment from "./Comment.js";

User.hasMany(Post, {
    foreignKey: "userId",
});

Post.belongsTo(User, {
    foreignKey: "userId",
    onDelete: 'SET NULL',
});

Comment.belongsTo(User, {
    foreignKey: "userId",
    onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
    foreignKey: "postId",
    onDelete: 'SET NULL',
});

User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
    foreignKey: "postId",
});

export { User, Post, Comment };