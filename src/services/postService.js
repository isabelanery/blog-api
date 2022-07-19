const db = require('../database/models');

const postService = {
  create: async ({ title, content, categoryIds, userId }) => {
    const newPost = await db.BlogPost.create({
      title,
      content,
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
  list: async () => {
    const posts = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' },
      ],
      
    });

    // console.log(posts);
    // console.log('OIE');
    
    // const posts = await db.BlogPost.findAll();
    return posts; 
  },
  findById: async (id) => {
    // const post = await db.BlogPost.findByPk(id, {
    //   include: {
    //     model: db.User,
    //     as: 'user',
    //   },
    // });
    
    const post = await db.BlogPost.findByPk(id);

    if (!post) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    
    console.log(post);

    return post;
  },
};

module.exports = postService;