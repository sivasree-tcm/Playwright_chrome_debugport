function detectField(fields) {
  return fields.map(f => ({
    finalName: f.name || f.id || `field_${Math.random().toString(36).slice(2, 6)}`,
    label: f.label || f.placeholder || "",
    type: f.type,
    tag: f.tag,
    xpath: f.xpath   // ✅ preserved
  }));
}

module.exports = { detectField };
