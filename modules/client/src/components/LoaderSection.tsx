import Spin from "antd/es/spin";

export default function LoaderSection() {
  return (
    <div style={{ textAlign: "center", margin: "40px" }}>
      <Spin size="large" />
    </div>
  );
}
