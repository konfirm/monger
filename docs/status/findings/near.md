# $near - Implementation Status

**Operator**: `$near`  
**Type**: Geospatial  
**MongoDB Version**: 1.0  

## Summary

Status: **complete**

The `$near` operator is fully implemented and tested.

## Implementation Details

**Source File**: `source/Domain/Filter/Operator/Geospatial.ts` (lines 68-87)

**Function Signature**:
```typescript
export function $near(query: NearQuery): Evaluator {
  // Supports legacy [x, y] format, {x, y} object, or GeoJSON Point
  // Supports $minDistance and $maxDistance options
  // Uses flat (2D) distance calculation
}
```

**Logic**:
- Accepts point in multiple formats:
  - Legacy: [longitude, latitude]
  - Legacy object: {x, y}
  - GeoJSON: {type: 'Point', coordinates: [x, y]}
- Supports $minDistance (minimum distance in meters)
- Supports $maxDistance (maximum distance in meters)
- Uses flat earth distance calculation

## Test Coverage

**Test File**: `test/Domain/Filter/Operator/Geospatial.ts` (lines 134-205)

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
- ✓ Distance calculation
- ✓ $minDistance constraint
- ✓ $maxDistance constraint
- ✓ Combined distance constraints
- ✓ All input formats
- ✓ Geospatial distance accuracy

## Exported From

- `source/main.ts` (confirmed via test imports)

## Notes

- Implementation follows MongoDB specification for $near
- Uses flat earth distance (not spherical)
- For spherical calculations use $nearSphere
- Supports both legacy and GeoJSON formats
