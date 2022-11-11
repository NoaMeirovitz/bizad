import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteRequest, handleRequest } from "../../services/http";
import { Header } from "../header/header";

export interface User {
  userId: string;
  email: string;
  services: Record<string, string>;
}

export interface ServicesProps {
  user: undefined | User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const Services = ({ user, setUser }: ServicesProps) => {
  const [service, setService] = useState("");
  const [serviceStatus, setServiceStatus] = useState("");

  const handleAddService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service || !serviceStatus) {
      alert("please complete service details");
    }

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
  };

  const deleteService = async (serviceName: string) => {
    const response = await deleteRequest("auth/services", {
      userId: user?.userId,
      service: serviceName,
    });
    const services = await response.json();
    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      updatedUser.services = services;
      return updatedUser as User;
    });
  };

  return (
    <div id="services">
      <Header
        description="Choose sevices that you would like to get from BizAd"
        title="Services"
      />

      <form
        onSubmit={handleAddService}
        id="form-services"
        className="d-flex justify-content-center align-items-center"
      >
        <div className="p-3" style={{ maxWidth: "250px" }}>
          <select
            className="form-select"
            form="form-services"
            onChange={(e) => setService(e.target.value)}
          >
            <option selected disabled>
              Services
            </option>
            <option value="Mailing Services">Mailing Services</option>
            <option value="Whatsapp">Whatsapp</option>
            <option value="SMS">SMS</option>
          </select>
        </div>
        <div className="p-3" style={{ maxWidth: "150px" }}>
          <select
            className="form-select"
            form="form-services"
            onChange={(e) => setServiceStatus(e.target.value)}
          >
            <option selected disabled>
              Status
            </option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {user?.services
            ? Object.entries(user.services).map(
                ([serviceName, serviceStatus], index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link to={`/${encodeURIComponent(serviceName)}`}>
                          {serviceName}
                        </Link>{" "}
                      </td>
                      <td>{serviceStatus}</td>
                      <td onClick={() => deleteService(serviceName)}>
                        <i className="bi bi-trash"></i>
                      </td>
                    </tr>
                  );
                }
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};
