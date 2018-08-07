/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it('all feeds have defined and non-empty urls', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Loops through each feed in the allFeeds object and ensures 
         * it has a name defined and that the name is not empty.
         */
        it('all feeds have defined and non-empty urls', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe("The menu", function() {

        /* Ensures the menu element is hidden by default.*/
        it('menu element is hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes visibility when the menu icon is 
         * clicked. This test has two expectations: does the menu 
         * display when clicked and does it hide when clicked again.
         */
        it('menu changes visibility through menu icon', function() {
            // appending & removing 'menu-hidden' class by simulating clicks
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe("Initial Entries", function() {
        /* Ensures when the loadFeed function is called and completes its 
         * work, there is at least a single .entry element within the .feed container.
         */
        var feedContainer,
            entryElement;
        beforeEach( function(done) {
            feedContainer = document.querySelector('.feed');
            loadFeed(0, function() {
                done();
            });
        });
        
        /* checking if the first '.entry' element in the DOM is inside the '.feed' container
         * on the 'Udacity Blog' feed
         */
        it('loadFeed function works', function() {
            entryElement = document.querySelector('.entry'); 
            // not assigned in beforeEach because page is not loaded by then
            expect(feedContainer.contains(entryElement)).toBe(true);
        });
    });

    describe("New Feed Selection", function() {
        /* Ensures when a new feed is loaded by the loadFeed function that
         * the content actually changes.
         */
        var currentFeeds,
            newFeeds,
            feedId;

        // first loading a random page and getting the feeds    
        beforeEach( function(done) {
            feedId = Math.floor(Math.random()*4);
            loadFeed(feedId, function() {
                currentFeeds = document.querySelector('.feed').innerHTML;
                done();
            });
        });
        
        // landing on the next page and getting the feeds to compare with the last one with innerHTML property
        it('loadFeed function changes content', function(done) {
            loadFeed((feedId+1)%4, function () {
                newFeeds = document.querySelector('.feed').innerHTML;
                expect(newFeeds).not.toBe(currentFeeds);
                done();
            });
        });
    });
}());