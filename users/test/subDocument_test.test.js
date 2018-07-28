const assert = require('assert');
const User = require('../src/user');

describe('Sub-documents tests', () => {

    it('it should create a sub-documents', (done) => {
        const joe = new User({
           name: 'Joe',
           posts:[{
               title: 'PostTitle'
           }]
        });

        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('it should add sub-doc to an existing records', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save() 
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                user.posts.push({
                    title: 'New Post'
                });

                return user.save();
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('it should remove and existing sub-doc', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'New Title'
            }]
        });
        
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                // call save() after remove sub-doc
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });

});