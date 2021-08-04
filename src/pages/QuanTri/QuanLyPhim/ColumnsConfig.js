import { Translation } from "react-i18next";
import { Tag, Rate } from "antd";
import { VideoCameraAddOutlined, PlayCircleOutlined } from "@ant-design/icons";
import LoadingBackground from "../../../assets/images/LoadingBackground.jpg";
import moment from "moment";

const columns = [
  {
    title: <Translation>{(t) => <>{t("Create showtime")}</>}</Translation>,
    width: "100px",
    align: "center",
    fixed: "left",
    render: (record) => {
      return (
        <VideoCameraAddOutlined
          className="hover:text-blue-400"
          onClick={() => {
            this.onRow(record);
          }}
          style={{ fontSize: "30px", color: "gray" }}
        />
      );
    },
  },
  {
    title: <Translation>{(t) => <>{t("Movie's name")}</>}</Translation>,
    width: "100px",
    align: "center",
    fixed: "left",
    render: (record) => {
      return (
        <div>
          <p>{record.tenPhim}</p>
          {record?.hot ? <Tag color="#cd201f">HOT</Tag> : <></>}
        </div>
      );
    },
  },
  {
    title: <Translation>{(t) => <>{t("Image")}</>}</Translation>,
    dataIndex: "hinhAnh",
    width: "120px",
    align: "center",
    render: (item) => {
      return (
        <div
          className="w-full h-32 bg-cover bg-center"
          style={{
            backgroundImage: `url(${LoadingBackground})`,
            boxShadow: "0px 0px 3px gray",
          }}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item})` }}
          ></div>
        </div>
      );
    },
  },
  {
    title: <Translation>{(t) => <>{t("Aliases")}</>}</Translation>,
    dataIndex: "biDanh",
    width: "100px",
    align: "center",
  },
  {
    title: <Translation>{(t) => <>{t("Trailer")}</>}</Translation>,
    dataIndex: "trailer",
    width: "80px",
    align: "center",
    render: (item) => {
      return (
        <PlayCircleOutlined
          style={{ fontSize: "30px", color: "gray" }}
          onClick={() => {
            this.handleTrailer(item);
          }}
        />
      );
    },
  },
  {
    title: <Translation>{(t) => <>{t("Status")}</>}</Translation>,
    dataIndex: "dangChieu",
    width: "150px",
    align: "center",
    render: (item) => {
      if (item)
        return (
          <Tag color="#2db7f5">
            <Translation>{(t) => <>{t("NOW SHOWING")}</>}</Translation>
          </Tag>
        );
      else
        return (
          <Tag color="#f50">
            <Translation>{(t) => <>{t("COMING SOON")}</>}</Translation>
          </Tag>
        );
    },
  },
  {
    title: <Translation>{(t) => <>{t("Show date")}</>}</Translation>,
    dataIndex: "ngayKhoiChieu",
    width: "150px",
    align: "center",
    render: (item) => {
      return moment(item).format("DD-MM-YYYY");
    },
  },
  {
    title: <Translation>{(t) => <>{t("Description")}</>}</Translation>,
    dataIndex: "moTa",
    width: "500px",
    align: "center",
  },
  {
    title: <Translation>{(t) => <>{t("Evaluate")}</>}</Translation>,
    dataIndex: "danhGia",
    width: "200px",
    align: "center",
    render: (item) => {
      return <Rate disabled defaultValue={item / 2} />;
    },
  },
];
export default columns;
