function checkEmptyValue(value, errorEle) {
    if (value == "") {
        errorEle.classList.add("d-block")
        errorEle.innerHTML = "Vui lòng không bỏ trống chỗ này";
        return false;
    } else {
        errorEle.innerHTML = "";
        errorEle.classList.remove("d-block")
        return true;
    }
}

function checkName(value, errorEle) {
    if(!checkEmptyValue(value, errorEle)){
        return false
    }
    let regexName = /^[^\d]+$/;
    let isValid = regexName.test(value);
    if (!isValid) {
        errorEle.innerHTML = "Vui lòng không nhập số";
        errorEle.classList.add("d-block")
        return false;
    } else {
        errorEle.innerHTML = "";
        errorEle.classList.remove("d-block")
        return true;
    }
}

function checkEmailValue(value, errorEle) {
    if(!checkEmptyValue(value, errorEle)){
        return false
    }
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let isValid = regexEmail.test(value);
    if (!isValid) {
        errorEle.innerHTML = "Vui lòng nhập đúng định dạng email";
        errorEle.classList.add("d-block")
        return false;
    } else {
        errorEle.innerHTML = "";
        errorEle.classList.remove("d-block")
        return true;
    }
}

function checkmaTV(value, errorEle) {
    if(!checkEmptyValue(value, errorEle)){
        return false
    }
    let regexTk = /^(?!.*\s)\S{1,4}$/;
    let isValid = regexTk.test(value);
    if (!isValid) {
        errorEle.innerHTML = "Vui lòng nhập chuỗi từ 4-6 ký tự và không có khoảng trắng";
        errorEle.classList.add("d-block")
        return false;
    } else {
        errorEle.innerHTML = "";
        errorEle.classList.remove("d-block")
        return true;
    }
}

function checkScoreValue (value,errorEle){
    if(!checkEmptyValue(value, errorEle)){
        return false
    }
    let regexScore = /^(10|[0-9])$/;
    let isValid = regexScore.test(value);
    if (!isValid){
        errorEle.innerHTML = "Nhập đúng định dạng điểm";
        return false;
    }
    else{
        errorEle.innerHTML = "";
        return true;
    }
}

const checkNumber=(value,errorEle)=>{
    if(!checkEmptyValue(value, errorEle)){
        return false
    }
    let regex=/^[1-9]*$/
    let isValid = regex.test(value);
    if (!isValid){
        errorEle.innerHTML = " Chỉ nhập số chỗ này";
        return false;
    }
    else{
        errorEle.innerHTML = "";
        return true;
    }
}