function generatePlaywrightCode(commands, url) {
  let code = `
import { test } from '@playwright/test';

test('Auto generated form fill', async ({ page }) => {
  await page.goto('${url}');
`;

  for (const cmd of commands) {
    const locator = cmd.selector || cmd.xpath;
    if (!locator) continue;

    code += `
  await page.locator('${locator}').fill('${cmd.value}');
`;
  }

  code += `
});
`;

  return code;
}

module.exports = { generatePlaywrightCode };
