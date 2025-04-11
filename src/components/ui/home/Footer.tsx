type FooterProps = React.HTMLAttributes<HTMLElement>;

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={`py-6 text-center bg-gray-900 text-gray-400 ${
        className || ""
      }`}
      {...props}
    >
      © {new Date().getFullYear()} Bolão - Todos os direitos reservados.
    </footer>
  );
};
