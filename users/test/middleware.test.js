const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware test', () =>{
    let joe, blogPost, blogPost2;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });

        blogPost = new BlogPost({
            title: 'blogPost',
            content: 'this is content of blogPost'
        });

        blogPost2 = new BlogPost({
            title: 'blogPost 2',
            content: 'this is content of blogPost 2'
        });

        joe.blogPosts.push(blogPost, blogPost2);

        Promise.all([
            joe.save(),
            blogPost.save()
        ]).then(() => {
            done();
        });
    });

    it.only('it should clean up dangling blogposts on remove', (done) => {
        // middleware remove
        joe.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });

});