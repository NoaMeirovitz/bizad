import { Link, useNavigate } from "react-router-dom";
//import Title from "../Title/Title";
import Joi from "joi";
import { useFormik } from "formik";
import { handleRequest } from "../services/http";
import { User } from "../components/services/services";
//import { handleRequest } from "../../services/apiService";
//import { TOKEN_KEY } from "../../services/auth";

interface IErrors {
  [key: string]: string;
}

export interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<undefined | User>>;
}
export function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: IErrors = {};
      const schema = Joi.object().keys({
        email: Joi.string().required().max(256),
        password: Joi.string().required().max(1024),
      });

      const { error } = schema.validate(values);

      if (error) {
        error.details.forEach((item) => {
          if (item.context) {
            const key = item.context.key + "";
            errors[key] = item.message;
          }
        });
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        console.log("login");
        const res = await handleRequest("auth/login", values);

        const user = await res.json();
        if (res.status !== 200) {
          throw new Error(user.message);
        }
        setUser(user);
        navigate("/");
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-3 form-max-w m-auto d-block"
    >
      <h1>Login</h1>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div className="text-danger">{formik.errors.email}</div>
      ) : null}

      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div className="text-danger">{formik.errors.password}</div>
      ) : null}

      <button type="submit" className="btn btn-primary btn-lg w-100">
        Login
      </button>
      <Link to="/signup">Go to signup</Link>
    </form>
  );
}

export default Login;
