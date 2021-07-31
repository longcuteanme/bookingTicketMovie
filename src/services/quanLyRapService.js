import baseService from './baseService'
import { QUAN_LY_RAP } from "../utils/constants/settingSystem";

class quanLyRapService extends baseService {
    constructor(){
        super();
    }

    layThongTinHeThongRap=()=>{
        return this.get(`${QUAN_LY_RAP}LayThongTinHeThongRap`)
    }

    layThongTinCumRapTheoHeThong=(maHeThongRap)=>{
        return this.get(`${QUAN_LY_RAP}LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }

    layThongTinLichChieuHeThongRap=(maHeThongRap)=>{
        return this.get(`${QUAN_LY_RAP}LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`)
    }

    layThongTinLichChieuPhim=(maPhim)=>{
        return this.get(`${QUAN_LY_RAP}LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
}

export const QuanLyRapService=new quanLyRapService()