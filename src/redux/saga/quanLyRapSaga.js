import {takeLatest,put,call} from 'redux-saga/effects';
import { QuanLyRapService } from "../../services/quanLyRapService";
import {STATUS_CODE} from '../../utils/constants/settingSystem'
import {DISPLAY_LOADING, DISPLAY_TABLE_LOADING, HIDE_LOADING, HIDE_TABLE_LOADING, LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG, LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG_SAGA, LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG, LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_SAGA, LAY_THONG_TIN_HE_THONG_RAP,LAY_THONG_TIN_HE_THONG_RAP_SAGA, LAY_THONG_TIN_LICH_CHIEU_PHIM, LAY_THONG_TIN_LICH_CHIEU_PHIM_SAGA} from '../constants/totalConstants'



function * layThongTinHeThongRap(action){
    yield put({
        type:DISPLAY_TABLE_LOADING
    })
    try{
        let {data,status} = yield call(QuanLyRapService.layThongTinHeThongRap);
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:LAY_THONG_TIN_HE_THONG_RAP,
                payload:{
                    listHeThongRap:data.content,
                }
            })
            if(action?.chucNang==='layThongTinLichChieuPhim'){
                yield put({
                    type:LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG_SAGA,
                    payload:{
                        maHeThongRap:data.content[0].maHeThongRap
                    }
                })
            }
        }
    }
    catch(err){
        yield alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
    }
    yield put({
        type:HIDE_TABLE_LOADING
    })
}

export function * sagaLayThongTinHeThongRap(){
    yield takeLatest(LAY_THONG_TIN_HE_THONG_RAP_SAGA,layThongTinHeThongRap)  
}

function * layThongTinCumRapTheoHeThong(action){
    const {maHeThongRap}=action.payload
    try{
        let {data,status} = yield call(QuanLyRapService.layThongTinCumRapTheoHeThong,maHeThongRap);
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG,
                payload:{
                    listDanhSachCumRapTheoHeThong:data.content,
                }
            })
        }
    }
    catch(err){
        yield alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
    }
}

export function * sagaLayThongTinCumRapTheoHeThong(){
    yield takeLatest(LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_SAGA,layThongTinCumRapTheoHeThong)  
}

function * layThongTinLichChieuHeThongRap(action){
    yield put({
        type:DISPLAY_TABLE_LOADING
    })
    const {maHeThongRap}=action.payload
    try{
        let {data,status} = yield call(QuanLyRapService.layThongTinLichChieuHeThongRap,maHeThongRap);
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG,
                payload:{
                    listDanhSachLichChieuTheoHeThong:data.content[0].lstCumRap,
                }
            })
        }
        else{
            alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
        }
    }
    catch(err){
        console.log(err)
    }
    yield put({
        type:HIDE_TABLE_LOADING
    })
}

export function * sagaLayThongTinLichChieuHeThongRap(){
    yield takeLatest(LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG_SAGA,layThongTinLichChieuHeThongRap)  
}

function * layThongTinLichChieuPhim(action){
    yield put({
        type:DISPLAY_LOADING
    })
    const {maPhim}=action.payload
    try{
        let {data,status} = yield call(QuanLyRapService.layThongTinLichChieuPhim,maPhim);
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:LAY_THONG_TIN_LICH_CHIEU_PHIM,
                payload:{
                    thongTinChiTietPhim:data.content,
                }
            })
        }
        else{
            alert('Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ')
        }
    }
    catch(err){
        console.log(err)
    }
    yield put({
        type:HIDE_LOADING
    })
}

export function * sagaLayThongTinLichChieuPhim(){
    yield takeLatest(LAY_THONG_TIN_LICH_CHIEU_PHIM_SAGA,layThongTinLichChieuPhim)  
}