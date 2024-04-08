const { test, expect } = require('@playwright/test');

test.beforeEach(async ({page}) =>{
    await page.goto('http://localhost:3000');
});

test.describe( 'Testing Form', ()=>{
    test('debería mostrar mensaje correcto', async ({page})=>{
        await page.getByLabel('Name', {exact:true}).fill('Laura');
        await page.getByLabel('Surname').fill('García');
        await page.getByLabel('Username').fill('laugaa');
        await page.getByLabel('Email').fill('laura@gmail.com');
        await page.getByLabel('Password').fill('12345');

        await page.getByRole( 'button', {name:'Submit'} ).click();

        const p = await page.getByTestId('succes-message');

        await expect(p).toBeVisible();

    });
    test('deberían borrarse los campos de texto', async ({page})=>{
        const inputName = await page.getByLabel('Name', {exact:true})
        const inputSurname = await page.getByLabel('Surname')
        const inputUsername = await page.getByLabel('Username')
        const inputEmail = await page.getByLabel('Email')
        const inputPassword = await page.getByLabel('Password')

        inputName.fill('Laura');
        inputSurname.fill('García');
        inputUsername.fill('laugaa');
        inputEmail.fill('laura@gmail.com');
        inputPassword.fill('12345');

        await page.getByRole( 'button', {name:'Submit'} ).click();

        await expect(inputName).toBeEmpty();
        await expect(inputSurname).toBeEmpty();
        await expect(inputUsername).toBeEmpty();
        await expect(inputEmail).toBeEmpty();
        await expect(inputPassword).toBeEmpty();

    });
});