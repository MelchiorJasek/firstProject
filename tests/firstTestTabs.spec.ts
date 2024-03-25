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
    });
});




/*test.describe('First Test Tabs', () => {
    test.beforeEach( async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click(); 
    });

    test('imput fields', async({page}) => {

    })*/
