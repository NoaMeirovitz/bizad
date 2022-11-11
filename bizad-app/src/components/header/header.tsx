import "./header.css";

export const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div id="header">
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );
};
