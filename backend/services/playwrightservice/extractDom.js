async function extractDom(page) {
  return await page.evaluate(() => {

    function getXPath(el) {
      if (el.id) return `//*[@id="${el.id}"]`;

      const parts = [];
      while (el && el.nodeType === Node.ELEMENT_NODE) {
        let index = 1;
        let sibling = el.previousSibling;
        while (sibling) {
          if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === el.tagName) {
            index++;
          }
          sibling = sibling.previousSibling;
        }
        parts.unshift(`${el.tagName.toLowerCase()}[${index}]`);
        el = el.parentNode;
      }
      return '/' + parts.join('/');
    }

    const fields = [];

    document.querySelectorAll("input, select, textarea").forEach(el => {
      fields.push({
        tag: el.tagName.toLowerCase(),
        type: el.type || "",
        id: el.id || "",
        name: el.name || "",
        placeholder: el.placeholder || "",
        label: document.querySelector(`label[for='${el.id}']`)?.innerText || "",
        xpath: getXPath(el)   // ✅ IMPORTANT
      });
    });

    return fields;
  });
}

module.exports = { extractDom };
