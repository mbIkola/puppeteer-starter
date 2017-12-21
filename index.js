var puppeteer = require('puppeteer');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should;




describe("Whatever about login form on vertamedia admin", () => {

    it("Check we can not login using invalid password", async function()  {

        const browser = await puppeteer.launch( {
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://admin-zone.vertamedia.com/');


        const emailInput = await page.$('input[name="email"]');
        await emailInput.click();
        // await emailInput.type("It is a good day to die");
        //
        //
        //
        // // todo: assert( buttonNext is Disabled )
        //
        // while(emailInput.value.length > 0) {
        //     await page.press('Backspace');
        // }

        await emailInput.type("some.valid.email@domain.com");
        // todo: assert( buttonNext is Enabled )
        const buttonNext = await page.$('#btnNext');
        await buttonNext.click();

        /// check that  $('a.login-screen-title span').text === "some.valid.email@domain.com"
        const passwordInput = await page.$('input[name="password"]');
        await passwordInput.click();
        await passwordInput.type("This is a wrong password");

        const buttonLogin = await page.$('#btnLogin');
        await buttonLogin.click();

        await page.waitForSelector('div.login-screen-error');
        const errorDiv = await page.$('div.login-screen-error');
        var text = await errorDiv.getProperty('innerText');

        expect(text._remoteObject.value).to.be.equal("Authentication failed");

        await page.screenshot({path: 'screenshot/example.png'});
        await browser.close();


    }).timeout(30000)  ;


});

