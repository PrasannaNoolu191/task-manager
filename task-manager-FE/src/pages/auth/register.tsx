import { Box, Button, Paper, Typography, Link, Divider } from "@mui/material";
import styles from "../../styles/styles";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "../../hooks/form-input-field";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toast-context";
const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        username: data.userName,
        email: data.email,
        password: data.password,
        description: data?.description,
      };
      const response = await registerUser(payload);
      if (response.success) {
        showToast(response?.message, "success");
      }
      navigate("/login");
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "registration failed",
        "error",
      );
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
            Create an Account!
          </Typography>

          <Box
            sx={styles.flexColumnTwoGapBox}
            component="form"
            onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              name="userName"
              label="Username"
              placeholder="Enter Username"
              control={control}
              errors={errors}
              // size="small"
            />
            <FormInputField
              name="email"
              label="Email"
              placeholder="Enter Email"
              control={control}
              errors={errors}
              // size="small"
            />
            <FormInputField
              name="password"
              label="Password"
              placeholder="Enter Password"
              control={control}
              errors={errors}
              // size="small"
            />
            <FormInputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              control={control}
              errors={errors}
              // size="small"
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ py: 1.2, ...styles.button }}
              disabled={!isValid}>
              Register
            </Button>
          </Box>

          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            flexDirection={"column"}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" textAlign={"center"} mt={2}>
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
export default Register;
