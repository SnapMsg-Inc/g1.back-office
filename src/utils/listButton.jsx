import { NavLink } from "react-router-dom";

export default function ListButton({ section }) {
    let selected = {
        textDecoration: "underline",
        color: "#535353",
    };

    let element = {
        textDecoration: "none",
        color: "#535353",
    };

    return (
        <li key={section.id}>
            <NavLink
                style={({ isActive }) => (isActive ? selected : element)}
                to={section.path}
            >
                {section.name}
            </NavLink>
        </li>
    );
}