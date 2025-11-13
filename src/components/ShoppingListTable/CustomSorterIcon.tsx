import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { SorterResult } from "antd/es/table/interface";

interface CustomSortIconProps {
  sortOrder: SorterResult<unknown>["order"];
}

export const CustomSortIcon: React.FC<CustomSortIconProps> = ({
  sortOrder,
}) => {
  const isAscending = sortOrder === "ascend";
  const isDescending = sortOrder === "descend";

  const activeColor = "#1890ff";
  const inactiveColor = "rgba(0, 0, 0, 0.45)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        lineHeight: 1,
      }}
    >
      <FontAwesomeIcon
        icon={faArrowUp}
        color={isAscending ? activeColor : inactiveColor}
        style={{
          fontSize: 8,
          paddingRight: 4,
          color: isAscending ? activeColor : inactiveColor,
        }}
      />
      <FontAwesomeIcon
        icon={faArrowDown}
        color={isDescending ? activeColor : inactiveColor}
        style={{
          fontSize: 8,
          paddingLeft: 4,
          color: isDescending ? activeColor : inactiveColor,
        }}
      />
    </div>
  );
};
