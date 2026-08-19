import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readSource = (file) =>
  readFile(new URL(`../src/sections/${file}`, import.meta.url), 'utf8')

test('presentation uses a compact grid that has a mobile layout', async () => {
  const source = await readSource('MeetDevClub.jsx')

  assert.match(source, /data-presentation-pillars/)
  assert.match(source, /grid-cols-1/)
  assert.match(source, /sm:grid-cols-2/)
  assert.match(source, /lg:grid-cols-5/)
})

test('results groups social proof into responsive cards', async () => {
  const source = await readSource('RealResults.jsx')

  assert.match(source, /data-results-proof/)
  assert.match(source, /grid-cols-1/)
  assert.match(source, /md:grid-cols-3/)
})
