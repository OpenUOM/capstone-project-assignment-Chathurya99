import { fixture, Selector } from 'testcafe';

fixture`Dummy Test`
    .page`https://devexpress.github.io/testcafe/example`;

test('Dummy Test', async t => {
    // Test code goes here
    const element = await Selector('#element-id');
    await t.expect(element.exists).ok();
});
