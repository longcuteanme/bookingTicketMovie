import { QUAN_LY_DAT_VE } from '../utils/constants/settingSystem';
import baseService from './baseService'

class quanLyDatVeService extends baseService{
    layDanhSachPhongVe=(id)=>{
        return this.get(`${QUAN_LY_DAT_VE}LayDanhSachPhongVe?MaLichChieu=${id}`)
    }

    datVe=(model)=>{
        return this.post(`${QUAN_LY_DAT_VE}DatVe`,model)
    }

    taoLichChieu=(model)=>{
        return this.post(`${QUAN_LY_DAT_VE}TaoLichChieu`,model)
    }
}

export const QuanLyDatVeService = new quanLyDatVeService()