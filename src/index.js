function email(value) {  
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}

function password(value) {
  return /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(value)
}

class Form {
  constructor({
    inputGroup,
    initVerification = false,
    totalErrorCallback,
  } = {}) {
    this.inputGroup = inputGroup

    this.password = null;

    this.isEmail = true;
    this.isPassword = true;
    this.isCheckPassword = true;
    this.isUser = true;

    this.totalError = null;
    this.initVerification = initVerification;
    this.totalErrorCallback = totalErrorCallback;

    this.version  = 'VERSION';
    this.author   = 'SHENG';

    this.whoUseIt = this.inputGroup[0].label.parentElement || 'No Parent Here'

    this.init()
    console.log('watch init ...')
  }

  init() {
    this.initVerification 
    ? this.verification()
    : null

    // 需要被驗證的一開始，設定成 false
    this.setDefaultValue()

    this.bindEvent()
  }

  responseData(type, value) {
    type === 'password' ? this.password = value : null
  }

  clearAllInputStatus() {
    for (let inputs of this.inputGroup) {
      inputs.label.classList.remove('invalid')
      inputs.label.classList.remove('valid')
    }
  }

  responseStatus(ele, status) {
    status
    ? (
      ele.classList.remove('invalid'),
      ele.classList.add('valid')
    )
    : (
      ele.classList.add('invalid'),
      ele.classList.remove('valid')
    )
  }

  setDefaultValue() {
    for (const input of Array.from(this.inputGroup)) {
      input.type === 'email' ? this.isEmail = false : true
      input.type === 'password' ? this.isPassword = false : true
      input.type === 'check_password' ? this.isCheckPassword = false : true
      input.type === 'other' ? this.isUser = false : true
    }
  }
  
  inputCheck(label, type, value) {
    switch(type) {
      case 'user': 
        this.isUser = true
      break;
      case 'email':
        this.isEmail = email(value)

        value.length > 0 
        ? email(value)
          ? (
            label.classList.remove('invalid'),
            label.classList.add('valid')
          )
          : (
            label.classList.add('invalid'),
            label.classList.remove('valid')
          )
        : (
          label.classList.remove('invalid'),
          label.classList.remove('valid')
        )
      break;

      case 'password':
        if (password(value)) {
          this.password = value
        }
        this.isPassword = password(value)

        value.length > 0 
        ? password(value) 
          ? (
            label.classList.remove('invalid'),
            label.classList.add('valid')
          )
          : (
            label.classList.add('invalid'),
            label.classList.remove('valid')
          )
        : (
          label.classList.remove('invalid'),
          label.classList.remove('valid')
        )
      break;

      case 'check_password':
        let checkPassword = value

        this.isCheckPassword = checkPassword === this.password

        value.length > 0 
        ? checkPassword === this.password
          ? (
            label.classList.remove('invalid'),
            label.classList.add('valid')
          )
          : (
            label.classList.add('invalid'),
            label.classList.remove('valid')
          )
        : (
          label.classList.remove('invalid'),
          label.classList.remove('valid')
        )
      break;

      case 'other':
      break;
    }
  }

  inputStatus() {
    let result = null;

    if (
      this.isEmail && 
      this.isPassword && 
      this.isCheckPassword &&
      this.isUser
    ) {
      result = true
    } else {
      result = false
    }

    return result;
  }

  verification() {
    for (let input of Array.from(this.inputGroup)) {
      input.label.querySelector('input').value 
      ? this.inputCheck(
        input.label, 
        input.type, 
        input.label.querySelector('input').value, 
        input.isResponseStatus
      )
      : console.log('NO VALUES')

      this.inputStatus() 
      ? this.totalError = true 
      : this.totalError = false
    }

    this.totalErrorCallback(this.totalError)    
  }

  bindEvent() {
    for (let input of Array.from(this.inputGroup)) {
      input.input.addEventListener('input', (e) => {
        this.inputCheck(input.label, input.type, e.target.value, input.isResponseStatus)
        this.inputStatus()

        e.target.value.length > 0 
        && this.inputStatus()
        ? this.totalError = true
        : this.totalError = false

        this.totalErrorCallback(this.totalError)
      })
    }
  }

  destroyed() {
    this.inputGroup       = null
    this.password         = null;
    this.isEmail          = null;
    this.isPassword       = null;
    this.isCheckPassword  = null;
    this.isUser           = null;
    this.totalError       = null;
    this.version          = null;
    this.author           = null;
  }
}

window.Form = Form
