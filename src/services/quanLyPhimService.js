import baseService from "./baseService";
import { QUAN_LY_PHIM } from "../utils/constants/settingSystem";

class quanLyPhimService extends baseService {
    constructor(){
        super();
    }
    layDanhSachBanner=()=>{
        return this.get(`${QUAN_LY_PHIM}LayDanhSachBanner`)
    }

    layDanhSachPhim=()=>{
        return this.get(`${QUAN_LY_PHIM}LayDanhSachPhim`)
    }

    layThongTinPhim=(id)=>{
        return this.get(`${QUAN_LY_PHIM}LayThongTinPhim?MaPhim=${id}`)
    }

    layDanhSachPhimPhanTrang=(model)=>{
        let addUrl=''
        if((model.tenPhim!=='')&&(model.tenPhim)){
            addUrl=`&tenPhim=${model.tenPhim}`
        }
        return this.get(`${QUAN_LY_PHIM}LayDanhSachPhimPhanTrang?maNhom=GP01${addUrl}&soTrang=${model.soTrang}&soPhanTuTrenTrang=${model.soPhanTuTrenTrang}`)
    }

    xoaPhim=(id)=>{
        return this.del(`${QUAN_LY_PHIM}XoaPhim?MaPhim=${id}`)
    }

    themPhimUploadHinh=(model)=>{
        return this.post(`${QUAN_LY_PHIM}ThemPhimUploadHinh`,model)
    }

    capNhatPhimUpload=(model)=>{
        return this.post(`${QUAN_LY_PHIM}CapNhatPhimUpload`,model)
    }

}
export const QuanLyPhimService = new quanLyPhimService()