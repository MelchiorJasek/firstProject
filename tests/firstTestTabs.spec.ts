import {test, expect} from '@playwright/test';
import { text } from 'stream/consumers';

test.beforeEach(async({page})=>{
    await page.goto('https://www.globalsqa.com/demo-site/'); 
});

test.describe('Tabs Test', () => {
    test('Type all sections', async({page}) => {
        await page.getByLabel('Consent', { exact: true }).click();
        await page.getByRole('link', { name: 'Tabs' }).click();

        const accordionAndTabsTitle = page.locator('[class="page_heading"]');
        await expect(accordionAndTabsTitle).toHaveText("Accordion And Tabs");

        //click Section 2
        await page.frameLocator('[class="demo-frame lazyloaded"]').getByRole('tab', {name: 'Section 2'}).click();
        //click Section 3
        await page.frameLocator('[class="demo-frame lazyloaded"]').getByRole('tab', {name: 'Section 3'}).click();
        //click Section 4
        await page.frameLocator('[class="demo-frame lazyloaded"]').getByRole('tab', {name: 'Section 4'}).click();
    });
    test('Re-Size Accordion Section', async({page}) => {
        await page.getByLabel('Consent', { exact: true }).click();
        await page.getByRole('link', { name: 'Tabs' }).click();

        await page.getByRole('tab', {name: 'Re-Size Accordion'}).click();

        const frameLocatorThisSection = page.frameLocator('div:nth-child(4) > p > .demo-frame');

        //streching the text window
        const mouseMovement = frameLocatorThisSection.locator('#accordion-resizer > div:nth-child(4)');
        await mouseMovement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);

        const pixels = await mouseMovement.boundingBox();
        const x = pixels.x + pixels.width / 2;
        const y = pixels.y + pixels.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x +200, y);
        await page.mouse.move(x+200, y+200);
        await page.mouse.up();

        //click Section 2
        await frameLocatorThisSection.getByRole('tab', { name: 'Section 2' }).click();
        //click Section 3
        await frameLocatorThisSection.getByRole('tab', { name: 'Section 3' }).click();

        // try to get assertion by having text at Section 3
        //const section3withListInText = frameLocatorThisSection.getByRole('tab', { name: 'Section 3' }).getByLabel('Section 3');
        //await expect(section3withListInText).toHaveText('Phasellus pellentesque');

        //click Section 4
        await frameLocatorThisSection.getByRole('tab', { name: 'Section 4' }).click();
    })
});




/*test.describe('First Test Tabs', () => {
    test.beforeEach( async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click(); 
    });

    test('imput fields', async({page}) => {

    })*/
