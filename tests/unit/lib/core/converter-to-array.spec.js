const JsonNodeNormalizer = require('../../../../index');
const { NodeTypes } = require('../../../../index');
const jsonSample = require('../../mock-sample/json');

describe('normalizer.js', () => {
  it('simple field conversion \'root.subField\' (by string path)', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    const result = JsonNodeNormalizer.normalizePath(jsonToConvert, 'root.subField', targetType);
    // Then
    expect(Array.isArray(result.root.subField)).toBe(true);
    expect(result.root.subField[0].mArrayProperty).toMatchObject({ value: 'TEST' });
  });
});

describe('normalizer.js', () => {
  it('simple field conversion \'root.subField\' (by jsonPath)', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    const result = JsonNodeNormalizer.normalizePath(jsonToConvert, '$.root.subField', targetType);
    // Then
    expect(Array.isArray(result.root.subField)).toBe(true);
    expect(result.root.subField[0].mArrayProperty).toMatchObject({ value: 'TEST' });
  });
});

describe('normalizer.js', () => {
  it('multiple fields conversion \'root.subField\'', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    const result = JsonNodeNormalizer.normalizePath(
      jsonToConvert, ['root.subField', 'root.subArray'], targetType
    );
    // Then
    expect(Array.isArray(result.root.subField)).toBe(true);
    expect(result.root.subField[0].mArrayProperty).toMatchObject({ value: 'TEST' });
  });
});

describe('normalizer.js', () => {
  it('try to convert field that is already an array \'root.subArray\'', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    const result = JsonNodeNormalizer.normalizePath(jsonToConvert, 'root.subArray', targetType);
    // Then
    expect(Array.isArray(result.root.subArray)).toBe(true);
    expect(result.root.subArray[0].mArrayProperty).toMatchObject({ value: 'TEST' });
  });
});

describe('normalizer.js', () => {
  it('try to convert an unknown field \'root.unknown\'', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    const result = JsonNodeNormalizer.normalizePath(jsonToConvert, 'root.unknown', targetType);
    // Then
    expect(result.root.unknown).not.toBeDefined();
  });
});

describe('normalizer.js', () => {
  it('property of array entries conversion \'root.subArray.*.mArrayProperty\'', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    let result = JsonNodeNormalizer.normalizePath(jsonToConvert, 'root.subArray', targetType);
    result = JsonNodeNormalizer.normalizePath(result, 'root.subArray.*.mArrayProperty', targetType);
    // Then
    expect(Array.isArray(result.root.subArray)).toBe(true);
    expect(result.root.subArray[0].mProperty).toBe('TEST');
    expect(Array.isArray(result.root.subArray[0].mArrayProperty)).toBe(true);
    expect(result.root.subArray[0].mArrayProperty[0].value).toBe('TEST');
  });
});

describe('normalizer.js', () => {
  it('property of array of array entries conversion (multiple sub-levels) \'root.subArray.*.mArrayProperty.*.values\'', () => {
    // Given
    const jsonToConvert = { ...jsonSample };
    const targetType = NodeTypes.ARRAY_TYPE;
    // When
    let result = JsonNodeNormalizer.normalizePath(jsonToConvert, 'root.subArray', targetType);
    result = JsonNodeNormalizer.normalizePath(result, 'root.subArray.*.mArrayProperty', targetType);
    result = JsonNodeNormalizer.normalizePath(
      result, 'root.subArray.*.mArrayProperty.*.values', targetType
    );
    // Then
    expect(Array.isArray(result.root.subArray[0].mArrayProperty)).toBe(true);
    expect(Array.isArray(result.root.subArray[1].mArrayProperty)).toBe(true);
    expect(Array.isArray(result.root.subArray[2].mArrayProperty)).toBe(true);

    // Doesn't contain 'values'
    expect(Array.isArray(result.root.subArray[0].mArrayProperty[0].values)).toBe(false);

    expect(Array.isArray(result.root.subArray[1].mArrayProperty[0].values)).toBe(true);
  });
});
