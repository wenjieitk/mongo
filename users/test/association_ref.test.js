const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations ref testing', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });

        blogPost = new BlogPost({
            title: 'blogPost',
            content: 'this is content of blogPost'
        });

        comment = new Comment({
            content: 'this is content of comment'
        });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => {
            done();
        });
    });

    it.only('it should saves a relation between a user and a blogpost', (done) => {
        User.findOne({
            name: 'Joe'
        })
        .populate('blogPosts') // modifier query, before mongo query executed
        .then((user) => {
            console.log(user);
            assert(user.blogPosts[0].title === 'blogPost');
            done();
        })
    });

});