function convertToJson(fields) {
  const json = {};

  fields.forEach(field => {
    json[field.finalName] = {
      label: field.label,
      type: field.type,
      tag: field.tag,
      xpath: field.xpath   // ✅ THIS WAS MISSING
    };
  });

  return json;
}

module.exports = { convertToJson };
