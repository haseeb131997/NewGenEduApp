


class Validator{}

Validator.emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Validator.mobileReg = /^[0]?[789]\d{9}$/

Validator.mobileReg = /^(\+\d{1,3}[- ]?)?\d{10}$/

Validator.hasLowerCase = /(?=.*[a-z])/

Validator.hasNumber = /\d/

Validator.hasSpecialCharacter = /(\W)/

Validator.required = /(\W)/








Validator.emailNumberValidator = function(text){
    if (Validator.emailReg.test(text) === false && Validator.mobileReg.test(text) === false) {
        // Email/Mobile no. is Not Correct
        return false;
    }
    else{
        return true;
    }
}

Validator.emailValidator = function(text){
  if (Validator.emailReg.test(text) === false) {
      return false;
  }
  else{
      return true;
  }
}

Validator.mobileNumberValidator = function(text){
  if (Validator.mobileReg.test(text) === false) {
      return false;
  }
  else{
      return true;
  }
}

Validator.specialCharValidator = function(value){
// var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
var format = /[!@#^{}<>\/?]+/;
if(format.test(value)){
  return true;
} else {
  return false;
}
}




module.exports = {
    functions: Validator
  };