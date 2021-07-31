import {all} from 'redux-saga/effects'
import * as QUANLYPHIMSAGA from './quanLyPhimSaga'
import * as QUANLYRAPSAGA from './quanLyRapSaga'
import * as QUANLYNGUOIDUNGSAGA from './quanLyNguoiDungSaga'
import * as QUANLYDATVESAGA from './quanLyDatVeSaga'

export function * sagaRoot(){
    // yield fork(getTaskAPI);
    yield all([
        QUANLYPHIMSAGA.sagaLayDanhSachBanner(),
        QUANLYPHIMSAGA.sagaLayDanhSachPhim(),
        QUANLYPHIMSAGA.sagaLayThongTinPhim(),
        QUANLYPHIMSAGA.sagaLayDanhSachPhimPhanTrang(),
        QUANLYPHIMSAGA.sagaThemPhim(),
        QUANLYPHIMSAGA.sagaXoaPhim(),
        QUANLYPHIMSAGA.sagaCapNhatPhim(),
        QUANLYRAPSAGA.sagaLayThongTinHeThongRap(),
        QUANLYRAPSAGA.sagaLayThongTinCumRapTheoHeThong(),
        QUANLYRAPSAGA.sagaLayThongTinLichChieuHeThongRap(),
        QUANLYRAPSAGA.sagaLayThongTinLichChieuPhim(),
        QUANLYNGUOIDUNGSAGA.sagaDangNhap(),
        QUANLYNGUOIDUNGSAGA.sagaThongTinTaiKhoan(),
        QUANLYNGUOIDUNGSAGA.sagaCapNhatThongTinNguoiDung(),
        QUANLYNGUOIDUNGSAGA.sagaLayDanhSachNguoiDungPhanTrang(),
        QUANLYNGUOIDUNGSAGA.sagaXoaNguoiDung(),
        QUANLYNGUOIDUNGSAGA.sagaThemNguoiDung(),
        QUANLYDATVESAGA.sagaLayDanhSachPhongVe(),
        QUANLYDATVESAGA.sagaDatVe(),
        QUANLYDATVESAGA.sagaTaoLichChieu(),
    ])
}