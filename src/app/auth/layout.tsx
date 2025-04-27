type LayoutProps = {
    children: React.ReactNode,
  };

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="min-h-screen grid grid-cols-3">
      <div className="col-span-2 bg-red-500">img</div>
      <div className="flex items-center justify-center">
        <div className="w-[70%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
