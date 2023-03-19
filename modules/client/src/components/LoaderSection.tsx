import Spin from "antd/es/spin";

/**
 * Shows a large spinner centered in a section
 */
export default function LoaderSection() {
  return (
    <div style={{ textAlign: "center", margin: "40px" }}>
      <Spin size="large" />
    </div>
  );
}
