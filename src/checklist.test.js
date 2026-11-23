import assert from 'node:assert/strict'
import { test } from 'node:test'
import { countCompleted } from './checklist.js'

const tasks = ['Run unit tests', 'Verify the staging deployment']

test('counts a checked task', () => {
  assert.equal(countCompleted(tasks, { 'Run unit tests': true }), 1)
})

test('does not count an unchecked task', () => {
  assert.equal(countCompleted(tasks, { 'Run unit tests': false }), 0)
})
