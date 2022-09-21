interface CustomProps {
  isDarkTheme: boolean;
  type: string;
}

export const handleCustomStyles = (props: CustomProps) => {
  const { isDarkTheme, type } = props;
  return {
    overlay: {
      backgroundColor: !isDarkTheme
        ? "rgba(255, 255, 255, 0.75)"
        : "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: type === "info" ? "50%" : "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      minWidth: "300px",
      backgroundColor: isDarkTheme ? "#121213" : "#fff",
    },
  };
};
