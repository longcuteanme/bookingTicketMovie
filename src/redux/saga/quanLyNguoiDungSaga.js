import { takeLatest, put, call } from "redux-saga/effects";
import { QuanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import {
  STATUS_CODE,
  USER_ACCESS_TOKEN,
  USER_INFO,
} from "../../utils/constants/settingSystem";
import {
  CAP_NHAT_THONG_TIN_NGUOI_DUNG_SAGA,
  DANG_KY_SAGA,
  DANG_NHAP_SAGA,
  DISPLAY_LOADING,
  DISPLAY_QUAN_TRI_LOADING,
  HIDE_LOADING,
  HIDE_QUAN_TRI_LOADING,
  LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG_SAGA,
  LAY_DANH_SACH_NGUOI_DUNG_QUAN_TRI,
  LAY_THONG_TIN_TAI_KHOAN,
  LAY_THONG_TIN_TAI_KHOAN_SAGA,
  THEM_NGUOI_DUNG_SAGA,
  XOA_NGUOI_DUNG_SAGA,
} from "../constants/totalConstants";

function* dangNhap(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  const model = action.payload.dangNhap;
  const history = action.payload.history;
  try {
    let { data, status } = yield call(QuanLyNguoiDungService.dangNhap, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield localStorage.setItem(
        USER_ACCESS_TOKEN,
        JSON.stringify(data.content.accessToken)
      );
      yield localStorage.setItem(USER_INFO, JSON.stringify(data.content));
      alert("Đăng nhập thành công");
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
    type: HIDE_LOADING,
  });
  yield history.goBack();
}
export function* sagaDangNhap() {
  yield takeLatest(DANG_NHAP_SAGA, dangNhap);
}

function* dangKy(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  const model = action.model;
  try {
    let { status } = yield call(QuanLyNguoiDungService.dangKy, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield alert("Đăng ký tài khoản thành công");
      yield action.changeDangNhap();
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
    type: HIDE_LOADING,
  });
}
export function* sagaDangKy() {
  yield takeLatest(DANG_KY_SAGA, dangKy);
}

function* thongTinTaiKhoan() {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(QuanLyNguoiDungService.thongTinTaiKhoan);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LAY_THONG_TIN_TAI_KHOAN,
        thongTinTaiKhoan: data.content,
      });
    }
  } catch (err) {
    yield alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* sagaThongTinTaiKhoan() {
  yield takeLatest(LAY_THONG_TIN_TAI_KHOAN_SAGA, thongTinTaiKhoan);
}

function* capNhatThongTinNguoiDung(action) {
  if (action.payload.history) {
    yield put({
      type: DISPLAY_LOADING,
    });
  } else if (action.payload.layDuLieu) {
    yield put({
      type: DISPLAY_QUAN_TRI_LOADING,
    });
  }
  const model = action.payload.model;
  try {
    let { status } = yield call(
      QuanLyNguoiDungService.capNhatThongTinNguoiDung,
      model
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield alert("Cập nhật thông tin thành công");
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
  yield action.payload.history
    ? action.payload.history()
    : action.payload.layDuLieu();
  if (action.payload.layDuLieu) {
    yield put({
      type: HIDE_QUAN_TRI_LOADING,
    });
  }
}
export function* sagaCapNhatThongTinNguoiDung() {
  yield takeLatest(
    CAP_NHAT_THONG_TIN_NGUOI_DUNG_SAGA,
    capNhatThongTinNguoiDung
  );
}

function* layDanhSachNguoiDungPhanTrang(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const model = action.payload.model;
  try {
    let { data, status } = yield call(
      QuanLyNguoiDungService.layDanhSachNguoiDungPhanTrang,
      model
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: LAY_DANH_SACH_NGUOI_DUNG_QUAN_TRI,
        payload: {
          danhSachNguoiDungQuanTri: data.content,
        },
      });
    }
  } catch (err) {
    yield alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
  }
  yield put({
    type: HIDE_QUAN_TRI_LOADING,
  });
}
export function* sagaLayDanhSachNguoiDungPhanTrang() {
  yield takeLatest(
    LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG_SAGA,
    layDanhSachNguoiDungPhanTrang
  );
}

function* xoaNguoiDung(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const model = action.payload.model;
  try {
    let respond = yield call(QuanLyNguoiDungService.xoaNguoiDung, model);
    if (respond.status === STATUS_CODE.SUCCESS) {
      alert(`Xóa tài khoản ${model.taiKhoan} thành công`);
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
export function* sagaXoaNguoiDung() {
  yield takeLatest(XOA_NGUOI_DUNG_SAGA, xoaNguoiDung);
}

function* themNguoiDung(action) {
  yield put({
    type: DISPLAY_QUAN_TRI_LOADING,
  });
  const model = action.payload.model;
  try {
    let respond = yield call(QuanLyNguoiDungService.themNguoiDung, model);
    if (respond.status === STATUS_CODE.SUCCESS) {
      alert(`Thêm tài khoản ${model.taiKhoan} thành công`);
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
export function* sagaThemNguoiDung() {
  yield takeLatest(THEM_NGUOI_DUNG_SAGA, themNguoiDung);
}
