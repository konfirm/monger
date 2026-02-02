# Monger Operator Issues - Findings Index

**Last Updated**: 2026-02-01  
**Total Operators with Issues**: 10+  
**Total Findings Documents**: 4

## Quick Reference

### ✅ RESOLVED

| Operator | Status | Pass Rate | Notes |
|----------|--------|-----------|-------|
| $eq | ✅ **Complete** | **100%** | Deep equality fixed, all tests passing |
| $ne | ✅ **Complete** | **100%** | Fixed by $eq update (uses same deepEqual) |

### High Priority Issues (Blocking)

| Operator | Status | Pass Rate | Issue Type | Findings File |
|----------|--------|-----------|------------|---------------|
| $concatArrays | ❌ Not Implemented | 0% | Missing | [concatArrays-implementation.md](concatArrays-implementation.md) |
| expr-$and | ✅ Complete | 100% | - | - |
| expr-$or | ✅ Complete | 100% | - | - |
| expr-$not | 89% | Needs Review | - | [expr-not-issues.md](expr-not-issues.md) |

### Medium Priority Issues

| Operator | Status | Pass Rate | Issue Type | Findings File |
|----------|--------|-----------|------------|---------------|
| $arrayToObject | ⚠️ Partial | 45% | Validation | [arrayToObject-issues.md](arrayToObject-issues.md) |
| $gt | ⚠️ Partial | 50% | Needs Completion | [eq-issues.md](eq-issues.md)* |
| $lte | ⚠️ Partial | 50% | Needs Completion | [eq-issues.md](eq-issues.md)* |

*Related to $eq - same deep equality issues

## Findings Documents

### 1. [eq-issues.md](eq-issues.md) ✅ RESOLVED
**Operators**: $eq, $ne  
**Status**: **Complete - 100% tests passing**  
**Issues Fixed**:
- ✅ Deep equality implemented for objects/arrays
- ✅ Type coercion rules fixed (false/0, true/1 handled correctly)
- ✅ Null/undefined equivalence working
- ✅ 25/25 tests passing

**Changes**:
- Implemented `deepEqual()` function in Comparison.ts
- Updated `$eq` and `$ne` to use deep equality
- Fixed null/undefined comparison (MongoDB treats both as "nullish")

### 2. [concatArrays-implementation.md](concatArrays-implementation.md)
**Operators**: $concatArrays  
**Issues**:
- Not implemented (0% pass rate)
- All 36 tests fail
- Test data complete and ready

**Fix Required**:
- Full implementation in Array.ts
- Handle null/missing inputs
- Validate array inputs (error 28664)

### 3. [arrayToObject-issues.md](arrayToObject-issues.md)
**Operators**: $arrayToObject  
**Issues**:
- Null handling incorrect (throws instead of returning null)
- Non-string key validation missing
- Null byte validation missing
- 45% pass rate, 16 test failures

**Fix Required**:
- Check null/undefined before type validation
- Add key type validation
- Add null byte validation (optional)

### 4. [Boolean-expr-issues.md](Boolean-expr-issues.md)
**Operators**: $and, $or, $not  
**Issues**:
- 0% pass rate despite implementation
- Likely registration issue in Expression.ts
- Confusion with Query Predicate operators

**Fix Required**:
- Debug registration/import
- Verify export format
- Test direct compilation

## Issue Categories

### Implementation Missing (Not Started)
- $concatArrays
- $concat (String)
- $size (Array)
- $in (Comparison)
- All Date operators
- All String operators
- All Trigonometry operators

### Implementation Partial (Needs Fixes)
- $eq (Deep equality)
- $arrayToObject (Null handling)
- $gt, $lte (Complete implementation)

### Implementation Broken (Not Working)
- $and, $or, $not (Registration issue)

### Working Well (100% Pass)
- $arrayElemAt
- $gte

## How to Use Findings

Each findings document contains:
1. **Test Results** - Current pass rate and failing tests
2. **Issues Identified** - Specific problems with details
3. **Expected Behavior** - What MongoDB does
4. **Proposed Fixes** - Code suggestions
5. **Implementation Location** - Where to make changes
6. **Test Command** - How to verify fixes

## Running Tests

To test a specific operator:
```bash
node scripts/run-mongodb-tests.js <operator>
```

Example:
```bash
node scripts/run-mongodb-tests.js eq
node scripts/run-mongodb-tests.js arrayToObject
node scripts/run-mongodb-tests.js concatArrays
```

## Creating New Findings

When you discover issues with an operator:

1. Run tests: `node scripts/run-mongodb-tests.js <operator>`
2. Document failing tests
3. Identify root cause
4. Create findings file: `docs/status/findings/<operator>-issues.md`
5. Link in this index
6. Update README.md status if needed

## Priority Order for Fixes

Based on impact and effort:

### ✅ Completed
- ~~$eq~~ - ✅ **DONE** - Deep equality fixed, 100% passing

### Next Up
1. **$concatArrays** - Quick win, test data ready, 36 tests to pass
2. **$and/$or/$not** - Fix registration pattern (0% → 100%)
3. **$arrayToObject** - Fix null handling (45% → 100%)
4. **$concat** - Basic string concatenation
5. **$size** - Common array operation
6. **$in** - Array membership operator

## Notes

- All test data files are in `test-data/<operator>.json`
- All operators have complete test coverage from MongoDB jstests
- Error codes are extracted from MongoDB C++ source
- The test runner shows exact expected vs actual values
- Findings documents should be updated as issues are resolved

