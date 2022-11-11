import { useEffect, useState } from "react";
import { get } from "../../services/http";
import { Business, Card } from "../card/Card";
import { Header } from "../header/header";
import "./home.css";

export const Home = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState("");
  const [listMode, setListMode] = useState(false);

  const fetchCards = async () => {
    const response = await get("businesses");
    const businesses = (await response.json()) as Business[];
    setBusinesses(businesses);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const filterBusinesses = () => {
    return businesses.filter((business) =>
      business.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <div id="home">
      <Header description="Advertising your business" title="BizAd" />
      <div style={{ width: "250px" }} className="mb-3">
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search businesses"
        />
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          onChange={() => setListMode((prev) => !prev)}
        />
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckChecked"
        ></label>
      </div>
      <div className={`card-grid ${listMode ? "" : "list"}`}>
        {filterBusinesses().map((business, index) => (
          <Card key={index} business={business} />
        ))}
      </div>
    </div>
  );
};
