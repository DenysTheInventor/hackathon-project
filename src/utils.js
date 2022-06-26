export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

export function addZero(n) {
  return (n < 10 ? '0' : '') + n
}

export function returnDateNow() {
  const date = new Date()

  const hours = addZero(date.getHours())
  const minutes = addZero(date.getMinutes())

  const month = addZero(date.getMonth()+1)
  const day = addZero(date.getDate())
  const year= date.getFullYear()

  return `${hours}:${minutes}. ${day}-${month}-${year}`
}

export function triggerLog(logModule) {
  document.querySelector('.header-control__log-button').addEventListener('click', () => {
    logModule.trigger()
  })
}