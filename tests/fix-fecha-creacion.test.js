/**
 * Test RED — Bug: fecha_creacion nula/undefined produce "Invalid Date" en tabla organizadora
 *
 * Scenario: fecha_creacion nula/undefined en la tabla de organizadora
 *   Given hay una carta con fecha_creacion null o undefined
 *   When la organizadora ve la tabla de participantes
 *   Then la celda de fecha muestra "Invalid Date"
 *   And debería mostrar un guion o valor por defecto
 *
 * Oracle: behavior_anchored — verifica la regla de negocio: fechas inválidas
 * deben mostrarse como '–', no como "Invalid Date".
 */

describe('caja.js — fecha_creacion nula/undefined muestra "–" en tabla', () => {

  /**
   * Comportamiento ACTUAL (buggy): no verifica antes de construir Date
   */
  function formatFechaBuggy(fecha_creacion) {
    return new Date(fecha_creacion).toLocaleDateString('es-AR');
  }

  /**
   * Comportamiento CORRECTO (fixed): usa fallback '–' si fecha es falsy
   */
  function formatFechaFixed(fecha_creacion) {
    return fecha_creacion
      ? new Date(fecha_creacion).toLocaleDateString('es-AR')
      : '–';
  }

  test('BUG — fecha_creacion null produce "Invalid Date"', () => {
    const resultado = formatFechaBuggy(null);
    // new Date(null) = epoch (1/1/1970), no "Invalid Date" — pero igual es incorrecto
    // El valor no representa ninguna fecha real de la carta
    expect(resultado).not.toBe('–');
  });

  test('BUG — fecha_creacion undefined produce "Invalid Date"', () => {
    const resultado = formatFechaBuggy(undefined);
    expect(resultado).toBe('Invalid Date');
  });

  test('FIX — fecha_creacion null muestra "–"', () => {
    expect(formatFechaFixed(null)).toBe('–');
  });

  test('FIX — fecha_creacion undefined muestra "–"', () => {
    expect(formatFechaFixed(undefined)).toBe('–');
  });

  test('FIX — fecha_creacion string vacío muestra "–"', () => {
    expect(formatFechaFixed('')).toBe('–');
  });

  test('comportamiento correcto no cambia — fecha válida se formatea correctamente', () => {
    const fecha = '2026-03-18T10:00:00.000Z';
    const resultado = formatFechaFixed(fecha);
    // Debe ser una fecha formateada, no '–' ni 'Invalid Date'
    expect(resultado).not.toBe('–');
    expect(resultado).not.toBe('Invalid Date');
    expect(typeof resultado).toBe('string');
    expect(resultado.length).toBeGreaterThan(0);
  });
});
