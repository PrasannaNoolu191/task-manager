import { Box, Button, Paper, Typography, Link, Divider } from "@mui/material";
import styles from "../../styles/styles";

import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputEmailField from "../../hooks/form-email-field";
import { useNavigate } from "react-router-dom";
import FormInputPasswordField from "../../hooks/form-password-field";
import { loginUser } from "../../api/auth";
import { useToast } from "../../context/toast-context";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/auth-slice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            avatar: response.user.avatar,
          }),
        );
        dispatch(
          setUser({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            avatar: response.user.avatar,
          }),
        );
        showToast(response?.message, "success");
        navigate("/dashboard");
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Login failed", "error");
    }
  };
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <Box alignSelf={"center"}>
        <Paper
          elevation={3}
          sx={{ padding: 2, borderRadius: 3, width: "50vh", maxWidth: "50vh" }}>
          <Typography variant="h5" textAlign="center" sx={styles.headerText}>
            Welcome Back!
          </Typography>

          <Box
            sx={styles.flexColumnTwoGapBox}
            component="form"
            onSubmit={handleSubmit(onSubmit)}>
            <FormInputEmailField
              name="email"
              label="Email"
              placeholder="Enter Email"
              control={control}
              errors={errors}
              // size="small"
            />
            {/* <TextField fullWidth label="Password" type="password" margin="normal" /> */}
            <FormInputPasswordField
              name="password"
              label="Password"
              placeholder="Enter Password"
              control={control}
              errors={errors}
              // size="small"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2, ...styles.button }}
              disabled={!isValid}>
              Login
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Link href="#" underline="hover">
              Forgot Password?
            </Link>
          </Box>

          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            flexDirection={"column"}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" textAlign={"center"} mt={2}>
              Don’t have an account?{" "}
              <Link href="/register" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
export default Login;
