const Ajv = require('ajv');

const { fail, ok } = require('../util/response');
const { Post } = require('../model/');

const ajv = new Ajv({ removeAdditional: true });

async function addPost(req, res) {
	try {
		const data = req.body;

		const valid = ajv.validate(Post.validator, data);

		if (!valid) {
			return res.send(ajv.errors);
		}

		const result = await Post.model.create({
			title: data.title,
			description: data.description,
			text: data.text,
		});

		res.send(ok(postSerializer(result), 'post added successfully'));
	} catch (error) {
		res.status(400).send(fail(error));
	}
}

async function getAllPosts(req, res) {
	try {
		const result = await Post.model.find({});

		setTimeout(() => {
			res.send(ok(result.map(postSerializer), 'fetch all posts.'));
		}, 2000);
	} catch (error) {
		res.status(400).send(fail(error));
	}
}

async function deleteAllPosts(req, res) {
	try {
		const result = await Post.model.deleteMany({});

		res.send(ok(result, 'all posts has been deleted.'));
	} catch (error) {
		res.status(400).send(fail(error));
	}
}

function postSerializer({ title, description, text }) {
	return { title, description, text };
}

module.exports = { addPost, getAllPosts, deleteAllPosts };
