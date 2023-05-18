import Icon from "./Icon";

const StripIcon = (props: {
  size?: "small" | "medium" | "large" | "xlarge" | string;
  maxSize?:string;
  on?: boolean;
}) => {
  return (
    <Icon
      size={props.size}
      on={props.on}
      maxSize={props.maxSize}
      /**
       * https://www.svgrepo.com/svg/487523/line
       */
      backgroundimage={`url("data:image/svg+xml,%3Csvg fill='%23ffffff' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' stroke='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M3.293,20.707a1,1,0,0,1,0-1.414l16-16a1,1,0,1,1,1.414,1.414l-16,16A1,1,0,0,1,3.293,20.707Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");`}
    />
  );
};

export default StripIcon;
