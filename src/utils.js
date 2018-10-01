export function email(value) {  
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}

export function password(value) {
  return /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(value)
}

export function textLength(value) {
  return /^.{1,10}$/g.test(value)
}
