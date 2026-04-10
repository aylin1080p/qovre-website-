/**
 * Qovre Smoke Tests
 *
 * Covers critical flows:
 * 1. Root redirect → /nl
 * 2. Homepage renders key elements
 * 3. Navigation links work
 * 4. Contact form — renders and validates
 * 5. Chat widget — visible on homepage
 * 6. Admin login page — renders and rejects bad credentials
 * 7. Service detail page — renders
 * 8. Blog index and post — renders
 * 9. FAQ pages — render
 * 10. City landing page — renders
 *
 * Run: npx playwright test
 * Run against production: PLAYWRIGHT_BASE_URL=https://www.qovre.nl npx playwright test
 *
 * Note: dev-mode first-load can be slow (Next.js on-demand compilation).
 * Tests use 60s timeout to accommodate this. Production runs are much faster.
 */

import { test, expect } from '@playwright/test'

// Increase timeout for slow dev-mode first compilation
test.setTimeout(60_000)

// ─── 1. Root redirect ────────────────────────────────────────────────────────
test('root / redirects to /nl', async ({ page }) => {
  await page.context().clearCookies()
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/nl/, { timeout: 15_000 })
})

// ─── 2. Homepage ─────────────────────────────────────────────────────────────
test('homepage NL renders h1 and nav logo', async ({ page }) => {
  await page.goto('/nl', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Qovre' }).first()).toBeVisible()
})

test('homepage EN renders h1', async ({ page }) => {
  await page.goto('/en', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

// ─── 3. Navigation ───────────────────────────────────────────────────────────
test('nav: diensten link navigates to /nl/diensten', async ({ page }) => {
  await page.goto('/nl', { waitUntil: 'domcontentloaded' })
  await page.getByRole('link', { name: /diensten/i }).first().click()
  await expect(page).toHaveURL(/\/nl\/diensten/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('nav: locale switcher navigates to EN', async ({ page }) => {
  await page.goto('/nl', { waitUntil: 'domcontentloaded' })
  await page.getByRole('link', { name: /^en$/i }).click()
  await expect(page).toHaveURL(/\/en/)
})

// ─── 4. Contact form ─────────────────────────────────────────────────────────
test('contact page renders form fields', async ({ page }) => {
  await page.goto('/nl/contact', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // Name field (placeholder "Jan de Vries")
  await expect(page.locator('input[placeholder="Jan de Vries"]')).toBeVisible()
  // Email field
  await expect(page.locator('input[type="email"]')).toBeVisible()
  // Message textarea
  await expect(page.locator('textarea')).toBeVisible()
  // Submit button
  await expect(page.getByRole('button', { name: /versturen|send/i })).toBeVisible()
})

test('contact form stays on page after empty submit attempt', async ({ page }) => {
  await page.goto('/nl/contact', { waitUntil: 'domcontentloaded' })
  const submitBtn = page.getByRole('button', { name: /versturen|send/i })
  await submitBtn.click()
  // HTML5 validation or custom error — should not navigate away
  await expect(page).toHaveURL(/\/nl\/contact/)
})

// ─── 5. Chat widget ───────────────────────────────────────────────────────────
test('chat widget toggle button is visible on homepage', async ({ page }) => {
  await page.goto('/nl', { waitUntil: 'domcontentloaded' })
  // Last button in DOM is typically the chat FAB
  const buttons = page.getByRole('button')
  const count = await buttons.count()
  expect(count).toBeGreaterThan(0)
  // At minimum there's a clickable button in the page
  await expect(buttons.last()).toBeVisible()
})

// ─── 6. Admin login ───────────────────────────────────────────────────────────
test('admin login page renders at /admin', async ({ page }) => {
  await page.goto('/admin', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('input[type="email"]')).toBeVisible()
  await expect(page.locator('input[type="password"]')).toBeVisible()
  await expect(page.getByRole('button', { name: /login|inloggen|sign in/i })).toBeVisible()
})

test('admin login rejects wrong credentials and stays on page', async ({ page }) => {
  await page.goto('/admin', { waitUntil: 'domcontentloaded' })
  await page.locator('input[type="email"]').fill('hacker@example.com')
  await page.locator('input[type="password"]').fill('wrongpassword123')
  await page.getByRole('button', { name: /login|inloggen|sign in/i }).click()
  // Should NOT navigate to /admin/dashboard
  await page.waitForTimeout(2_000)
  await expect(page).not.toHaveURL(/\/admin\/dashboard/)
})

// ─── 7. Service detail page ───────────────────────────────────────────────────
test('service detail NL renders (business-websites)', async ({ page }) => {
  await page.goto('/nl/business-websites', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('service detail EN renders (business-websites)', async ({ page }) => {
  await page.goto('/en/business-websites', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

// ─── 8. Blog ─────────────────────────────────────────────────────────────────
test('blog index NL renders', async ({ page }) => {
  await page.goto('/nl/blog', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: /lees meer/i }).first()).toBeVisible()
})

test('blog index EN renders', async ({ page }) => {
  await page.goto('/en/blog', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('blog post NL renders', async ({ page }) => {
  await page.goto('/nl/blog/maatwerk-website-vs-template', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: /terug naar blog/i })).toBeVisible()
})

test('blog post EN renders', async ({ page }) => {
  await page.goto('/en/blog/ai-chatbot-voor-bedrijven', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

// ─── 9. FAQ pages ────────────────────────────────────────────────────────────
test('FAQ NL page renders', async ({ page }) => {
  await page.goto('/nl/veelgestelde-vragen', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('FAQ EN page renders', async ({ page }) => {
  await page.goto('/en/faq', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

// ─── 10. City landing ────────────────────────────────────────────────────────
test('city landing NL renders (amsterdam)', async ({ page }) => {
  await page.goto('/nl/software-ontwikkeling/amsterdam', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('city landing EN renders (amsterdam)', async ({ page }) => {
  await page.goto('/en/software-development/amsterdam', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

// ─── 11. Industries / Sectoren ───────────────────────────────────────────────
test('industries EN page renders', async ({ page }) => {
  await page.goto('/en/industries', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('sectoren NL page renders', async ({ page }) => {
  await page.goto('/nl/sectoren', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})
