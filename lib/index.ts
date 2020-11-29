type NoResolve = (promise: Promise<unknown>, timeout: Promise<unknown>) => Promise<void>

const noResolve: NoResolve = async (promise, timeout) => await new Promise((resolve, reject) => {
  promise
    .then(() => {
      reject(new Error('Given promise was resolved.'))
    })
    .catch(() => {
      reject(new Error('Given promise rejected.'))
    })
  timeout
    .then(() => {
      resolve()
    })
    .catch(() => {
      reject(new Error('Given timeout rejected.'))
    })
})

export default noResolve
