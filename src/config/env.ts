const ENV = {
  DEV: 'dev',
  PROD: 'prod',
}

let env
function getEnv() {
  if (!env) {
    const host = window.location.hostname
    if (host.match(/-dev/) || host.match(/localhost/)) {
      env = ENV.DEV
    } else {
      env = ENV.PROD
    }
  }
  return env
}

export const isDevEnv = () => getEnv() === ENV.DEV
export const isProdEnv = () => getEnv() === ENV.PROD
