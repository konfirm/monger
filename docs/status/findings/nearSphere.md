# $nearSphere - Implementation Status

**Operator**: `$nearSphere`  
**Type**: Geospatial  
**MongoDB Version**: 2.0  

## Summary

Status: **complete**

The `$nearSphere` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Geospatial.ts` (lines 89-112)

**Function Signature**:
```typescript
export function $nearSphere(query: NearQuery): Evaluator {
  // Supports legacy [x, y] format, {x, y} object, or GeoJSON Point
  // Supports $minDistance and $maxDistance options
  // Uses spherical (Vincenty) distance calculation
}
```

**Logic**:
- Accepts point in multiple formats:
  - Legacy: [longitude, latitude]
  - Legacy object: {x, y}
  - GeoJSON: {type: 'Point', coordinates: [x, y]}
- Supports $minDistance (minimum distance in meters)
- Supports $maxDistance (maximum distance in meters)
- Uses spherical Vincenty distance calculation

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Geospatial.ts` (lines 207-278)

**Test Results**: All tests passing ✓

**Test Cases**:
- Basic proximity (Arnhem to Berlin, Paris)
- $minDistance filtering
- $maxDistance filtering
- Combined $minDistance and $maxDistance
- Legacy array format [x, y]
- Legacy object format {x, y}
- GeoJSON Point format

**Coverage Summary**:
- ✓ Spherical distance calculation (Vincenty)
- ✓ $minDistance constraint
- ✓ $maxDistance constraint
- ✓ Combined distance constraints
- ✓ All input formats
- ✓ Geospatial distance accuracy

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $nearSphere
- Uses spherical Vincenty formula for accuracy
- More accurate than $near for long distances
- Supports both legacy and GeoJSON formats
