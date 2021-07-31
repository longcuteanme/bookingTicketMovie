import {takeLatest,put,call} from 'redux-saga/effects';
import { STATUS_CODE } from '../../utils/constants/settingSystem';
import { DAT_VE_SAGA, DISPLAY_LOADING, HIDE_LOADING, LAY_DANH_SACH_PHONG_VE, LAY_DANH_SACH_PHONG_VE_SAGA, TAO_LICH_CHIEU_SAGA } from '../constants/totalConstants';
import {QuanLyDatVeService} from '../../services/quanLyDatVeService'

function * layDanhSachPhongVe(action){
    const {id}=action.payload
    yield put({
        type:DISPLAY_LOADING
    })
    try{
        let {data,status} = yield call(QuanLyDatVeService.layDanhSachPhongVe,id);
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:LAY_DANH_SACH_PHONG_VE,
                payload:{
                    thongTinPhim:data.content.thongTinPhim,
                    danhSachGhe:data.content.danhSachGhe,
                }
            })
        }
        else{
            alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
        }
    }
    catch(err){
        console.log(err);
    }
    yield put({
        type:HIDE_LOADING
    })
}
export function * sagaLayDanhSachPhongVe(){
    yield takeLatest(LAY_DANH_SACH_PHONG_VE_SAGA,layDanhSachPhongVe)  
}

function * datVe(action){
    const model=action.payload?.datVe
    const history=action.payload.history
    yield put({
        type:DISPLAY_LOADING
    })
    try{
        let {status} = yield call(QuanLyDatVeService.datVe,model);
        if(status===STATUS_CODE.SUCCESS){
            yield alert('Đặt vé thành công, vào phần tài khoản để kiểm tra')
        }
        else{
            yield alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
        }
    }
    catch(err){
        console.log(err);
    }
    yield history.push('/TaiKhoan')
    yield put({
        type:HIDE_LOADING
    })
}
export function * sagaDatVe(){
    yield takeLatest(DAT_VE_SAGA,datVe)  
}

function * taoLichChieu(action){
    const model=action.payload.model
    try{
        let {status} = yield call(QuanLyDatVeService.taoLichChieu,model);
        if(status===STATUS_CODE.SUCCESS){
            yield alert('Tạo lịch chiếu thành công')
        }
    }
    catch(error){
        const err={...error}
        yield console.log(error,err)
        if(err.response){
            yield alert(`ERROR${err?.response?.status}: ${err?.response?.data?.content}`)
        }
        else{
            yield alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
        }
    }
}
export function * sagaTaoLichChieu(){
    yield takeLatest(TAO_LICH_CHIEU_SAGA,taoLichChieu)  
}
