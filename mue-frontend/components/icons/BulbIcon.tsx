import Icon from "./Icon";

const BulbIcon = (props: {
  size?: "small" | "medium" | "large" | "xlarge" | string;
  on?: boolean;
  maxSize?:string;
}) => {
  return (
    <Icon
      size={props.size}
      on={props.on}
      maxSize={props.maxSize}
      /**
       * https://www.svgrepo.com/svg/507550/bulb-on
       */
      backgroundimage={`url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z' stroke='%23ffffff' stroke-width='2'%3E%3C/path%3E%3Cpath d='M12 4V3' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M18 6L19 5' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M20 12H21' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M4 12H3' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M5 5L6 6' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M10 17H14' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`}
    />
  );
};

export default BulbIcon;
