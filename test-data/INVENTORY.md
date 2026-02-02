# Monger Operator Inventory Report

**Generated:** 2026-02-01  
**Total Operators with Test Data:** 171

## Summary by Category

### ✅ PERFECT (100% Pass Rate)
These operators are fully working:

| Operator | Type | Tests | Notes |
|----------|------|-------|-------|
| $arrayElemAt | Array | 100% | Fully implemented |
| $gte | Comparison | 100% | Fully implemented |

### 🟡 MOSTLY WORKING (81-99% Pass Rate)
Need minor fixes:

| Operator | Type | Pass Rate | Issue |
|----------|------|-----------|-------|
| $eq | Comparison | 80% | Deep equality for objects/arrays |

### 🟠 PARTIAL (51-80% Pass Rate)

| Operator | Type | Pass Rate | Issue |
|----------|------|-----------|-------|
| $arrayToObject | Array | 45% | Null handling, error messages |
| $isArray | Boolean | 50% | Type checking edge cases |

### 🔴 NEEDS MAJOR WORK (0-50% Pass Rate)
Significant implementation needed:

| Operator | Type | Pass Rate | Status |
|----------|------|-----------|--------|
| $add | Arithmetic | 33% | Partial implementation |
| $multiply | Arithmetic | 33% | Partial implementation |
| $pow | Arithmetic | 33% | Partial implementation |
| $gt | Comparison | 50% | Needs completion |
| $lte | Comparison | 50% | Needs completion |
| $and | Boolean | 0% | Not working correctly |
| $or | Boolean | 0% | Not working correctly |
| $not | Boolean | 0% | Not working correctly |

### 📦 NOT IMPLEMENTED
These operators need full implementation:

**Array Operators:**
- $concatArrays (test data ready)
- $filter
- $indexOfArray
- $map
- $reduce
- $range
- $reverseArray
- $size
- $slice
- $zip

**String Operators:**
- $concat
- $indexOfBytes
- $indexOfCP
- $ltrim
- $rtrim
- $trim
- $split
- $strLenBytes
- $strLenCP
- $strcasecmp
- $substr
- $substrBytes
- $substrCP
- $toLower
- $toUpper

**Date Operators:**
- $dateAdd
- $dateDiff
- $dateFromParts
- $dateFromString
- $dateSubtract
- $dateToParts
- $dateToString
- $dateTrunc
- $dayOfMonth
- $dayOfWeek
- $dayOfYear
- $hour
- $isoDayOfWeek
- $isoWeek
- $isoWeekYear
- $millisecond
- $minute
- $month
- $second
- $week
- $year

**Trigonometry Operators:**
- $acos, $acosh, $asin, $asinh, $atan, $atan2, $atanh
- $cos, $cosh
- $sin, $sinh
- $tan, $tanh
- $degreesToRadians, $radiansToDegrees

**Window Operators:**
- $covariancePop, $covarianceSamp
- $denseRank, $derivative, $documentNumber
- $expMovingAvg, $integral
- $linearFill, $locf
- $minN, $maxN
- $rank

**Other Missing:**
- $allElementsTrue, $anyElementTrue (Boolean)
- $binarySize, $bsonSize (Data Size)
- $bitAnd, $bitNot, $bitOr, $bitXor (Bitwise)
- $convert (Type)
- $function (Custom)
- $getField (Misc)
- $ifNull (Conditional)
- $in (Comparison)
- $isNumber (Type)
- $let (Variable)
- $literal (Literal)
- $ln, $log, $log10 (Logarithm)
- $minMaxScaler (Window)
- $mod (Evaluation)
- $ne, $nin (Comparison)
- $nor, $not (Logical)
- $objectToArray (Array)
- $rand (Random)
- $regex (Evaluation)
- $round, $trunc (Arithmetic)

## Priority Recommendations

### Phase 1: Quick Wins (High Impact, Low Effort)
1. **$eq** - Fix deep equality (80% → 100%)
2. **$concatArrays** - Implement (0% → 100%, test data ready)
3. **$concat** - Implement basic string concatenation
4. **$gt, $lte** - Complete implementation (50% → 100%)

### Phase 2: Core Operators (High Impact, Medium Effort)
1. **$and, $or, $not** - Fix Boolean logic
2. **$size** - Array size operator
3. **$in** - Array membership
4. **$ifNull** - Null handling

### Phase 3: Advanced Features (Lower Priority)
1. **Date operators** - Comprehensive date handling
2. **String operators** - Full string manipulation suite
3. **Trigonometry** - Math functions
4. **Window operators** - Advanced aggregation features

## Test Data Status

✅ **Test data created for all 171 operators**  
✅ **Error codes extracted from MongoDB source**  
✅ **Ready for implementation**

### Usage

Run tests for any operator:
```bash
node scripts/run-mongodb-tests.js <operator>
```

Example:
```bash
node scripts/run-mongodb-tests.js concatArrays
node scripts/run-mongodb-tests.js eq
```

## Next Steps

1. Pick an operator from "Quick Wins" list
2. Run `node scripts/run-mongodb-tests.js <operator>` to see failures
3. Implement/fix in `source/Domain/Filter/Operator/Evaluation/Expression/`
4. Re-run tests until 100% pass
5. Update `docs/status/README.md` status

## Test Runner Output Example

```
============================================================
Testing operator: $eq
============================================================

📗 Happy Path Tests (15):
------------------------------------------------------------
  ✅ Equal integers return true
  ❌ Equal objects return true
     Expected: true
     Actual: false
     Reason: Result mismatch

SUMMARY
============================================================
Total Tests: 25
Passed: 20 ✅
Failed: 5 ❌
```

