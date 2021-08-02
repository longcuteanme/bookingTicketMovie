import {
  CAP_NHAT_PHIM_SAGA,
  DISPLAY_LOADING,
  DISPLAY_QUAN_TRI_LOADING,
  HIDE_LOADING,
  HIDE_QUAN_TRI_LOADING,
  LAY_DANH_SACH_BANNER,
  LAY_DANH_SACH_BANNER_SAGA,
  LAY_DANH_SACH_PHIM,
  LAY_DANH_SACH_PHIM_PHAN_TRANG_SAGA,
  LAY_DANH_SACH_PHIM_QUAN_TRI,
  LAY_DANH_SACH_PHIM_SAGA,
  LAY_THONG_TIN_PHIM,
  LAY_THONG_TIN_PHIM_SAGA,
  THEM_PHIM_SAGA,
  XOA_PHIM_SAGA,
} from "../constants/totalConstants";
import { takeLatest, put, call } from "redux-saga/effects";
import { QuanLyPhimService } from "../../services/quanLyPhimService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
// import {DISPLAY_LOADING, HIDE_LOADING} from '../constants/loadingConstants'

//Lay danh sach banner
function* layDanhSachBanner() {
  // yield take('getTaskAPIAction');//theo doi action-> xem action nao dispatch thi moi lam cac ham ben duoi
  try {
    let { data, status } = yield call(QuanLyPhimService.layDanhSachBanner);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LAY_DANH_SACH_BANNER,
        payload: data.content,
      });
    } else {
      alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
    }
  } catch (err) {
    alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
  }
}
export function* sagaLayDanhSachBanner() {
  yield takeLatest(LAY_DANH_SACH_BANNER_SAGA, layDanhSachBanner);
}

function* layDanhSachPhim() {
  // yield take('getTaskAPIAction');//theo doi action-> xem action nao dispatch thi moi lam cac ham ben duoi
  try {
    let { data, status } = yield call(QuanLyPhimService.layDanhSachPhim);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LAY_DANH_SACH_PHIM,
        payload: data.content,
      });
    } else {
      alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
    }
  } catch (err) {
      alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
  }
}
export function* sagaLayDanhSachPhim() {
  yield takeLatest(LAY_DANH_SACH_PHIM_SAGA, layDanhSachPhim);
}

function* layThongTinPhim(action) {
  const { id } = action.payload;
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(QuanLyPhimService.layThongTinPhim, id);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LAY_THONG_TIN_PHIM,
        payload: {
          thongTinChiTietPhim: data.content,
        },
      });
    } else {
      alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
    }
  } catch (err) {
    alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* sagaLayThongTinPhim() {
  yield takeLatest(LAY_THONG_TIN_PHIM_SAGA, layThongTinPhim);
}

function* layDanhSachPhimPhanTrang(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const model = action.payload.model;
  try {
    let { data, status } = yield call(
      QuanLyPhimService.layDanhSachPhimPhanTrang,
      model
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LAY_DANH_SACH_PHIM_QUAN_TRI,
        payload: {
          danhSachPhimQuanTri: data.content,
        },
      });
    }
  } catch (err) {
    alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
  }
  yield put({
    type: HIDE_QUAN_TRI_LOADING,
  });
}
export function* sagaLayDanhSachPhimPhanTrang() {
  yield takeLatest(
    LAY_DANH_SACH_PHIM_PHAN_TRANG_SAGA,
    layDanhSachPhimPhanTrang
  );
}

function* xoaPhim(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const maPhim = action.payload.maPhim;
  try {
    let { status } = yield call(QuanLyPhimService.xoaPhim, maPhim);
    if (status === STATUS_CODE.SUCCESS) {
      alert(`Xóa thành công phim có mã số ${maPhim}`);
      yield action.payload.layDuLieu();
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield alert(
        `ERROR${err?.response?.status}: ${err?.response?.data?.content}`
      );
    } else {
      yield alert("Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại");
    }
  }
  yield put({
    type: HIDE_QUAN_TRI_LOADING,
  });
}
export function* sagaXoaPhim() {
  yield takeLatest(XOA_PHIM_SAGA, xoaPhim);
}

function* themPhim(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const model = action.payload.model;
  try {
    let { status } = yield call(QuanLyPhimService.themPhimUploadHinh, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield alert(`Thêm phim ${model.get("tenPhim")} thành công`);
      yield action.payload.layDuLieu();
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield alert(
        `ERROR${err?.response?.status}: ${err?.response?.data?.content}`
      );
    } else {
      yield alert("Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại");
    }
  }
  yield put({
    type: HIDE_QUAN_TRI_LOADING,
  });
}
export function* sagaThemPhim() {
  yield takeLatest(THEM_PHIM_SAGA, themPhim);
}

function* capNhatPhim(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const model = action.payload.model;
  try {
    let { status } = yield call(QuanLyPhimService.capNhatPhimUpload, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield alert(`Cập nhật phim ${model.get("tenPhim")} thành công`);
      yield action.payload.layDuLieu();
    }
  } catch (error) {
    const err = { ...error };
    if (err.response) {
      yield alert(
        `ERROR${err?.response?.status}: ${err?.response?.data?.content}`
      );
    } else {
      yield alert("Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại");
    }
  }
  yield put({
    type: HIDE_QUAN_TRI_LOADING,
  });
}
export function* sagaCapNhatPhim() {
  yield takeLatest(CAP_NHAT_PHIM_SAGA, capNhatPhim);
}
