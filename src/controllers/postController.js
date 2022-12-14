const jwtService = require('../services/jwtService');
const postService = require('../services/postService');
const authService = require('../services/authService');

const postController = {
  create: async (req, res) => {
    const { authorization } = req.headers;

    const { id } = await jwtService.validateToken(authorization);

    const { title, content, categoryIds } = await authService.validateBlogPost(req.body);

    const newPost = await postService.create({ title, content, categoryIds, userId: id });

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
  update: async (req, res) => {
    const { authorization } = req.headers;
    const { id: userId } = await jwtService.validateToken(authorization);
    const { id: postId } = req.params;
    const { title, content } = req.body; 

    await authService.validateUpdate({ title, content });
    await authService.validatePostOwnership({ userId, postId });

    const updated = await postService.update({ title, content, id: postId });

    res.status(200).json(updated);
  },
  remove: async (req, res) => {
    const { authorization } = req.headers;
    const { id: userId } = await jwtService.validateToken(authorization);
    const { id: postId } = req.params;

    await authService.validatePostOwnership({ userId, postId });

    await postService.remove(postId);

    res.status(204).end();
  },
  search: async (req, res) => {
    const { q: query } = req.query;

    const results = query === '' ? await postService.list() : await postService.search(query);

    res.status(200).json(results);
  },
};

module.exports = postController;