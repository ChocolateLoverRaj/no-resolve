/* eslint-env mocha */
import noResolve from '../lib/index.js'
import { rejects } from 'assert'

it('doesn\'t resolve', async () => {
  const testPromise = new Promise(() => undefined)
  const timeoutPromise = Promise.resolve()
  await noResolve(testPromise, timeoutPromise)
})

it('resolves', async () => {
  const testPromise = Promise.resolve()
  const timeoutPromise = Promise.resolve()
  await rejects(noResolve(testPromise, timeoutPromise))
})

it('promise rejects', async () => {
  const testPromise = Promise.reject(new Error())
  const timeoutPromise = Promise.resolve().then(async () => await Promise.resolve())
  await rejects(noResolve(testPromise, timeoutPromise))
})

it('timeout rejects', async () => {
  const testPromise = Promise.resolve()
  const timeoutPromise = Promise.reject(new Error())
  await rejects(noResolve(testPromise, timeoutPromise))
})
