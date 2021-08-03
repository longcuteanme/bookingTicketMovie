import baseService from "./baseService";
import { QUAN_LY_NGUOI_DUNG } from "../utils/constants/settingSystem";

class quanLyNguoiDungService extends baseService{
    dangNhap=(model)=>{
        return this.post(`${QUAN_LY_NGUOI_DUNG}DangNhap`,model)
    }

    dangKy=(model)=>{
        return this.post(`${QUAN_LY_NGUOI_DUNG}DangKy`,model)
    }

    thongTinTaiKhoan=()=>{
        return this.post(`${QUAN_LY_NGUOI_DUNG}ThongTinTaiKhoan`)
    }

    capNhatThongTinNguoiDung=(model)=>{
        return this.put(`${QUAN_LY_NGUOI_DUNG}CapNhatThongTinNguoiDung`,model)
    }

    layDanhSachNguoiDungPhanTrang=(model)=>{
        let addUrl=''
        if((model.tuKhoa!=='')&&(model.tuKhoa)){
            addUrl=`&tuKhoa=${model.tuKhoa}`
        }
        return this.get(`${QUAN_LY_NGUOI_DUNG}LayDanhSachNguoiDungPhanTrang?MaNhom=GP01${addUrl}&soTrang=${model.soTrang}&soPhanTuTrenTrang=${model.soPhanTuTrenTrang}`)
    }

    timKiemNguoiDungPhanTrang=(model)=>{
        return this.get(`${QUAN_LY_NGUOI_DUNG}TimKiemNguoiDungPhanTrang`,model)
    }

    themNguoiDung=(model)=>{
        return this.post(`${QUAN_LY_NGUOI_DUNG}ThemNguoiDung`,model)
    }

    xoaNguoiDung=(model)=>{
        return this.del(`${QUAN_LY_NGUOI_DUNG}XoaNguoiDung?TaiKhoan=${model.taiKhoan}`,model)
    }
}

export const QuanLyNguoiDungService= new quanLyNguoiDungService()