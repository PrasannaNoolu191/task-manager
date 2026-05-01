interface LogoutDialogProps {
  logoutDialogDetails: {
    open: boolean;
    data: any | null;
  };
  setLogoutDialogDetails: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      data: any | null;
    }>
  >;
}
