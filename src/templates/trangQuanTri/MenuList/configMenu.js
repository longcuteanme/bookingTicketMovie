import {
  FormOutlined,
  PlaySquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DashBoard from "../../../pages/QuanTri/DashBoard/DashBoard";
import DanhSachNguoiDung from "../../../pages/QuanTri/QuanLyNguoiDung/DanhSachNguoiDung";
import DanhSachPhim from "../../../pages/QuanTri/QuanLyPhim/DanhSachPhim";

let index = 0;
export const subMenuArray = ["sub1", "sub2"];
export const menuList = [
  {
    path: "/DashBoard",
    name: "Dashboard",
    icon: <FormOutlined />,
    key: `${index++}`,
    Component: DashBoard,
  },
  {
    path: "/QuanLyNguoiDung",
    name: "Quản lý người dùng",
    icon: <UserOutlined />,
    key: "sub1",
    children: [
      {
        path: "/DanhSachNguoiDung",
        name: "Danh sách người dùng",
        key: `${index++}`,
        Component: DanhSachNguoiDung,
      },
    ],
  },
  {
    path: "/QuanLyPhim",
    name: "Quản lý phim",
    icon: <PlaySquareOutlined />,
    key: "sub2",
    children: [
      {
        path: "/DanhSachPhim",
        name: "Danh sách phim",
        key: `${index++}`,
        Component: DanhSachPhim,
      },
    ],
  },
];
