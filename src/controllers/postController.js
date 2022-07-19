const jwtService = require('../services/jwtService');
const postService = require('../services/postService');
const authService = require('../services/authService');

const postController = {
  create: async (req, res) => {
    const { authorization } = req.headers;

    const data = await jwtService.validateToken(authorization);

    const { title, content, categoryIds } = await authService.validateBlogPost(req.body);

    const newPost = await postService.create({ title, content, categoryIds, userId: data.id });

    res.status(201).json(newPost);
  },
  list: async (req, res) => {
    const posts = await postService.list();

    res.status(200).json(posts);
  },
  findById: async (req, res) => {
    const { id } = req.params;

    const posts = await postService.findById(id);

    res.status(200).json(posts);
  },
};

module.exports = postController;