const { loginP20 } = require("../../login.js");

const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  let profilePage, patientProfile;

  test(
    "Title of the page and Login",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitForTimeout(1000);
      await loginP20(page);
      await page.waitForTimeout(1000);
      profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));

      await page.waitForSelector('div > .container > div > div > .button--blue')
      await page.click('div > .container > div > div > .button--blue')
      await page.waitForTimeout(1000);
      patientProfile = await profilePage;
    },
    timeout
  );
  test('multi add miscellaneous notes', async () => {
    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitForTimeout(500);               

    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(11) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(11) > div > div > b')
  
    await patientProfile.waitForSelector('#each-data-row-0-miscellaneous_notes > div > div > #description > .v-tribute > .el-textarea__inner')
    await patientProfile.click('#each-data-row-0-miscellaneous_notes > div > div > #description > .v-tribute > .el-textarea__inner')

    await patientProfile.type('#each-data-row-0-miscellaneous_notes > div > div > #description > .v-tribute > .el-textarea__inner','test')
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('#each-data-row-1-miscellaneous_notes > div > div > #description > .v-tribute > .el-textarea__inner')
    await patientProfile.click('#each-data-row-1-miscellaneous_notes > div > div > #description > .v-tribute > .el-textarea__inner')
    await patientProfile.type('#each-data-row-1-miscellaneous_notes > div > div > #description > .v-tribute > .el-textarea__inner','test2')
    await patientProfile.waitForTimeout(500);

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.waitForTimeout(500);

    element = await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div')
    await expect(element).toMatch('Saved successfully')

  }, timeout);

  test('Multi delete miscellaneous notes', async () => {
    await patientProfile.waitForTimeout(1000);
    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(11) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(11) > div > div > b')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('div:nth-child(1) > .el-card > .el-card__body > div > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(1) > .el-card > .el-card__body > div > div > div > .el-button > span')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('.el-card__body > div > div > div > .el-button > span')
    await patientProfile.click('.el-card__body > div > div > div > .el-button > span')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span') 

    await patientProfile.waitForTimeout(200);

    deleteMsg = await patientProfile.waitForSelector('.el-popup-parent--hidden > .el-message > .el-message__content')
    await expect(deleteMsg).toMatch('miscellaneous note deleted.');
                                                            
  }, timeout);
  

});
afterAll(async done => {
  done();
});