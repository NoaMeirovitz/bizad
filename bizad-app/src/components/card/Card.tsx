export interface Business {
  name: string;
  description: string;
  address: string;
  phone: string;
  adNum: number;
  imgUrl: string;
  websiteUrl: string;
}

export interface CardProps {
  business: Business;
}

export const Card = ({ business }: CardProps) => {
  return (
    <div className="card text-start" style={{ width: "18rem" }}>
      <img src={business.imgUrl} className="card-img-top" alt={business.name} />

      <div className="card-body">
        <div className="badge bg-secondary pd-1">{business.adNum}</div>
        <h5 className="card-title">{business.name}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{business.description}</li>
          <li className="list-group-item">{business.phone}</li>
          <li className="list-group-item">{business.address}</li>
        </ul>

        <a href={business.websiteUrl} className="btn btn-primary">
          Visit Website
        </a>
      </div>
    </div>
  );
};
