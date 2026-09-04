export function validateResults(results, availableCars) {
  const errors = [];
  if (!Array.isArray(results)) return ["race-results.json debe contener una lista"];
  const ids = new Set();
  for (const [index, result] of results.entries()) {
    const label = `Resultado ${index + 1}`;
    if (!result || typeof result !== "object") { errors.push(`${label}: registro no valido`); continue; }
    if (typeof result.id !== "string" || !result.id.trim() || ids.has(result.id)) errors.push(`${label}: ID vacio o duplicado`);
    ids.add(result.id);
    for (const field of ["event", "simulator"]) {
      if (typeof result[field] !== "string" || !result[field].trim()) errors.push(`${label}: falta ${field}`);
    }
    if (!Number.isInteger(result.pos) || result.pos < 1) errors.push(`${label}: posicion no valida`);
    if (!Number.isInteger(result.year) || result.year < 2000 || result.year > 2100) errors.push(`${label}: ano no valido`);
    if (!availableCars.includes(result.car)) errors.push(`${label}: coche sin logo disponible`);
    if (!Array.isArray(result.drivers) || !result.drivers.length || result.drivers.some((name) => typeof name !== "string" || !name.trim())) {
      errors.push(`${label}: indica los pilotos`);
    } else {
      const names = result.drivers.map((name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, " ").toLowerCase());
      if (new Set(names).size !== names.length) errors.push(`${label}: pilotos duplicados`);
    }
    if (typeof result.featured !== "boolean") errors.push(`${label}: featured debe ser true o false`);
  }
  if (results.filter((result) => result?.featured).length > 1) errors.push("Solo puede haber un resultado destacado");
  return errors;
}
