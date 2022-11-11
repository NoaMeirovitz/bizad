import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleRequest } from "../../services/http";
import { Header } from "../header/header";
import { User } from "../services/services";

export interface UpdateServiceProps {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
export const UpdateService = ({ user, setUser }: UpdateServiceProps) => {
  const [serviceStatus, setServiceStatus] = useState("Disabled");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAddService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const service = decodeURIComponent(pathname).slice(1);
    const response = await handleRequest("auth/services", {
      userId: user?.userId,
      service,
      serviceStatus,
    });
    const services = await response.json();
    if (user) {
      setUser((prevUser) => {
        const updatedUser = { ...prevUser };
        updatedUser.services = services;
        return updatedUser as User;
      });
    }
    navigate("/services");
  };

  const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/services");
  };

  return (
    <div>
      <Header
        description="Choose sevices that you would like to get from BizAd"
        title="Services"
      />
      <div className="d-flex justify-content-center ">
        <form style={{ maxWidth: "300px" }} onSubmit={handleAddService}>
          <label htmlFor="status">Status</label>
          <select
            className="form-select"
            form="form-services"
            name="status"
            onChange={(e) => setServiceStatus(e.target.value)}
            defaultValue={serviceStatus}
          >
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>

          <div>
            <label htmlFor="comment">Comment</label>
            <div>
              <textarea
                style={{ width: "100%" }}
                name="comment"
                id="comment"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Service
          </button>
          <button onClick={cancel} className="btn btn-secondary">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
