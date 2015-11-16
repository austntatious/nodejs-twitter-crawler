/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var
  TwitterCrawler = require('../bin/nodejs-twitter-crawler'),
  credentials = [
    {
      consumer_key : "dG8X0N8iBrR6QYon6njm0Q",
      consumer_secret : "uNgYsug2jt7Vfe6t8YcdRe0Hi3r90Mkspf8VHY2oLg",
      access_token_key : "2416405548-BzTMqxLFyyvF5L43chHaePWh3N3zCWYKvAdXD2c",
      access_token_secret : "6HMO68wFEtuJS3jZI8vkhXOSdVN356rw0idTyZuMYQcry",
      enabled : true
    },
  ],
  fs = require('fs');

function bind(object, method) {
  return object[method].bind(object)
}

function saveOutput(obj, filename) {
  fs.writeFile( 'output/' + filename, JSON.stringify(obj, null, '  ') );
}


var
  crawler = new TwitterCrawler(credentials),
  crawledId = 102793506;

// Get user
console.info('Obtaining user with id '+crawledId+'...');
crawler.getUser(crawledId)
  .then(function (user) {
    console.info('Obtained info for user', user.name, '(' + user.id + '). Storing in output/'+ crawledId +'user.json');
    saveOutput(user, crawledId + 'user.json');

    // Crawl tweets
    console.info('Obtaining tweets...');
    crawler.getTweets(crawledId, { limit : 500 })
      .then(function (tweets) {
        console.info('Obtained', tweets.length, 'tweets for user', user.name, '(' + user.id + '). Storing in output/'+ crawledId +'tweets.json');
        saveOutput(tweets, crawledId + 'tweets.json');
        console.info('Crawling finished.');
      })
      .catch(bind(console, 'error'))
      .done()
  })
  .catch(bind(console, 'error'))
  .done()
