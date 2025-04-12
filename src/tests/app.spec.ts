import { test, expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv";
import {
  cpuSelectTestId,
  gpuCheckboxTestId,
  memorySizeEditTestId,
  submitButtonTestId,
} from "../testHelpers";
import { CPUType } from "../components/cpuselect/CPUSelectTypes";

dotenv.config();
const baseUrl: string = process.env.BASE_URL || "";

const selectByTestId = (page: Page, testId: string): Locator =>
  page.locator(`[data-testid="${testId}"]`);

test("fresh page state test", async ({ page }) => {
  expect(baseUrl).not.toBe("");

  await page.goto(baseUrl);

  await expect(page).toHaveTitle("Server Composer");

  const cpuSelect = selectByTestId(page, cpuSelectTestId);

  // cpu select control visible, has no default value
  await expect(cpuSelect).toBeVisible();
  expect(await cpuSelect.inputValue()).toBe("");

  const memorySizeEdit = selectByTestId(page, memorySizeEditTestId);

  // memory size edit box visible, empty
  await expect(memorySizeEdit).toBeVisible();
  expect(await cpuSelect.inputValue()).toBe("");

  const gpuCheckbox = selectByTestId(page, gpuCheckboxTestId);

  // GPU checkbox visible and unchecked
  await expect(gpuCheckbox).toBeVisible();
  await expect(gpuCheckbox).not.toBeChecked();

  const submitButton = selectByTestId(page, submitButtonTestId);

  // Submit button visible and disabled
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeDisabled();

  // check that the prompt is there
  await expect(page.locator("text=Select server options")).toBeVisible();
});

test("test a happy path", async ({ page }) => {
  expect(baseUrl).not.toBe("");

  await page.goto(baseUrl);

  const cpuSelect = selectByTestId(page, cpuSelectTestId);
  const memorySizeEdit = selectByTestId(page, memorySizeEditTestId);
  const gpuCheckbox = selectByTestId(page, gpuCheckboxTestId);
  const submitButton = selectByTestId(page, submitButtonTestId);

  // set controls
  await cpuSelect.fill(CPUType.ARM);
  await memorySizeEdit.fill("524288");
  await gpuCheckbox.check();

  // submit
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // check output
  await expect(page.locator("text=Available Server Options")).toBeVisible();
  await expect(page.locator("text=High Density Server")).toBeVisible();
});
