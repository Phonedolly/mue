import Icon from "./Icon";

const MonitorIcon = (props: {
  size?: "small" | "medium" | "large" | "xlarge" | string;
  on?: boolean;
  masxize?:string;
}) => {
  return (
    <Icon
      size={props.size}
      on={props.on}
      masxize={props.masxize}
      /**
       * https://www.svgrepo.com/svg/507788/monitor
       */
      backgroundimage={`url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M3 7C3 5.11438 3 4.17157 3.58579 3.58579C4.17157 3 5.11438 3 7 3H12H17C18.8856 3 19.8284 3 20.4142 3.58579C21 4.17157 21 5.11438 21 7V10V13C21 14.8856 21 15.8284 20.4142 16.4142C19.8284 17 18.8856 17 17 17H12H7C5.11438 17 4.17157 17 3.58579 16.4142C3 15.8284 3 14.8856 3 13V10V7Z' stroke='%23ffffff' stroke-width='2' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M7 21H17' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12 17V21' stroke='%23ffffff' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`}
    />
  );
};

export default MonitorIcon;
