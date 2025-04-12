import { test, expect } from "@playwright/test";
import {
  isPowerOf2,
  nextPowerOf2,
} from "../components/memorysizeedit/MemorySizeEditHelpers";

test.describe("isPowerOf2", () => {
  test("should return true for powers of 2", () => {
    expect(isPowerOf2(1)).toBe(true);
    expect(isPowerOf2(2)).toBe(true);
    expect(isPowerOf2(4)).toBe(true);
    expect(isPowerOf2(8)).toBe(true);
    expect(isPowerOf2(16)).toBe(true);
  });

  test("should return false for non-powers of 2", () => {
    expect(isPowerOf2(0)).toBe(false);
    expect(isPowerOf2(3)).toBe(false);
    expect(isPowerOf2(5)).toBe(false);
    expect(isPowerOf2(6)).toBe(false);
    expect(isPowerOf2(-8)).toBe(false);
  });
});

test.describe("nextPowerOf2", () => {
  test("should return the next power of 2 for non-power-of-2 numbers", () => {
    expect(nextPowerOf2(3)).toBe(4); // Next power of 2 after 3
    expect(nextPowerOf2(5)).toBe(8); // Next power of 2 after 5
    expect(nextPowerOf2(9)).toBe(16); // Next power of 2 after 9
    expect(nextPowerOf2(15)).toBe(16); // Next power of 2 after 15
  });

  test("should return the next power of 2 for power-of-2 numbers", () => {
    expect(nextPowerOf2(1)).toBe(2); // Next power of 2 after 1
    expect(nextPowerOf2(2)).toBe(4); // Next power of 2 after 2
    expect(nextPowerOf2(4)).toBe(8); // Next power of 2 after 4
    expect(nextPowerOf2(8)).toBe(16); // Next power of 2 after 8
  });

  test("should handle edge cases", () => {
    expect(nextPowerOf2(0)).toBe(1); // Edge case: 0
    expect(nextPowerOf2(-1)).toBe(1); // Edge case: negative number
  });
});
