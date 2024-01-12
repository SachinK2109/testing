import { NavLink } from "react-router-dom";

export const breadcrumbsData = [
  { title: <NavLink activeClassName="active">Home</NavLink> },
  {
    title: <NavLink activeClassName="active">Application Center</NavLink>,
  },
  {
    title: <NavLink activeClassName="active">Application List</NavLink>,
  },
];
