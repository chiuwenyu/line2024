import { Box } from "@mui/material";

const Focus = (props: any) => {
  const { x, y } = props;
  return (
    <Box
      position="absolute"
      top={y} // 設定圓形的頂部位置
      left={x} // 設定圓形的左邊位置
      width={50} // 設定圓形的寬度
      height={50} // 設定圓形的高度
      borderRadius="50%" // 設定圓形的邊界半徑為 50%，使其成為一個圓形
      bgcolor="rgba(255, 0, 0, 0.5)" // 設定圓形的背景顏色為紅色，並設定透明度為 0.5
    />
  );
};

export default Focus;
