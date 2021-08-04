import { Translation } from "react-i18next";
import {Tag} from 'antd'

const columns = [
    {
        title: <Translation>{(t) => <>{t("Account")}</>}</Translation>,
        dataIndex: "taiKhoan",
        width: "20%",
        align: "center",
        fixed: "left",
      },
      {
        title: <Translation>{(t) => <>{t("Password")}</>}</Translation>,
        dataIndex: "matKhau",
        width: "20%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("Full Name")}</>}</Translation>,
        dataIndex: "hoTen",
        width: "20%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("Email")}</>}</Translation>,
        dataIndex: "email",
        width: "25%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("Phone Number")}</>}</Translation>,
        dataIndex: "soDt",
        width: "25%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("User type")}</>}</Translation>,
        dataIndex: "maLoaiNguoiDung",
        render: (item) => {
          return item === "QuanTri" ? (
            <Tag color="#f50"><Translation>{(t) => <>{t("ADMINISTRATOR")}</>}</Translation></Tag>
          ) : (
            <Tag color="#87d068"><Translation>{(t) => <>{t("CUSTOMER")}</>}</Translation></Tag>
          );
        },
        width: "20%",
        align: "center",
      },
]
export default columns