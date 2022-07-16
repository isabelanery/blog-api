const db = require('../database/models');

const postService = {
  create: async ({ title, content, categoryIds, userId }) => {
    const newPost = await db.BlogPost.create({
      title,
      content,
      // categoryIds,
      userId,
    });
    
    await (Promise.all(
      categoryIds.map((categoryId) => db.PostCategory.create({
        postId: newPost.id,
        categoryId,
      })),
    ));

    return newPost;
  },
};

module.exports = postService;