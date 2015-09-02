module.exports = {
  'Demo test Google' : function (client) {
    client
      .url(client.launch_url)
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'rembrandt van rijn')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('ol#rso h3:first-child a',
        'Rembrandt - Wikipedia')
      .end();
  }
};