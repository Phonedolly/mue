import { WebTarget } from "styled-components";
import Icon from "./Icon";

const EditIcon = (props: {
  size?: "small" | "medium" | "large" | "xlarge" | string;
  on?: boolean;
  masxize?: string;
  as?: WebTarget;
}) => {
  return (
    <Icon
      size={props.size}
      on={props.on}
      masxize={props.masxize}
      as={props.as}
      /**
       * https://www.svgrepo.com/svg/507550/bulb-on
       */
      backgroundimage={`url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3E%3C/title%3E%3Cg id='Complete'%3E%3Cg id='edit'%3E%3Cg%3E%3Cpath d='M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3C/path%3E%3Cpolygon fill='none' points='12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
    />
  );
};

export default EditIcon;
