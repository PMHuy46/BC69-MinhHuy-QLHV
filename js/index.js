function showForm(formId) {
    let forms = document.getElementsByClassName('formToInput');
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }

    let formToShow = document.getElementById(formId);
    formToShow.style.display = 'block';
}

let listPerson = new ListPerson()



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

document.querySelector("#btnThemTV").onclick = () => {
    let ob = getInfoForm()
    listPerson.addPerson(ob)
    renderDs()
    saveLocalStorage()
    resetForm()
}

function resetForm() {
    let arrIdInput = document.querySelectorAll("#simpInfo input, textarea ,.formToInput input")
    for (item of arrIdInput) {
        item.value = "";
    }
    let check = document.querySelector(`#checkform input:checked`).checked = false
    let forms = document.getElementsByClassName('formToInput');
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }
}

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

function deleteTV(ma) {
    listPerson.subPerson(ma)
    renderDs()
    saveLocalStorage()
}

let arrinput={}

function getInfo(ma) {
    let perSon = listPerson.list.find(item => item.ma == ma)
    if (perSon) {
        document.querySelector(`input[value="${perSon.nguoiDung}"]`).checked = true

        if (perSon.nguoiDung == "Customer") {
            arrinput = document.querySelectorAll(`#simpInfo input, #${perSon.nguoiDung} input,#${perSon.nguoiDung} #danhGia `)
        }else{
            arrinput = document.querySelectorAll(`#simpInfo input, #${perSon.nguoiDung} input`)
        }
        
        showForm(perSon.nguoiDung)

        for (item of arrinput) {
            let { id } = item
            item.value = perSon[`${id}`]
            if(id == "ma"){
                item.disabled = true;
            }
        }
    }
}

document.querySelector(`#btnCapNhat`).onclick=()=>{
    let  ob = getInfoForm()
    let index = listPerson.list.findIndex(item => item.ma == ob.ma)
    console.log(index)
    listPerson.list[index]=ob
    renderDs()
    saveLocalStorage()
    resetForm()
}

const getInfoForm =()=>{
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