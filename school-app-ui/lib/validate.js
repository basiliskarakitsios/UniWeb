export function loginValidate(values){
    const errors = {}
    if(values.password.includes(" ")){
        errors.password = "Invalid Password"
    }

    return errors
}

export function registerValidate(values){
    const errors = {}
    if(values.status != "Student" && values.status != "Teacher"){
        errors.status = "Invalid Status"
    }

    if(values.password.includes(" ")){
        errors.password = "Invalid Password"
    }

    if(values.confirmPassword != values.password){
        errors.confirmPassword = "Please confirm your password"
    }

    return errors
}