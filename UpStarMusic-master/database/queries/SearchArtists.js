const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
    console.log('sortProperty : ', {
        [sortProperty]: 1
    });
    console.log("offset : ", offset);
    console.log("limit : ", limit);
    console.log("criteria : ", criteria);

    const query = Artist
        .find(buidQuery(criteria))
        .sort({ [sortProperty]: 1 }) // = { 'sortProperty' : 1 }
        .skip(offset)
        .limit(limit);

    return Promise.all([
        query,
        Artist.count()
    ]).then((results) => {
        return {
            all: results[0],
            count: results[1],
            offset,
            limit
        };
    });
};

const buidQuery = (criteria) => {
    const query = {};

    if (criteria.age) {
        query.age = {
            $gte: criteria.age.min,
            $lte: criteria.age.max
        };
    }

    if (criteria.yearsActive) {
        query.yearsActive = {
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        };
    }

    // $text search - required index
    /** create index
     * mongo
     * use {db_name}
     * db.{collection}.createIndex ({ property : "type_of_index" }) - db.artists.createIndex({name: "text"})
     */
    if (criteria.name) {
        query.$text = {
            $search: criteria.name
        };
    }

    return query;
};
