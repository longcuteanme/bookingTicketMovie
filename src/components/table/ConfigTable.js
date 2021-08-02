import React, { useState, Suspense } from "react";
import { Table, Button, Drawer, Form, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { Search } = Input;

function MyComponent(props) {
  const { t, i18n } = useTranslation();
  const {
    columns,
    dataSource,
    size,
    title,
    paginationProps,
    formAdd,
    editMessage,
    truongXoa,
    pagination,
  } = props;
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [chucNang, setChucNang] = useState("");
  const [form] = Form.useForm();
  const hideDrawer = async () => {
    if (props.handleChange) {
      props.handleChange({
        fileList: [],
      });
    }
    await form.resetFields();
    await setChucNang("");
    await setDisplayDrawer(false);
  };
  const handleThemMoi = async () => {
    if (props.handleChange) {
      props.handleChange({
        fileList: [],
      });
    }
    await form.resetFields();
    await setDisplayDrawer(true);
    await setChucNang(editMessage[0]);
  };
  const handleEdit = async (info) => {
    if (info.ngayKhoiChieu) {
      info.ngayKhoiChieu = moment(info.ngayKhoiChieu);
    }
    if (info.hinhAnh) {
      props.handleChange({
        fileList: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: `${info.hinhAnh}`,
          },
        ],
      });
    }
    if (info.maPhim) {
      props.changeMaPhim(info.maPhim);
    }
    await form.setFieldsValue(info);
    await setDisplayDrawer(true);
    await setChucNang(editMessage[1]);
  };
  const handleFinish = (values) => {
    if (chucNang === editMessage[0]) {
      props.changePagination({ total: 1, range: 10, key: "" });
      props.themThongTin(values);
    } else if (chucNang === editMessage[1]) {
      props.suaThongTin(values);
    }
    setDisplayDrawer(false);
  };
  return (
    <>
      <Drawer
        title={chucNang}
        placement="right"
        closable={false}
        onClose={() => {
          hideDrawer();
        }}
        visible={displayDrawer}
        width="50vw"
      >
        <Form
          name="normal_add_edit"
          className="login-add-edit"
          onFinish={(values) => handleFinish(values)}
          size="large"
          form={form}
        >
          {{ ...formAdd }}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{ width: "100%" }}
            >
              {chucNang}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Table
        style={{ width: "100%" }}
        title={() => {
          return (
            <div className="w-full">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl">{title}</h1>
                <RedoOutlined
                  onClick={props.layDuLieu}
                  style={{ fontSize: "30px", color: "gray" }}
                />
              </div>

              <div className="w-full flex justify-between">
                <Search
                  placeholder={t("Input key")}
                  onSearch={(value) => {
                    props.onSearch(value);
                  }}
                  enterButton
                  style={{ marginRight: "10px" }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleThemMoi();
                  }}
                >
                  {t("Add")}
                </Button>
              </div>
            </div>
          );
        }}
        columns={[
          ...columns,
          {
            title: t("Action"),
            width: "200px",
            fixed: "right",
            align: "center",
            render: (record) => {
              return (
                <div className="flex justify-around">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleEdit(record);
                    }}
                  >
                    {t("Edit")}
                  </Button>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      props.xoaNguoiDung(record[truongXoa]);
                    }}
                  >
                    {t("Delete")}
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
        size={size}
        bordered
        loading={props.loading}
        pagination={{
          position: ["bottomCenter"],
          onChange: async (total, range) => {
            await props.changePagination({ total: total, range: range });
            await props.layDuLieu();
          },
          current: pagination.total,
          pageSize: pagination.range,
          ...paginationProps,
        }}
        tableLayout="fixed"
        scroll={{ x: "80vw", y: "80vh" }}
      />
    </>
  );
}

function ConfigTable(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    loading: state.loadingTableQuanTriReducer.loading,
  };
})(ConfigTable);
