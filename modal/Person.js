class Person {
    constructor(ma, hoTen, diaChi, email) {
        this.hoTen = hoTen;
        this.diaChi = diaChi;
        this.ma = ma;
        this.email = email;
    }
}

class Student extends Person {
    constructor(ma, hoTen, diaChi, email, diemToan, diemLy, diemHoa) {
        super(ma, hoTen, diaChi, email);
        this.diemToan = diemToan;
        this.diemLy = diemLy;
        this.diemHoa = diemHoa;
        this.nguoiDung = "Student"
    }
    tinhDiemTrungBinh = function () {
        return (
            (this.diemToan * 1 + this.diemLy * 1 + this.diemHoa * 1) / 3
        );
    };
}

class Employee extends Person {
    constructor(ma, hoTen, diaChi, email, ngayLam, luong) {
        super(ma, hoTen, diaChi, email);
        this.ngayLam = ngayLam;
        this.luong = luong;
        this.nguoiDung = "Employee"
    }

    tinhLuong = () => {
        return (this.ngayLam * this.luong)
    }
}

class Customer extends Person {
    constructor(ma, hoTen, diaChi, email, tenCty, hoaDon, danhGia) {
        super(ma, hoTen, diaChi, email);
        this.tenCty = tenCty;
        this.hoaDon = hoaDon;
        this.danhGia = danhGia;
        this.nguoiDung = "Customer"
    }
}

class ListPerson {
    list = []
    addPerson(item) {
        if (item instanceof Person) {
            this.list.push(item)
        }
    }
    subPerson(ma) {
        let index = listPerson.list.findIndex(item => item.ma == ma)
        if (index != -1) {
            this.list.splice(index, 1)
        }
    }
}