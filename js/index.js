function showForm(formId) {
    let forms = document.getElementsByClassName('formToInput');
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }

    let formToShow = document.getElementById(formId);
    formToShow.style.display = 'block';
}

let listPerson = new ListPerson()

const checkvalidation = () => {
    let arrIdInput = {}
    let isValid = true;
    let checkradio = document.querySelector(`#checkform input:checked`)
    if (checkradio) {
        arrIdInput = document.querySelectorAll(`#simpInfo input , #${checkradio.value} input`)
        let errorEle = document.querySelector(`#checkform .sp-thongbao`)
        isValid &= checkEmptyValue(`${checkradio.value}`, errorEle);
    } else {
        arrIdInput = document.querySelectorAll(`#simpInfo input`)
        let errorEle = document.querySelector(`#checkform .sp-thongbao`)
        isValid &= checkEmptyValue("", errorEle);
    }

    for (info of arrIdInput) {
        let { id, value } = info;
        let parentEle = info.parentElement;
        let errorEle = parentEle.querySelector(".sp-thongbao");

        if (id == "ma") {
            isValid &= checkmaTV(value, errorEle);
        }
        if (id == "hoTen") {
            isValid &= checkName(value, errorEle);
        }
        if (id == "email") {
            isValid &= checkEmailValue(value, errorEle);
        }
        if (id == "diaChi") {
            isValid &= checkEmptyValue(value, errorEle);
        }
        if (id == "diemToan" || id == "diemLy" || id == "diemHoa") {
            isValid &= checkScoreValue(value, errorEle);
        }
        if (id == "diemLy") {
            isValid &= checkScoreValue(value, errorEle);
        }
        if (id == "diemHoa") {
            isValid &= checkScoreValue(value, errorEle);
        }
        if (id == "ngayLam") {
            isValid &= checkNumber(value, errorEle);
        }
        if (id == "luong") {
            isValid &= checkNumber(value, errorEle);
        }
        if (id == "hoaDon") {
            isValid &= checkNumber(value, errorEle);
        }
        if (id == "tenCty") {
            isValid &= checkEmptyValue(value, errorEle);
        }
    }
    if (isValid) {
        return true
    }
}


//render
const renderDs = (arr = listPerson.list) => {
    let content = ""
    for (item of arr) {
        if (item instanceof Student) {
            let { hoTen, ma, diaChi, email, diemToan, diemHoa, diemLy, nguoiDung } = item
            content += `<tr><td>${ma}</td>
                    <td>${hoTen}</td>
                    <td>${diaChi}</td>
                    <td>${email}</td>
                    <td>${nguoiDung}</td>
                    <td>
                        <p>Điểm toán: ${diemToan}</p>
                        <p>Điểm lý: ${diemLy}</p>
                        <p>Điểm Hóa: ${diemHoa}</p>
                    </td>
                    <td>${item.tinhDiemTrungBinh()}</td>
                    <td style="text-align: center;">
                    <button onclick="getInfo('${ma}')" data-bs-toggle="modal" data-bs-target="#modalAddTV" class="btn btn-warning mb-2">Sửa</button>
            <button onclick="deleteTV('${ma}')"  class="btn btn-danger">Xoá</button>
                    </td>
                    </tr>`
        } else if (item instanceof Employee) {
            let { hoTen, ma, diaChi, email, ngayLam, luong, nguoiDung } = item
            content += `<tr><td>${ma}</td>
                    <td>${hoTen}</td>
                    <td>${diaChi}</td>
                    <td>${email}</td>
                    <td>${nguoiDung}</td>
                    <td>
                        <p>Số ngày làm được: ${ngayLam}</p>
                        <p>Lương 1 ngày: ${luong}</p>
                    </td>
                    <td>${item.tinhLuong().toLocaleString()} VND</td>
                    <td style="text-align: center;">
                    <button onclick="getInfo('${ma}')" data-bs-toggle="modal" data-bs-target="#modalAddTV" class="btn btn-warning mb-2">Sửa</button>
            <button onclick="deleteTV('${ma}')"  class="btn btn-danger">Xoá</button>
                    </td>
                    </tr>`
        } else if (item instanceof Customer) {
            let { hoTen, ma, diaChi, email, tenCty, hoaDon, danhGia, nguoiDung } = item
            content += `<tr><td>${ma}</td>
                    <td>${hoTen}</td>
                    <td>${diaChi}</td>
                    <td>${email}</td>
                    <td>${nguoiDung}</td>
                    <td>
                        <p>Tên công ty: ${tenCty}</p>
                        <p>Giá trị hóa đơn: ${hoaDon.toLocaleString()} VND</p>
                        <p>Đánh giá: ${danhGia}</p>
                    </td>
                    <td>không có</td>
                    <td style="text-align: center;">
                    <button onclick="getInfo('${ma}')" data-bs-toggle="modal" data-bs-target="#modalAddTV" class="btn btn-warning mb-2">Sửa</button>
            <button onclick="deleteTV('${ma}')"  class="btn btn-danger">Xoá</button>
                    </td>
                    </tr>`
        }
    }
    document.querySelector("#tableDanhSach").innerHTML = content
}

//lấy dữ liệu từ form
const getInfoForm = () => {
    let inputSimp = document.querySelectorAll('#simpInfo input')
    let check = document.querySelector(`#checkform input:checked`).value
    let inputformRadio = document.querySelectorAll(`#${check} input`)
    let ob = {}

    let value = Array.from(inputSimp).map(item => item.value)
    let value1 = Array.from(inputformRadio).map(item => item.value)

    if (check == "Student") {
        ob = new Student(...value, ...value1)
    }
    else if (check == "Employee") {
        ob = new Employee(...value, ...value1)
    }
    else if (check == "Customer") {
        let danhGia = document.querySelector('textarea').value
        ob = new Customer(...value, ...value1, danhGia)
    }
    return ob
}

//thêm mới
document.querySelector("#btnThemTV").onclick = () => {
    if(checkvalidation(0)){
        let ob = getInfoForm()
        listPerson.addPerson(ob)
        renderDs()
        saveLocalStorage()
        resetForm()
    }
}

//như tên
function resetForm() {
    let arrIdInput = document.querySelectorAll("#simpInfo input, textarea ,.formToInput input")
    for (item of arrIdInput) {
        item.value = "";
    }
    document.querySelector(`#checkform input:checked`).checked = false
    let forms = document.getElementsByClassName('formToInput');
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }
}

//save và get 
const saveLocalStorage = (key = "listPerson.list", value = listPerson.list) => {
    let stringJSON = JSON.stringify(value)
    localStorage.setItem(key, stringJSON)
}

const loadLocalStorage = (key = "listPerson.list") => {
    let dataLocal = localStorage.getItem(key);
    if (dataLocal) {
        let changeString = JSON.parse(dataLocal)
        for (item of changeString) {
            if (item.nguoiDung == "Student") {
                let student = new Student()
                Object.assign(student, item)
                listPerson.addPerson(student)
            } else if (item.nguoiDung == "Employee") {
                let employee = new Employee()
                Object.assign(employee, item)
                listPerson.addPerson(employee)
            } else if (item.nguoiDung == "Customer") {
                let customer = new Customer()
                Object.assign(customer, item)
                listPerson.addPerson(customer)
            }
        }
    }
    renderDs()
}

loadLocalStorage()

//như tên
function deleteTV(ma) {
    listPerson.subPerson(ma)
    renderDs()
    saveLocalStorage()
}

let arrinput = {}

function getInfo(ma) {
    let perSon = listPerson.list.find(item => item.ma == ma)
    if (perSon) {
        document.querySelector(`input[value="${perSon.nguoiDung}"]`).checked = true

        if (perSon.nguoiDung == "Customer") {
            arrinput = document.querySelectorAll(`#simpInfo input, #${perSon.nguoiDung} input,#${perSon.nguoiDung} #danhGia `)
        } else {
            arrinput = document.querySelectorAll(`#simpInfo input, #${perSon.nguoiDung} input`)
        }

        showForm(perSon.nguoiDung)

        for (item of arrinput) {
            let { id } = item
            item.value = perSon[`${id}`]
            if (id == "ma") {
                item.disabled = true;
            }
        }
    }
    document.querySelector("#btnThemTV").disabled = true
    document.querySelector("#btnCapNhat").disabled = false
}

//update
document.querySelector(`#btnCapNhat`).onclick = () => {
    if (checkvalidation()) {
        let ob=getInfoForm()
        let index = listPerson.list.findIndex(item => item.ma == ob.ma)
        listPerson.list[index] = ob
        renderDs()
        saveLocalStorage()
        resetForm()
    }
}

// sắp xếp theo họ tên
document.querySelector(`.up`).onclick = () => {
    renderDs(listPerson.list.sort((a, b) => a.hoTen.localeCompare(b.hoTen)))
}
document.querySelector(`.down`).onclick = () => {
    renderDs(listPerson.list.sort((a, b) => b.hoTen.localeCompare(a.hoTen)))
}


//loai người dùng
function search(event) {
    let newKeyWord = removeVietnameseTones(event.target.value.toLowerCase().trim());

    let arrfil = listPerson.list.filter(item => {
        let valueNguoiDung = removeVietnameseTones(item.nguoiDung.toLowerCase().trim());
        return valueNguoiDung.includes(newKeyWord)
    })
    renderDs(arrfil)
}

document.getElementById("searchNguoiDung").oninput = search;

