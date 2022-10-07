// eslint-disable-next-line no-unused-vars
import { assert, module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'super-rentals/tests/helpers';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/'); //visit / page and wait

    assert.strictEqual(currentURL(), '/'); //confirm that currentURL equals '/'
    assert.dom('nav').exists(); //checks for navigation bar
    assert.dom('h1').hasText('SuperRentals'); //checks that navigation bar has correct text
    assert.dom('h2').hasText('Welcome to Super Rentals!'); //confirm that h2 header has the expected text

    assert.dom('.jumbo a.button').hasText('About Us'); //confirm that there is a jumbo class button with <a> tag and that it has the expected text
    await click('.jumbo a.button'); //click the jumbo button and wait for the page to load

    assert.strictEqual(currentURL(), '/about'); //confirm that the currentURL equals /about, and there the button loaded the correct page
  });

  test('viewing the details of a rental property', async function (assert) {
    await visit('/');
    assert.dom('.rental').exists({ count: 3 });

    await click('.rental:first-of-type a');
    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
  });

  test('visiting /rentals/grand-old-mansion', async function (assert) {
    await visit('/rentals/grand-old-mansion');

    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
    assert.dom('nav').exists();
    assert.dom('h1').containsText('SuperRentals');
    assert.dom('h2').containsText('Grand Old Mansion');
    assert.dom('.rental.detailed').exists();
  });

  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.strictEqual(currentURL(), '/about');
    assert.dom('nav').exists(); //checks for navigation bar
    assert.dom('h1').hasText('SuperRentals'); //checks that navigation bar has correct text
    assert.dom('h2').hasText('About Super Rentals');

    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');

    assert.strictEqual(currentURL(), '/getting-in-touch');
    assert.dom('nav').exists(); //checks for navigation bar
    assert.dom('h1').hasText('SuperRentals'); //checks that navigation bar has correct text
    assert.dom('h2').hasText('Contact Us');

    assert.dom('.jumbo a.button').hasText('About');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/about');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/'); //visit index page

    assert.dom('nav').exists(); //checks for navigation bar
    assert.dom('nav a.menu-index').hasText('SuperRentals'); //confirm that there is a nav class menu with <a> tag, button, and expected text
    assert.dom('nav a.menu-about').hasText('About'); //confirm that there is a nav class menu with <a> tag, button, and expected text
    assert.dom('nav a.menu-contact').hasText('Contact'); //confirm that there is a nav class menu with <a> tag, button, and expected text

    await click('nav a.menu-about');
    assert.strictEqual(currentURL(), '/about');

    await click('nav a.menu-contact');
    assert.strictEqual(currentURL(), '/getting-in-touch');

    await click('nav a.menu-index');
    assert.strictEqual(currentURL(), '/');
  });
});
